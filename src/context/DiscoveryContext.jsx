import React, { createContext, useContext, useState, useEffect, useRef, useCallback, useMemo } from 'react';
import {
  SCHEMA_VERSION,
  STORAGE_KEY,
  QUESTIONS_BY_ID,
  createInitialDiscoveryState,
  calculateCompletion,
  generateInternalSummaryFromAnswers,
  DEMO_DISCOVERY_DATA,
  formatExportData
} from '../data/questionnaireSchema';
import { getStoredItem, setStoredItem, removeStoredItem } from '../utils/storage';

const DiscoveryContext = createContext(null);

export function DiscoveryProvider({ children }) {
  // Initialize discovery state from storage or default
  const [state, setState] = useState(() => {
    try {
      const stored = getStoredItem(STORAGE_KEY);
      if (stored && stored.version === SCHEMA_VERSION && stored.answers) {
        return {
          version: SCHEMA_VERSION,
          metadata: stored.metadata || { interviewDate: '', meetingMode: '', stuzenRepresentative: '' },
          answers: stored.answers || {},
          materials: stored.materials || { received: [], otherText: '' },
          internalSummary: stored.internalSummary || {
            summaryA: '',
            summaryB: '',
            summaryC: '',
            summaryD: '',
            summaryE: '',
            summaryF: ''
          },
          signatures: stored.signatures || {
            client: { signature: '', date: '' },
            stuzen: { signature: '', date: '' }
          }
        };
      }
    } catch {
      // Storage unavailable or parse error — fallback to pristine state
    }
    return createInitialDiscoveryState();
  });

  const [isLoaded, setIsLoaded] = useState(false);
  const [isDirty, setIsDirty] = useState(false);
  const [lastSaved, setLastSaved] = useState(null);
  const [storageError, setStorageError] = useState(null);

  const saveTimerRef = useRef(null);

  // Mark loaded on mount
  useEffect(() => {
    setIsLoaded(true);
  }, []);

  // Debounced Auto-save to localStorage
  useEffect(() => {
    if (!isLoaded) return;

    if (saveTimerRef.current) {
      clearTimeout(saveTimerRef.current);
    }

    saveTimerRef.current = setTimeout(() => {
      try {
        const payload = {
          version: SCHEMA_VERSION,
          metadata: state.metadata,
          answers: state.answers,
          materials: state.materials,
          internalSummary: state.internalSummary,
          signatures: state.signatures,
          savedAt: new Date().toISOString()
        };

        const success = setStoredItem(STORAGE_KEY, payload);
        if (success) {
          setLastSaved(new Date().toISOString());
          setStorageError(null);
          setIsDirty(false);
        } else {
          setStorageError('Local storage is disabled or quota exceeded.');
        }
      } catch (err) {
        setStorageError(err.message || 'Failed to save to local storage.');
      }
    }, 600);

    return () => {
      if (saveTimerRef.current) {
        clearTimeout(saveTimerRef.current);
      }
    };
  }, [state, isLoaded]);

  // Derived completion calculations (memoized)
  const completion = useMemo(() => {
    return calculateCompletion(state.answers);
  }, [state.answers]);

  /* ==========================================================================
     Actions: State Update Handlers
     ========================================================================== */

  // 1. Update Meeting Metadata
  const updateMetadata = useCallback((field, value) => {
    setState((prev) => ({
      ...prev,
      metadata: {
        ...prev.metadata,
        [field]: value
      }
    }));
    setIsDirty(true);
  }, []);

  // 2. Update Single Question Answer
  const updateAnswer = useCallback((questionId, value) => {
    setState((prev) => {
      const nextAnswers = { ...prev.answers, [questionId]: value };
      const q = QUESTIONS_BY_ID[questionId];

      // Clean up conditional detail if trigger value was changed
      if (q && q.conditionalField) {
        if (value !== q.conditionalField.triggerValue) {
          nextAnswers[q.conditionalField.key] = '';
        }
      }

      return {
        ...prev,
        answers: nextAnswers
      };
    });
    setIsDirty(true);
  }, []);

  // 3. Toggle Multiple Choice Option
  const toggleMultiSelect = useCallback((questionId, optionValue) => {
    setState((prev) => {
      const currentList = Array.isArray(prev.answers[questionId]) ? prev.answers[questionId] : [];
      const exists = currentList.includes(optionValue);
      const nextList = exists
        ? currentList.filter((item) => item !== optionValue)
        : [...currentList, optionValue];

      const nextAnswers = { ...prev.answers, [questionId]: nextList };
      const q = QUESTIONS_BY_ID[questionId];

      // If "Other: ___" was deselected, clear its text field
      if (q && q.hasOther && q.otherKey && exists && optionValue.startsWith('Other')) {
        nextAnswers[q.otherKey] = '';
      }

      return {
        ...prev,
        answers: nextAnswers
      };
    });
    setIsDirty(true);
  }, []);

  // 4. Update "Other" text for a question
  const updateOtherValue = useCallback((questionId, value) => {
    const q = QUESTIONS_BY_ID[questionId];
    const key = q && q.otherKey ? q.otherKey : `${questionId}_other`;

    setState((prev) => ({
      ...prev,
      answers: {
        ...prev.answers,
        [key]: value
      }
    }));
    setIsDirty(true);
  }, []);

  // 5. Update Conditional detail field
  const updateConditionalValue = useCallback((questionId, fieldKey, value) => {
    setState((prev) => ({
      ...prev,
      answers: {
        ...prev.answers,
        [fieldKey]: value
      }
    }));
    setIsDirty(true);
  }, []);

  // 6. Toggle Material Checklist Item
  const toggleMaterial = useCallback((materialId) => {
    setState((prev) => {
      const currentList = prev.materials?.received || [];
      const exists = currentList.includes(materialId);
      const nextList = exists
        ? currentList.filter((id) => id !== materialId)
        : [...currentList, materialId];

      const nextMaterials = {
        ...prev.materials,
        received: nextList
      };

      if (materialId === 'other' && exists) {
        nextMaterials.otherText = '';
      }

      return {
        ...prev,
        materials: nextMaterials
      };
    });
    setIsDirty(true);
  }, []);

  // 7. Update Material "Other" text
  const updateMaterialOther = useCallback((value) => {
    setState((prev) => ({
      ...prev,
      materials: {
        ...prev.materials,
        otherText: value
      }
    }));
    setIsDirty(true);
  }, []);

  // 8. Update Internal Summary Field Manually
  const updateInternalSummary = useCallback((field, value) => {
    setState((prev) => ({
      ...prev,
      internalSummary: {
        ...prev.internalSummary,
        [field]: value
      }
    }));
    setIsDirty(true);
  }, []);

  // 9. Generate Internal Summary Drafts (Sections A–E)
  // Section F is protected and preserved untouched
  const generateInternalSummary = useCallback(() => {
    setState((prev) => {
      const drafts = generateInternalSummaryFromAnswers(prev.answers, prev.metadata);
      return {
        ...prev,
        internalSummary: {
          ...prev.internalSummary,
          summaryA: drafts.summaryA,
          summaryB: drafts.summaryB,
          summaryC: drafts.summaryC,
          summaryD: drafts.summaryD,
          summaryE: drafts.summaryE
          // summaryF remains exactly as user authored it
        }
      };
    });
    setIsDirty(true);
  }, []);

  // 10. Update Signatures
  const updateSignature = useCallback((person, field, value) => {
    setState((prev) => ({
      ...prev,
      signatures: {
        ...prev.signatures,
        [person]: {
          ...(prev.signatures[person] || {}),
          [field]: value
        }
      }
    }));
    setIsDirty(true);
  }, []);

  // 11. Load Demo Data (GreenLeaf Organics)
  const loadDemoData = useCallback(() => {
    const demoClone = JSON.parse(JSON.stringify(DEMO_DISCOVERY_DATA));
    setState(demoClone);
    setIsDirty(true);
  }, []);

  // 12. Reset to Pristine Default State
  const resetDiscovery = useCallback(() => {
    removeStoredItem(STORAGE_KEY);
    const freshState = createInitialDiscoveryState();
    setState(freshState);
    setLastSaved(null);
    setIsDirty(false);
    setStorageError(null);
  }, []);

  // 13. Export Ready Data Object
  const getExportData = useCallback(() => {
    return formatExportData(state);
  }, [state]);

  const value = {
    // State slices
    metadata: state.metadata,
    answers: state.answers,
    materials: state.materials,
    internalSummary: state.internalSummary,
    signatures: state.signatures,
    // Status
    isLoaded,
    isDirty,
    lastSaved,
    storageError,
    completion,
    // Actions
    updateMetadata,
    updateAnswer,
    toggleMultiSelect,
    updateOtherValue,
    updateConditionalValue,
    toggleMaterial,
    updateMaterialOther,
    updateInternalSummary,
    generateInternalSummary,
    updateSignature,
    loadDemoData,
    resetDiscovery,
    getExportData
  };

  return <DiscoveryContext.Provider value={value}>{children}</DiscoveryContext.Provider>;
}

export function useDiscovery() {
  const context = useContext(DiscoveryContext);
  if (!context) {
    throw new Error('useDiscovery must be used within a DiscoveryProvider');
  }
  return context;
}

export default DiscoveryContext;
