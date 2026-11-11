import React from 'react';
import { Calendar, Users, Video, Phone, UserCheck, Shield } from 'lucide-react';
import { useDiscovery } from '../../context/DiscoveryContext';

/**
 * MeetingMetadataBar Component
 * Captures interview date, meeting mode (In person, Phone, Video call),
 * and Stuzen representative name.
 */
export function MeetingMetadataBar() {
  const { metadata, updateMetadata } = useDiscovery();

  const meetingModes = [
    { id: 'In person', label: 'In person', icon: Users },
    { id: 'Phone', label: 'Phone', icon: Phone },
    { id: 'Video call', label: 'Video call', icon: Video }
  ];

  return (
    <section className="metadata-panel" aria-label="Meeting Metadata">
      <div className="metadata-panel-title">
        <Shield size={14} aria-hidden="true" />
        <span>Discovery Session Metadata</span>
      </div>

      <div className="metadata-grid">
        {/* Field 1: Interview Date */}
        <div className="metadata-field">
          <label htmlFor="meta-interview-date" className="metadata-label">
            <Calendar size={13} aria-hidden="true" />
            <span>Interview Date</span>
          </label>
          <input
            id="meta-interview-date"
            type="date"
            value={metadata.interviewDate || ''}
            onChange={(e) => updateMetadata('interviewDate', e.target.value)}
            className="input-control"
            aria-label="Interview Date"
          />
        </div>

        {/* Field 2: Meeting Mode Segmented Control */}
        <div className="metadata-field">
          <label id="meeting-mode-label" className="metadata-label">
            <Video size={13} aria-hidden="true" />
            <span>Meeting Mode</span>
          </label>
          <div
            className="segmented-control"
            role="radiogroup"
            aria-labelledby="meeting-mode-label"
          >
            {meetingModes.map((mode) => {
              const isSelected = metadata.meetingMode === mode.id;
              const Icon = mode.icon;
              return (
                <button
                  key={mode.id}
                  type="button"
                  role="radio"
                  aria-checked={isSelected}
                  className={`segmented-option ${isSelected ? 'active' : ''}`}
                  onClick={() => updateMetadata('meetingMode', mode.id)}
                >
                  <Icon size={13} aria-hidden="true" />
                  <span>{mode.label}</span>
                </button>
              );
            })}
          </div>
        </div>

        {/* Field 3: Stuzen Representative */}
        <div className="metadata-field">
          <label htmlFor="meta-stuzen-rep" className="metadata-label">
            <UserCheck size={13} aria-hidden="true" />
            <span>Stuzen Representative</span>
          </label>
          <input
            id="meta-stuzen-rep"
            type="text"
            value={metadata.stuzenRepresentative || ''}
            onChange={(e) => updateMetadata('stuzenRepresentative', e.target.value)}
            placeholder="Lead Consultant / Architect name"
            className="input-control"
            aria-label="Stuzen Representative Name"
          />
        </div>
      </div>
    </section>
  );
}

export default MeetingMetadataBar;
