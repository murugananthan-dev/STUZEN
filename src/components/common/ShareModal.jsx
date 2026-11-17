import React, { useState, useEffect, useRef } from 'react';
import {
  X,
  Copy,
  Check,
  Share2,
  ExternalLink,
  Linkedin,
  Facebook
} from 'lucide-react';
import brandConfig from '../../config/brandConfig';

/**
 * Clean SVG icons for WhatsApp and Telegram to ensure crisp vector display
 * without adding heavy third-party font/icon packages.
 */
function WhatsAppIcon({ size = 20, className = '' }) {
  return (
    <svg
      width={size}
      height={size}
      viewBox="0 0 24 24"
      fill="none"
      stroke="currentColor"
      strokeWidth="2"
      strokeLinecap="round"
      strokeLinejoin="round"
      className={className}
      aria-hidden="true"
    >
      <path d="M21 11.5a8.38 8.38 0 0 1-.9 3.8 8.5 8.5 0 0 1-7.6 4.7 8.38 8.38 0 0 1-3.8-.9L3 21l1.9-5.7a8.38 8.38 0 0 1-.9-3.8 8.5 8.5 0 0 1 4.7-7.6 8.38 8.38 0 0 1 3.8-.9h.5a8.48 8.48 0 0 1 8 8v.5z" />
    </svg>
  );
}

function TelegramIcon({ size = 20, className = '' }) {
  return (
    <svg
      width={size}
      height={size}
      viewBox="0 0 24 24"
      fill="none"
      stroke="currentColor"
      strokeWidth="2"
      strokeLinecap="round"
      strokeLinejoin="round"
      className={className}
      aria-hidden="true"
    >
      <path d="M22 2L11 13" />
      <path d="M22 2L15 22L11 13L2 9L22 2Z" />
    </svg>
  );
}

/**
 * Standard Production Share URL & Message
 */
export const OFFICIAL_SHARE_URL = 'https://stuzen-technologies.vercel.app';

export const OFFICIAL_SHARE_MESSAGE = `Discover STUZEN TECHNOLOGIES!

Looking for modern websites, custom software, web applications or AI-powered automation?

Explore our digital solutions.

Website: https://stuzen-technologies.vercel.app

Learn. Build. Innovate.

Feel free to share STUZEN with someone who may need digital solutions!`;

/**
 * ShareModal Component
 * Enterprise-grade, accessible dialog for sharing STUZEN TECHNOLOGIES across
 * WhatsApp, LinkedIn, Facebook, Telegram, native Web Share, and link copying.
 *
 * @param {Object} props
 * @param {boolean} props.isOpen - Controls modal visibility
 * @param {() => void} props.onClose - Dismiss callback
 */
