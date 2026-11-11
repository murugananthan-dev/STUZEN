import React, { createContext, useContext, useState, useEffect, useCallback } from 'react';

/**
 * Valid view destinations in the application
 */
export const VIEWS = {
  AGENCY: 'agency',
  DISCOVERY: 'discovery',
  PRINT: 'print'
};

const STORAGE_KEY = 'stuzen_active_view';
const VALID_VIEWS = Object.values(VIEWS);

const NavigationContext = createContext({
  currentView: VIEWS.AGENCY,
  navigateTo: () => {},
  isView: () => false
});

export function NavigationProvider({ children }) {
  // Initialize from localStorage with fallback to default 'agency'
  const [currentView, setCurrentView] = useState(() => {
    try {
      const stored = localStorage.getItem(STORAGE_KEY);
      if (stored && VALID_VIEWS.includes(stored)) {
        return stored;
      }
    } catch {
      // Gracefully handle disabled localStorage (private browsing)
    }
    return VIEWS.AGENCY;
  });

  // Navigate handler that persists view selection and resets scroll
  const navigateTo = useCallback((view) => {
    const targetView = VALID_VIEWS.includes(view) ? view : VIEWS.AGENCY;
    setCurrentView(targetView);

    try {
      localStorage.setItem(STORAGE_KEY, targetView);
    } catch {
      // Storage unavailable or quota exceeded
    }

    // Scroll smoothly to top on view transition
    if (typeof window !== 'undefined') {
      window.scrollTo({ top: 0, behavior: 'smooth' });
    }
  }, []);

  const isView = useCallback(
    (view) => currentView === view,
    [currentView]
  );

  return (
    <NavigationContext.Provider value={{ currentView, navigateTo, isView, VIEWS }}>
      {children}
    </NavigationContext.Provider>
  );
}

export function useNavigation() {
  const context = useContext(NavigationContext);
  if (!context) {
    throw new Error('useNavigation must be used within a NavigationProvider');
  }
  return context;
}

export default NavigationContext;

