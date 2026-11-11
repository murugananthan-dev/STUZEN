import React from 'react';
import { Check, Mail, Phone } from 'lucide-react';
import { useDiscovery } from '../../context/DiscoveryContext';

/**
 * DiscoveryQuestionRenderer Component
 * Universal accessible renderer for all questionnaire questions in Sections 01–05.
 * 
 * Supports:
 * - text, textarea, email, tel, date
 * - contact (split phone & email subfields for Q4)
 * - single (accessible custom radio cards)
 * - multiple (accessible custom checkbox cards with selection indicators)
 * - conditional other and detail fields
 */
export function DiscoveryQuestionRenderer({ question }) {
  const {
    answers,
    updateAnswer,
    toggleMultiSelect,
    updateOtherValue,
    updateConditionalValue
  } = useDiscovery();

  const answerValue = answers[question.id];
  const formattedNumber = String(question.number).padStart(2, '0');

  // Render question header with number tag, label, required indicator, and helper text
  const renderQuestionHeader = () => (
    <div className="question-header">
      <span className="question-num-tag" aria-hidden="true">
        Q{formattedNumber}
      </span>
      <div className="question-label-wrap">
        <label htmlFor={`field-${question.id}`} className="question-label">
          {question.label}
          {question.required && (
            <span className="question-required-star" title="Required field" aria-hidden="true">
              *
            </span>
          )}
        </label>
        {question.helpText && (
          <p className="question-helptext">{question.helpText}</p>
        )}
      </div>
    </div>
  );

  // 1. Text Field
  if (question.type === 'text') {
    return (
      <div className="question-card">
        {renderQuestionHeader()}
        <input
          id={`field-${question.id}`}
          type="text"
          value={typeof answerValue === 'string' ? answerValue : ''}
          onChange={(e) => updateAnswer(question.id, e.target.value)}
          placeholder={question.placeholder || 'Type your answer here...'}
          className="input-control"
          aria-required={question.required}
        />
      </div>
    );
  }

  // 2. Textarea Field
  if (question.type === 'textarea') {
    return (
      <div className="question-card">
        {renderQuestionHeader()}
        <textarea
          id={`field-${question.id}`}
          rows={4}
          value={typeof answerValue === 'string' ? answerValue : ''}
          onChange={(e) => updateAnswer(question.id, e.target.value)}
          placeholder={question.placeholder || 'Provide details here...'}
          className="input-control"
          aria-required={question.required}
        />
      </div>
    );
  }

  // 3. Contact Field (Q4: Separate Phone and Email)
  if (question.type === 'contact') {
    const contactObj = typeof answerValue === 'object' && answerValue !== null
      ? answerValue
      : { phone: '', email: '' };

    return (
      <div className="question-card">
        {renderQuestionHeader()}
        <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fit, minmax(240px, 1fr))', gap: 'var(--space-4)' }}>
          {/* Phone / WhatsApp Subfield */}
          <div>
            <label htmlFor={`field-${question.id}-phone`} className="metadata-label">
              <Phone size={13} aria-hidden="true" />
              <span>Phone / WhatsApp Number</span>
            </label>
            <input
              id={`field-${question.id}-phone`}
              type="tel"
              value={contactObj.phone || ''}
              onChange={(e) =>
                updateAnswer(question.id, {
                  ...contactObj,
                  phone: e.target.value
                })
              }
              placeholder="+1 (555) 000-0000"
              className="input-control"
            />
          </div>

          {/* Email Address Subfield */}
          <div>
            <label htmlFor={`field-${question.id}-email`} className="metadata-label">
              <Mail size={13} aria-hidden="true" />
              <span>Email Address</span>
            </label>
            <input
              id={`field-${question.id}-email`}
              type="email"
              value={contactObj.email || ''}
              onChange={(e) =>
                updateAnswer(question.id, {
                  ...contactObj,
                  email: e.target.value
                })
              }
              placeholder="contact@example.com"
              className="input-control"
            />
          </div>
        </div>
      </div>
    );
  }

  // 4. Single-Choice Options (Radio Cards)
  if (question.type === 'single') {
    const currentSelection = typeof answerValue === 'string' ? answerValue : '';
    const showConditional = question.conditionalField && currentSelection === question.conditionalField.triggerValue;

    return (
      <div className="question-card">
        {renderQuestionHeader()}
        <div
          className="choice-grid"
          role="radiogroup"
          aria-label={question.label}
        >
          {question.options.map((opt) => {
            const isSelected = currentSelection === opt;
            return (
              <div
                key={opt}
                className={`choice-item-card ${isSelected ? 'selected' : ''}`}
                onClick={() => updateAnswer(question.id, opt)}
                role="radio"
                aria-checked={isSelected}
                tabIndex={0}
                onKeyDown={(e) => {
                  if (e.key === ' ' || e.key === 'Enter') {
                    e.preventDefault();
                    updateAnswer(question.id, opt);
                  }
                }}
              >
                <div className="choice-custom-radio" aria-hidden="true">
                  {isSelected && <span className="choice-custom-radio-dot" />}
                </div>
                <span className="choice-item-label">{opt}</span>
              </div>
            );
          })}
        </div>

        {/* Conditional Field (e.g., Q21 multiple languages detail) */}
        {showConditional && (
          <div className="conditional-field-wrapper">
            <label
              htmlFor={`conditional-${question.conditionalField.key}`}
              className="conditional-field-label"
            >
              {question.conditionalField.label}
            </label>
            <input
              id={`conditional-${question.conditionalField.key}`}
              type="text"
              value={answers[question.conditionalField.key] || ''}
              onChange={(e) =>
                updateConditionalValue(
                  question.id,
                  question.conditionalField.key,
                  e.target.value
                )
              }
              placeholder={question.conditionalField.placeholder}
              className="input-control"
            />
          </div>
        )}
      </div>
    );
  }

  // 5. Multiple-Choice Options (Checkbox Cards)
  if (question.type === 'multiple') {
    const selectedList = Array.isArray(answerValue) ? answerValue : [];
    const isOtherSelected = selectedList.some((opt) => opt.startsWith('Other'));
    const otherKey = question.otherKey || `${question.id}_other`;

    // Dynamic grid columns depending on options count
    const gridColsClass = question.options.length > 8 ? 'two-cols' : 'one-col';

    return (
      <div className="question-card">
        {renderQuestionHeader()}

        <div style={{ marginBottom: 'var(--space-2)', fontSize: 'var(--font-xs)', color: 'var(--color-text-muted)' }}>
          {selectedList.length > 0 ? (
            <span style={{ color: 'var(--color-brand-secondary)', fontWeight: 600 }}>
              {selectedList.length} selected
            </span>
          ) : (
            <span>Select all that apply</span>
          )}
        </div>

        <div className={`choice-grid ${gridColsClass}`} role="group" aria-label={question.label}>
          {question.options.map((opt) => {
            const isSelected = selectedList.includes(opt);
            return (
              <div
                key={opt}
                className={`choice-item-card ${isSelected ? 'selected' : ''}`}
                onClick={() => toggleMultiSelect(question.id, opt)}
                role="checkbox"
                aria-checked={isSelected}
                tabIndex={0}
                onKeyDown={(e) => {
                  if (e.key === ' ' || e.key === 'Enter') {
                    e.preventDefault();
                    toggleMultiSelect(question.id, opt);
                  }
                }}
              >
                <div className="choice-custom-box" aria-hidden="true">
                  {isSelected && <Check size={13} strokeWidth={2.5} />}
                </div>
                <span className="choice-item-label">{opt}</span>
              </div>
            );
          })}
        </div>

        {/* Conditional "Other: ___" text input */}
        {question.hasOther && isOtherSelected && (
          <div className="conditional-field-wrapper">
            <label htmlFor={`other-${question.id}`} className="conditional-field-label">
              Please specify other details:
            </label>
            <input
              id={`other-${question.id}`}
              type="text"
              value={answers[otherKey] || ''}
              onChange={(e) => updateOtherValue(question.id, e.target.value)}
              placeholder="Enter your custom requirements here..."
              className="input-control"
              autoFocus
            />
          </div>
        )}
      </div>
    );
  }

  // 6. Date Field
  if (question.type === 'date') {
    return (
      <div className="question-card">
        {renderQuestionHeader()}
        <input
          id={`field-${question.id}`}
          type="date"
          value={typeof answerValue === 'string' ? answerValue : ''}
          onChange={(e) => updateAnswer(question.id, e.target.value)}
          className="input-control"
          aria-required={question.required}
        />
      </div>
    );
  }

  return null;
}

export default DiscoveryQuestionRenderer;