export function ShareModal({ isOpen, onClose }) {
  const [copied, setCopied] = useState(false);
  const [copyFeedback, setCopyFeedback] = useState('');
  const [supportsNativeShare, setSupportsNativeShare] = useState(false);
  const modalRef = useRef(null);
  const closeBtnRef = useRef(null);

  // Check Web Share API support once mounted
  useEffect(() => {
    if (typeof navigator !== 'undefined' && typeof navigator.share === 'function') {
      setSupportsNativeShare(true);
    }
  }, []);

  // Keyboard navigation: Escape key closes modal
  useEffect(() => {
    if (!isOpen) return;

    const handleKeyDown = (e) => {
      if (e.key === 'Escape') {
        e.preventDefault();
        onClose();
      }
    };

    window.addEventListener('keydown', handleKeyDown);
    return () => window.removeEventListener('keydown', handleKeyDown);
  }, [isOpen, onClose]);

  // Lock body scroll and set focus when modal opens
  useEffect(() => {
    if (isOpen) {
      const originalOverflow = document.body.style.overflow;
      document.body.style.overflow = 'hidden';
      if (closeBtnRef.current) {
        closeBtnRef.current.focus();
      }
      return () => {
        document.body.style.overflow = originalOverflow;
      };
    }
  }, [isOpen]);

  // Reset copied feedback when modal is dismissed
  useEffect(() => {
    if (!isOpen) {
      setCopied(false);
      setCopyFeedback('');
    }
  }, [isOpen]);

  if (!isOpen) return null;

  // Destination URLs
  const encodedUrl = encodeURIComponent(OFFICIAL_SHARE_URL);
  const encodedText = encodeURIComponent(OFFICIAL_SHARE_MESSAGE);

  const shareDestinations = [
    {
      id: 'whatsapp',
      name: 'WhatsApp',
      url: `https://api.whatsapp.com/send?text=${encodedText}`,
      icon: WhatsAppIcon,
      color: '#25D366',
      bgColor: '#e8fbf0',
      description: 'Share message directly with contacts & groups'
    },
    {
      id: 'linkedin',
      name: 'LinkedIn',
      url: `https://www.linkedin.com/sharing/share-offsite/?url=${encodedUrl}`,
      icon: Linkedin,
      color: '#0A66C2',
      bgColor: '#e6f0fa',
      description: 'Post to your professional business network'
    },
    {
      id: 'facebook',
      name: 'Facebook',
      url: `https://www.facebook.com/sharer/sharer.php?u=${encodedUrl}`,
      icon: Facebook,
      color: '#1877F2',
      bgColor: '#eaf2fe',
      description: 'Share website to your timeline or groups'
    },
    {
      id: 'telegram',
      name: 'Telegram',
      url: `https://t.me/share/url?url=${encodedUrl}&text=${encodedText}`,
      icon: TelegramIcon,
      color: '#229ED9',
      bgColor: '#e8f6fc',
      description: 'Send to direct chats or community channels'
    }
  ];

  // Copy to clipboard with modern API & robust fallback
  const handleCopyLink = async () => {
    let success = false;

    // 1. Try modern async Clipboard API
    if (typeof navigator !== 'undefined' && navigator.clipboard && navigator.clipboard.writeText) {
      try {
        await navigator.clipboard.writeText(OFFICIAL_SHARE_URL);
        success = true;
      } catch {
        success = false;
      }
    }

    // 2. Robust fallback for headless/restricted permissions
    if (!success && typeof document !== 'undefined') {
      try {
        const textarea = document.createElement('textarea');
        textarea.value = OFFICIAL_SHARE_URL;
        textarea.setAttribute('readonly', '');
        textarea.style.position = 'fixed';
        textarea.style.opacity = '0';
        textarea.style.pointerEvents = 'none';
        document.body.appendChild(textarea);
        textarea.focus();
        textarea.select();
        success = document.execCommand('copy');
        document.body.removeChild(textarea);
      } catch {
        success = false;
      }
    }

    if (success) {
      setCopied(true);
      setCopyFeedback('Link copied to clipboard!');
      setTimeout(() => {
        setCopied(false);
        setCopyFeedback('');
      }, 2500);
    } else {
      setCopyFeedback('Please copy manually: ' + OFFICIAL_SHARE_URL);
    }
  };

  // Native device share trigger
  const handleNativeShare = async () => {
    if (!navigator.share) return;
    try {
      await navigator.share({
        title: brandConfig.companyName || 'STUZEN TECHNOLOGIES',
        text: OFFICIAL_SHARE_MESSAGE,
        url: OFFICIAL_SHARE_URL
      });
    } catch (err) {
      // User dismissed or aborted share dialog - safely ignore
      if (err.name !== 'AbortError') {
        console.warn('Native share failed:', err);
      }
    }
  };

  return (
    <div
      className="share-modal-backdrop"
      onClick={(e) => {
        if (e.target === e.currentTarget) {
          onClose();
        }
      }}
      role="presentation"
    >
      <div
        className="share-modal-dialog"
        role="dialog"
        aria-modal="true"
        aria-labelledby="share-modal-title"
        ref={modalRef}
      >
        {/* Header */}
        <div className="share-modal-header">
          <div className="share-modal-header-text">
            <div className="share-modal-pill">
              <Share2 size={12} strokeWidth={2.4} aria-hidden="true" />
              <span>Share STUZEN</span>
            </div>
            <h2 id="share-modal-title" className="share-modal-title">
              Spread the Word
            </h2>
            <p className="share-modal-subtitle">
              Share STUZEN TECHNOLOGIES digital solutions, software, and AI automation with your network.
            </p>
          </div>
          <button
            type="button"
            className="share-modal-close"
            onClick={onClose}
            aria-label="Close share dialog"
            ref={closeBtnRef}
          >
            <X size={18} />
          </button>
        </div>

        {/* Modal Body */}
        <div className="share-modal-body">
          {/* Quick Copy Link Box */}
          <div className="share-copy-box">
            <label htmlFor="stuzen-share-url" className="share-field-label">
              Official Website Link
            </label>
            <div className="share-copy-input-row">
              <input
                id="stuzen-share-url"
                type="text"
                readOnly
                value={OFFICIAL_SHARE_URL}
                className="share-url-input"
                onClick={(e) => e.target.select()}
                aria-label="Official Website Link"
              />
              <button
                type="button"
                onClick={handleCopyLink}
                className={`share-copy-button ${copied ? 'copied' : ''}`}
                aria-label={copied ? 'Link copied' : 'Copy website link to clipboard'}
              >
                {copied ? (
                  <>
                    <Check size={16} strokeWidth={2.5} />
                    <span>Copied!</span>
                  </>
                ) : (
                  <>
                    <Copy size={16} strokeWidth={2} />
                    <span>Copy Link</span>
                  </>
                )}
              </button>
            </div>
            {copyFeedback && (
              <p className="share-feedback-msg" role="status" aria-live="polite">
                {copyFeedback}
              </p>
            )}
          </div>

          {/* Social Platforms Grid */}
          <div className="share-platforms-section">
            <span className="share-section-label">Select Platform</span>
            <div className="share-platforms-grid">
              {shareDestinations.map((platform) => {
                const IconComponent = platform.icon;
                return (
                  <a
                    key={platform.id}
                    href={platform.url}
                    target="_blank"
                    rel="noopener noreferrer"
                    className="share-platform-btn"
                    data-platform={platform.id}
                    aria-label={`Share on ${platform.name} (opens in a new tab)`}
                  >
                    <div
                      className="share-platform-icon-wrap"
                      style={{ backgroundColor: platform.bgColor, color: platform.color }}
                    >
                      <IconComponent size={20} />
                    </div>
                    <div className="share-platform-info">
                      <span className="share-platform-name">{platform.name}</span>
                      <span className="share-platform-desc">{platform.description}</span>
                    </div>
                    <ExternalLink size={14} className="share-platform-arrow" aria-hidden="true" />
                  </a>
                );
              })}
            </div>
          </div>

          {/* Native Device Share API Option (When supported) */}
          {supportsNativeShare && (
            <div className="share-native-section">
              <button
                type="button"
                onClick={handleNativeShare}
                className="share-native-btn"
                aria-label="Open device native sharing menu"
              >
                <Share2 size={16} />
                <span>Share via Device Menu (AirDrop, Nearby, More)</span>
              </button>
            </div>
          )}

          {/* Share Preview Card */}
          <div className="share-preview-card">
            <span className="share-preview-label">Prefilled Message Preview</span>
            <blockquote className="share-preview-quote">
              <p className="whitespace-pre-line text-xs text-slate-600 font-mono leading-relaxed">
                {OFFICIAL_SHARE_MESSAGE}
              </p>
            </blockquote>
          </div>
        </div>

        {/* Footer */}
        <div className="share-modal-footer">
          <span className="share-footer-note">
            Learn. Build. Innovate. • STUZEN TECHNOLOGIES
          </span>
          <button
            type="button"
            className="share-modal-done-btn"
            onClick={onClose}
          >
            Done
          </button>
        </div>
      </div>
    </div>
  );
}

export default ShareModal;
