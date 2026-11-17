import React from 'react';
import Navbar from './Navbar';
import Footer from './Footer';
import ShareModal from '../common/ShareModal';
import { useNavigation } from '../../context/NavigationContext';

/**
 * AppLayout Component
 * Global application layout shell providing semantic landmarks,
 * responsive constraints, and persistent header/footer chrome.
 * 
 * @param {React.ReactNode} children - Active view component
 */
export function AppLayout({ children }) {
  const { currentView, isShareModalOpen, closeShareModal } = useNavigation();

  return (
    <div className={`app-shell view-${currentView}`}>
      {/* Top Application Header */}
      <Navbar />

      {/* Main Landmark Content Region */}
      <main id="main-content" className="app-main" tabIndex={-1}>
        {children}
      </main>

      {/* Persistent Global Footer */}
      <Footer />

      {/* Enterprise Share Modal */}
      <ShareModal
        isOpen={isShareModalOpen}
        onClose={closeShareModal}
      />
    </div>
  );
}

export default AppLayout;

