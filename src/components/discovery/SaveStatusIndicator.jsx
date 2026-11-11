import React from 'react';
import { Check, AlertCircle, Clock, Loader2 } from 'lucide-react';
import { useDiscovery } from '../../context/DiscoveryContext';

/**
 * SaveStatusIndicator Component
 * Visual feedback pill reflecting local-first autosave persistence state.
 */
export function SaveStatusIndicator() {
  const { isLoaded, isDirty, lastSaved, storageError } = useDiscovery();

  if (!isLoaded) {
    return (
      <div className="save-status-pill" role="status" aria-live="polite">
        <Loader2 size={12} className="spin" aria-hidden="true" />
        <span>Loading saved discovery...</span>
      </div>
    );
  }

  if (storageError) {
    return (
      <div className="save-status-pill" style={{ borderColor: 'var(--color-danger)' }} role="status" aria-live="polite">
        <span className="save-status-dot error" aria-hidden="true" />
        <span style={{ color: 'var(--color-danger)' }}>{storageError}</span>
      </div>
    );
  }

  if (isDirty) {
    return (
      <div className="save-status-pill" role="status" aria-live="polite">
        <span className="save-status-dot dirty" aria-hidden="true" />
        <span>Saving changes...</span>
      </div>
    );
  }

  if (lastSaved) {
    const timeString = new Date(lastSaved).toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' });
    return (
      <div className="save-status-pill" role="status" aria-live="polite">
        <span className="save-status-dot saved" aria-hidden="true" />
        <span>Saved locally at {timeString}</span>
      </div>
    );
  }

  return (
    <div className="save-status-pill" role="status" aria-live="polite">
      <span className="save-status-dot saved" aria-hidden="true" />
      <span>Ready & auto-saving</span>
    </div>
  );
}

export default SaveStatusIndicator;

