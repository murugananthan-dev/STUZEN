import React from 'react';
import { NavigationProvider, useNavigation, VIEWS } from './context/NavigationContext';
import { DiscoveryProvider } from './context/DiscoveryContext';
import AppLayout from './components/layout/AppLayout';
import AgencyHomeView from './pages/AgencyHomeView';
import DiscoveryWizardView from './pages/DiscoveryWizardView';
import FormalPrintView from './pages/FormalPrintView';

/**
 * AppContent Component
 * Renders the active view inside the AppLayout shell based on internal routing state.
 */
function AppContent() {
  const { currentView } = useNavigation();

  const renderActiveView = () => {
    switch (currentView) {
      case VIEWS.DISCOVERY:
        return <DiscoveryWizardView />;
      case VIEWS.PRINT:
        return <FormalPrintView />;
      case VIEWS.AGENCY:
      default:
        return <AgencyHomeView />;
    }
  };

  return <AppLayout>{renderActiveView()}</AppLayout>;
}

/**
 * Root Application Component
 * Wraps the app with NavigationProvider and DiscoveryProvider.
 */
export function App() {
  return (
    <NavigationProvider>
      <DiscoveryProvider>
        <AppContent />
      </DiscoveryProvider>
    </NavigationProvider>
  );
}

export default App;
