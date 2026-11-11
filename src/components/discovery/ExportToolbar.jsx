import React, { useState } from 'react';
import { Printer, Share2, Copy, ArrowLeft, Eye, Check, ExternalLink } from 'lucide-react';
import { useNavigation } from '../../context/NavigationContext';
import { useDiscovery } from '../../context/DiscoveryContext';
import { generateWhatsAppMessage, getWhatsAppShareUrl } from '../../utils/whatsappHandover';

/**
 * ExportToolbar Component
 * Floating / sticky action bar for printing, exporting to PDF,
 * copying WhatsApp summaries, and navigating back to the questionnaire.
 * Automatically hidden during actual browser print via .no-print.
 */
export function ExportToolbar() {
  const { navigateTo, VIEWS } = useNavigation();
  const discoveryState = useDiscovery();
  const [copied, setCopied] = useState(false);
  const [copyError, setCopyError] = useState(false);

  // Trigger Browser Native Print / Save as PDF
  const handlePrint = () => {
    if (typeof window !== 'undefined') {
      window.print();
    }
  };

  // Copy WhatsApp Handover Summary to Clipboard with safe fallback
  const handleCopyWhatsApp = async () => {
    const text = generateWhatsAppMessage(discoveryState);
    try {
      if (navigator?.clipboard?.writeText) {
        await navigator.clipboard.writeText(text);
        setCopied(true);
        setTimeout(() => setCopied(false), 3000);
      } else {
        // Fallback for environments where Clipboard API is restricted
        const textarea = document.createElement('textarea');
        textarea.value = text;
        textarea.style.position = 'fixed';
        textarea.style.opacity = '0';
        document.body.appendChild(textarea);
        textarea.focus();
        textarea.select();
        const success = document.execCommand('copy');
        document.body.removeChild(textarea);
        if (success) {
          setCopied(true);
          setTimeout(() => setCopied(false), 3000);
        } else {
          setCopyError(true);
          setTimeout(() => setCopyError(false), 3000);
        }
      }
    } catch {
      setCopyError(true);
      setTimeout(() => setCopyError(false), 3000);
    }
  };

  // Open WhatsApp in new tab with prefilled message
  const handleOpenWhatsApp = () => {
    const url = getWhatsAppShareUrl(discoveryState);
    if (typeof window !== 'undefined') {
      window.open(url, '_blank', 'noopener,noreferrer');
    }
  };

  // Scroll to document top
  const handleScrollToTop = () => {
    if (typeof window !== 'undefined') {
      window.scrollTo({ top: 0, behavior: 'smooth' });
    }
  };

  return (
    <aside className="no-print export-toolbar-container" aria-label="Document Export Toolbar">
      <div className="export-toolbar-card">
        {/* Left: Return Navigation */}
        <div className="export-toolbar-left">
          <button
            type="button"
            className="btn btn-ghost btn-sm"
            onClick={() => navigateTo(VIEWS.DISCOVERY)}
            aria-label="Return to Discovery Questionnaire"
          >
            <ArrowLeft size={16} aria-hidden="true" />
            <span>Return to Questionnaire</span>
          </button>
          <span className="export-toolbar-divider" aria-hidden="true">|</span>
          <span className="export-toolbar-status-badge">
            Document Mode: <strong>Official Monochrome A4</strong>
          </span>
        </div>

        {/* Right: Export Actions */}
        <div className="export-toolbar-right">
          {/* Scroll to Top / Preview */}
          <button
            type="button"
            className="btn btn-secondary btn-sm"
            onClick={handleScrollToTop}
            title="Scroll to top of document"
            aria-label="Preview Document Top"
          >
            <Eye size={14} aria-hidden="true" />
            <span>Top</span>
          </button>

          {/* Copy WhatsApp Summary */}
          <button
            type="button"
            className={`btn btn-secondary btn-sm ${copied ? 'btn-success-copy' : ''}`}
            onClick={handleCopyWhatsApp}
            title="Copy structured discovery summary for WhatsApp handover"
            aria-label="Copy WhatsApp Summary to Clipboard"
          >
            {copied ? (
              <>
                <Check size={14} color="var(--color-success)" aria-hidden="true" />
                <span style={{ color: 'var(--color-success)', fontWeight: 600 }}>Copied Summary!</span>
              </>
            ) : copyError ? (
              <span>Copy failed</span>
            ) : (
              <>
                <Copy size={14} aria-hidden="true" />
                <span>Copy for WhatsApp</span>
              </>
            )}
          </button>

          {/* Open WhatsApp */}
          <button
            type="button"
            className="btn btn-secondary btn-sm"
            onClick={handleOpenWhatsApp}
            title="Open WhatsApp with prefilled discovery handover summary"
            aria-label="Open in WhatsApp"
          >
            <Share2 size={14} aria-hidden="true" />
            <span>Open WhatsApp</span>
            <ExternalLink size={12} style={{ opacity: 0.6 }} aria-hidden="true" />
          </button>

          {/* Print / Save as PDF */}
          <button
            type="button"
            className="btn btn-primary btn-sm"
            onClick={handlePrint}
            title="Open browser print dialog (select 'Save as PDF' to export PDF)"
            aria-label="Print or Save as PDF"
            style={{ backgroundColor: '#0a2540', borderColor: '#0a2540' }}
          >
            <Printer size={15} aria-hidden="true" />
            <span>Print / Save as PDF</span>
          </button>
        </div>
      </div>
    </aside>
  );
}

export default ExportToolbar;

