import React, { useState } from 'react';
import brandConfig from '../../config/brandConfig';

/**
 * BrandLogo Component
 * Context-aware company logo renderer with automatic graceful fallback.
 * 
 * @param {string} variant - 'light' | 'dark' | 'print' | 'accent' | 'icon-light' | 'icon-dark'
 * @param {boolean} compact - when true, renders the compact icon symbol mark
 * @param {string} className - extra CSS classes
 * @param {string} alt - image alt text
 * @param {number|string} width - custom display width (in px or css string)
 * @param {number|string} height - custom display height
 */
export function BrandLogo({
  variant = 'light',
  compact = false,
  className = '',
  alt = brandConfig.companyName,
  width,
  height,
  style = {}
}) {
  const [hasError, setHasError] = useState(false);

  // Determine correct logo asset path based on variant & compactness
  const resolveAssetPath = () => {
    if (compact) {
      if (variant === 'dark' || variant === 'icon-dark') {
        return brandConfig.logos.iconWhite;
      }
      return brandConfig.logos.iconOnly;
    }

    switch (variant) {
      case 'dark':
      case 'footer':
        return brandConfig.logos.white;
      case 'print':
      case 'black':
        return brandConfig.logos.black;
      case 'accent':
      case 'monochromeBlue':
        return brandConfig.logos.monochromeBlue;
      case 'icon-light':
      case 'iconOnly':
        return brandConfig.logos.iconOnly;
      case 'icon-dark':
      case 'iconWhite':
        return brandConfig.logos.iconWhite;
      case 'light':
      default:
        return brandConfig.logos.transparent;
    }
  };

  const assetSrc = resolveAssetPath();

  // Baseline dimensions depending on compact vs full
  const defaultWidth = compact ? 40 : 160;
  const defaultHeight = compact ? 40 : 40;
  const effectiveWidth = width || defaultWidth;
  const effectiveHeight = height || defaultHeight;

  // Graceful fallback when image is missing or fails to load
  if (hasError) {
    const isDark = variant === 'dark' || variant === 'icon-dark' || variant === 'footer';
    const isPrint = variant === 'print' || variant === 'black';

    const fallbackContainerStyle = {
      display: 'inline-flex',
      alignItems: 'center',
      justifyContent: 'center',
      width: typeof effectiveWidth === 'number' ? `${effectiveWidth}px` : effectiveWidth,
      height: typeof effectiveHeight === 'number' ? `${effectiveHeight}px` : effectiveHeight,
      minHeight: '36px',
      borderRadius: compact ? '8px' : '6px',
      backgroundColor: isDark ? '#0f172a' : isPrint ? '#f1f5f9' : '#0a2540',
      color: isPrint ? '#000000' : '#ffffff',
      border: isPrint ? '1px solid #000000' : '1px solid rgba(255, 255, 255, 0.1)',
      userSelect: 'none',
      fontFamily: isPrint ? 'Times New Roman, serif' : '-apple-system, BlinkMacSystemFont, Segoe UI, Roboto, sans-serif',
      ...style
    };

    if (compact) {
      return (
        <div
          className={`brand-logo-fallback compact ${className}`}
          style={fallbackContainerStyle}
          role="img"
          aria-label={alt}
        >
          <span style={{ fontWeight: 800, fontSize: '1.1rem', letterSpacing: '-0.05em' }}>
            S
          </span>
        </div>
      );
    }

    return (
      <div
        className={`brand-logo-fallback full ${className}`}
        style={fallbackContainerStyle}
        role="img"
        aria-label={alt}
      >
        <span style={{ fontWeight: 800, fontSize: '1rem', letterSpacing: '0.08em', textTransform: 'uppercase' }}>
          STUZEN
        </span>
      </div>
    );
  }

  return (
    <img
      src={assetSrc}
      alt={alt}
      width={effectiveWidth}
      height={effectiveHeight}
      onError={() => setHasError(true)}
      className={`brand-logo ${className}`}
      style={{
        objectFit: 'contain',
        maxWidth: '100%',
        height: 'auto',
        display: 'inline-block',
        verticalAlign: 'middle',
        ...style
      }}
      loading="eager"
    />
  );
}

export default BrandLogo;

