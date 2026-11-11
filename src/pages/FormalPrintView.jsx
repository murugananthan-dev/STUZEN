import React from 'react';
import { Printer, ArrowLeft, ArrowRight, ShieldCheck, Download } from 'lucide-react';
import { useNavigation } from '../context/NavigationContext';
import BrandLogo from '../components/layout/BrandLogo';
import brandConfig from '../config/brandConfig';

/**
 * FormalPrintView
 * Architectural foundation for the Phase 6 formal client requirements document.
 * Includes interactive print controls for screen view and strict monochrome print formatting.
 */
export function FormalPrintView() {
  const { navigateTo, VIEWS } = useNavigation();
  const currentDate = new Date().toLocaleDateString('en-US', {
    year: 'numeric',
    month: 'long',
    day: 'numeric'
  });

  const handlePrint = () => {
    if (typeof window !== 'undefined') {
      window.print();
    }
  };

  return (
    <div className="formal-print-view view-wrapper" style={{ paddingTop: 'var(--space-6)' }}>
      <div className="container">
        {/* On-Screen Action Toolbar (Hidden during actual print) */}
        <div
          className="no-print"
          style={{
            backgroundColor: 'var(--color-bg-surface)',
            border: '1px solid var(--color-border)',
            borderRadius: 'var(--radius-lg)',
            padding: 'var(--space-4) var(--space-6)',
            marginBottom: 'var(--space-8)',
            display: 'flex',
            alignItems: 'center',
            justifyContent: 'space-between',
            flexWrap: 'wrap',
            gap: 'var(--space-4)',
            boxShadow: 'var(--shadow-sm)'
          }}
        >
          <div style={{ display: 'flex', alignItems: 'center', gap: 'var(--space-3)' }}>
            <button
              type="button"
              className="btn btn-ghost btn-sm"
              onClick={() => navigateTo(VIEWS.DISCOVERY)}
            >
              <ArrowLeft size={16} />
              <span>Back to Discovery</span>
            </button>
            <span style={{ color: 'var(--color-border)' }}>|</span>
            <span style={{ fontSize: 'var(--font-sm)', color: 'var(--color-text-muted)' }}>
              Document Mode: <strong>Formal Print Preview (A4)</strong>
            </span>
          </div>

          <div style={{ display: 'flex', alignItems: 'center', gap: 'var(--space-3)' }}>
            <button
              type="button"
              className="btn btn-secondary btn-sm"
              onClick={() => navigateTo(VIEWS.AGENCY)}
            >
              Agency Home
            </button>
            <button
              type="button"
              className="btn btn-primary btn-sm"
              onClick={handlePrint}
            >
              <Printer size={16} />
              <span>Print / Save as PDF</span>
            </button>
          </div>
        </div>

        {/* Printable Formal Document Sheet */}
        <article
          className="print-document-container"
          style={{
            backgroundColor: '#ffffff',
            border: '1px solid var(--color-border)',
            borderRadius: 'var(--radius-md)',
            padding: 'var(--space-12) var(--space-12)',
            maxWidth: '850px',
            margin: '0 auto',
            boxShadow: 'var(--shadow-md)',
            fontFamily: 'var(--font-family-print)',
            color: '#000000'
          }}
        >
          {/* Document Top Header */}
          <header
            style={{
              display: 'flex',
              alignItems: 'center',
              justifyContent: 'space-between',
              borderBottom: '2px solid #000000',
              paddingBottom: 'var(--space-6)',
              marginBottom: 'var(--space-8)'
            }}
          >
            <div>
              <BrandLogo
                variant="print"
                width={180}
                alt={`${brandConfig.companyName} Formal Logo`}
                className="print-header-logo"
              />
              <div style={{ fontSize: '10pt', marginTop: '4pt', color: '#444444' }}>
                {brandConfig.tagline}
              </div>
            </div>

            <div style={{ textAlign: 'right', fontSize: '9pt', color: '#333333' }}>
              <div><strong>STUZEN TECHNOLOGIES</strong></div>
              <div>Enterprise Architecture & Software Division</div>
              <div>Official Specification Document</div>
            </div>
          </header>

          {/* Document Title Block */}
          <div style={{ marginBottom: 'var(--space-6)' }}>
            <h1
              style={{
                fontSize: '18pt',
                fontWeight: 'bold',
                margin: '0 0 8pt 0',
                color: '#000000',
                border: 'none',
                padding: 0
              }}
            >
              {brandConfig.officialDocumentHeading}
            </h1>
            <p style={{ fontSize: '10pt', color: '#555555', margin: 0 }}>
              Standardized Discovery & Technical Scope Specification Architecture
            </p>
          </div>

          {/* Metadata Grid */}
          <table style={{ width: '100%', marginBottom: '16pt', borderCollapse: 'collapse' }}>
            <tbody>
              <tr>
                <td style={{ width: '25%', fontWeight: 'bold', backgroundColor: '#f5f5f5', border: '1px solid #cccccc', padding: '6pt' }}>
                  Document Date:
                </td>
                <td style={{ width: '25%', border: '1px solid #cccccc', padding: '6pt' }}>
                  {currentDate}
                </td>
                <td style={{ width: '25%', fontWeight: 'bold', backgroundColor: '#f5f5f5', border: '1px solid #cccccc', padding: '6pt' }}>
                  Document Reference:
                </td>
                <td style={{ width: '25%', border: '1px solid #cccccc', padding: '6pt' }}>
                  STZ-REQ-PHASE-1
                </td>
              </tr>
              <tr>
                <td style={{ fontWeight: 'bold', backgroundColor: '#f5f5f5', border: '1px solid #cccccc', padding: '6pt' }}>
                  Status:
                </td>
                <td style={{ border: '1px solid #cccccc', padding: '6pt' }}>
                  Architecture Foundation Ready
                </td>
                <td style={{ fontWeight: 'bold', backgroundColor: '#f5f5f5', border: '1px solid #cccccc', padding: '6pt' }}>
                  Classification:
                </td>
                <td style={{ border: '1px solid #cccccc', padding: '6pt' }}>
                  CONFIDENTIAL / CLIENT SPEC
                </td>
              </tr>
            </tbody>
          </table>

          {/* Section 1: Executive Overview */}
          <section style={{ marginBottom: '16pt' }}>
            <h2 style={{ fontSize: '13pt', fontWeight: 'bold', borderBottom: '1px solid #000000', paddingBottom: '3pt', marginBottom: '8pt' }}>
              1. Executive Overview
            </h2>
            <p style={{ fontSize: '10.5pt', lineHeight: 1.5, margin: '0 0 8pt 0' }}>
              This document establishes the official client discovery and technical scoping framework authored by <strong>{brandConfig.companyName}</strong>. Designed to ensure rigorous alignment between business stakeholders and senior engineering leadership, this specification captures foundational requirements, technology constraints, and deployment criteria.
            </p>
          </section>

          {/* Section 2: Core Service Scope */}
          <section style={{ marginBottom: '16pt' }}>
            <h2 style={{ fontSize: '13pt', fontWeight: 'bold', borderBottom: '1px solid #000000', paddingBottom: '3pt', marginBottom: '8pt' }}>
              2. Core Engineering Capabilities
            </h2>
            <table style={{ width: '100%', borderCollapse: 'collapse' }}>
              <thead>
                <tr style={{ backgroundColor: '#f0f0f0' }}>
                  <th style={{ border: '1px solid #000000', padding: '6pt', fontSize: '10pt', width: '35%' }}>Capability Pillar</th>
                  <th style={{ border: '1px solid #000000', padding: '6pt', fontSize: '10pt' }}>Technical Scope & Deliverables</th>
                </tr>
              </thead>
              <tbody>
                {brandConfig.servicePillars.map((pillar) => (
                  <tr key={pillar.id}>
                    <td style={{ border: '1px solid #cccccc', padding: '6pt', fontSize: '10pt', fontWeight: 'bold' }}>
                      {pillar.title}
                    </td>
                    <td style={{ border: '1px solid #cccccc', padding: '6pt', fontSize: '10pt' }}>
                      {pillar.summary}
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>
          </section>

          {/* Section 3: Architecture Foundation Milestone */}
          <section style={{ marginBottom: '24pt' }}>
            <h2 style={{ fontSize: '13pt', fontWeight: 'bold', borderBottom: '1px solid #000000', paddingBottom: '3pt', marginBottom: '8pt' }}>
              3. Specification Roadmap & Phase Milestones
            </h2>
            <p style={{ fontSize: '10.5pt', lineHeight: 1.5, margin: '0 0 8pt 0' }}>
              The comprehensive questionnaire data capture engine will be fully bound to this document in subsequent development phases. Data collected during the client discovery interview will dynamically compile into formatted architectural requirements, technical matrices, and cost estimates.
            </p>
          </section>

          {/* Signatures & Execution Section */}
          <section className="print-avoid-break" style={{ marginTop: '30pt', paddingTop: '16pt', borderTop: '1px solid #cccccc' }}>
            <div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr', gap: '30pt' }}>
              <div>
                <div style={{ fontSize: '10pt', fontWeight: 'bold', marginBottom: '40pt' }}>
                  Client Authorized Representative:
                </div>
                <div style={{ borderTop: '1px solid #000000', paddingTop: '4pt', fontSize: '9pt' }}>
                  Signature & Date
                </div>
              </div>

              <div>
                <div style={{ fontSize: '10pt', fontWeight: 'bold', marginBottom: '40pt' }}>
                  STUZEN TECHNOLOGIES Lead Architect:
                </div>
                <div style={{ borderTop: '1px solid #000000', paddingTop: '4pt', fontSize: '9pt' }}>
                  Signature & Date
                </div>
              </div>
            </div>
          </section>
        </article>
      </div>
    </div>
  );
}

export default FormalPrintView;
