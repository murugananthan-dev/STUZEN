import React, { useEffect } from 'react';
import { ExportToolbar } from '../components/discovery/ExportToolbar';
import { FormalPrintDocument } from '../components/discovery/FormalPrintDocument';

/**
 * FormalPrintView Component (Phase 6)
 * Dedicated view hosting the formal black-and-white A4 printable document.
 * 
 * Features:
 * - Floating/sticky export toolbar with Print/Save-as-PDF, WhatsApp handover, and return navigation
 * - Complete A4-proportioned paper preview on screen
 * - Clean CSS isolation for physical printing via print.css
 */
export function FormalPrintView() {
  // Ensure document title reflects formal print view
  useEffect(() => {
    const originalTitle = document.title;
    document.title = 'STUZEN TECHNOLOGIES | Formal Requirements Document';
    return () => {
      document.title = originalTitle;
    };
  }, []);

  return (
    <div className="formal-print-view view-wrapper">
      <div className="container print-view-container">
        {/* On-Screen Action Toolbar (Hidden during browser print) */}
        <ExportToolbar />

        {/* Printable Formal Document Sheet */}
        <main className="print-sheet-wrapper" role="main">
          <FormalPrintDocument />
        </main>
      </div>
    </div>
  );
}

export default FormalPrintView;
