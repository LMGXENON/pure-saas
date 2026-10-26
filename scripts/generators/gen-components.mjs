import fs from 'fs';
import path from 'path';
import { fileURLToPath } from 'url';

const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);
const targetDir = path.resolve(__dirname, '../../references/components');

if (!fs.existsSync(targetDir)) {
  fs.mkdirSync(targetDir, { recursive: true });
}

const components = [
  {
    name: 'button.md',
    title: 'Button Component Architecture & Craft Guidelines',
    overview: 'Buttons communicate actions that users can take throughout an application. In Pure SaaS, buttons represent tactile, purposeful decision points rather than decorative clickable rectangles. They must balance immediate visual clarity, precise state feedback, and strict accessibility guarantees.',
    states: [
      { state: 'Default', visual: 'High contrast surface, crisp 1px border or solid fill, legible label with optical tracking', token: 'var(--color-button-primary-bg)' },
      { state: 'Hover', visual: 'Subtle luminance elevation (+4% lightness) or subtle backdrop shift, no jarring layout shifts', token: 'var(--color-button-primary-hover)' },
      { state: 'Active / Pressed', visual: 'Scale transform (scale(0.98)), inset shadow or luminance reduction (-4%)', token: 'var(--color-button-primary-active)' },
      { state: 'Focus-Visible', visual: '2px high-contrast ring with 2px offset, never outline: none without replacement', token: 'var(--color-focus-ring)' },
      { state: 'Disabled', visual: 'Reduced opacity (0.4-0.5), cursor: not-allowed, pointer-events: none, aria-disabled="true"', token: 'var(--color-button-disabled)' },
      { state: 'Loading', visual: 'Inline micro-spinner or shimmer, label remains visible or replaced with accessible live text, fixed width preserved', token: 'var(--color-button-loading)' }
    ],
    codeSnippet: `import React, { forwardRef } from 'react';

export interface ButtonProps extends React.ButtonHTMLAttributes<HTMLButtonElement> {
  variant?: 'primary' | 'secondary' | 'ghost' | 'danger';
  size?: 'sm' | 'md' | 'lg';
  isLoading?: boolean;
  leftIcon?: React.ReactNode;
  rightIcon?: React.ReactNode;
}

export const Button = forwardRef<HTMLButtonElement, ButtonProps>(({
  children,
  variant = 'primary',
  size = 'md',
  isLoading = false,
  disabled,
  leftIcon,
  rightIcon,
  className = '',
  ...props
}, ref) => {
  const baseStyles = "inline-flex items-center justify-center font-medium transition-all duration-150 ease-out select-none focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-offset-2 active:scale-[0.98] disabled:opacity-50 disabled:pointer-events-none disabled:active:scale-100";
  
  const sizeStyles = {
    sm: "h-8 px-3 text-xs gap-1.5 rounded-md min-w-[32px]",
    md: "h-10 px-4 text-sm gap-2 rounded-lg min-w-[40px]",
    lg: "h-12 px-5 text-base gap-2.5 rounded-xl min-w-[48px]"
  };

  const variantStyles = {
    primary: "bg-[var(--color-primary-base)] text-[var(--color-primary-foreground)] hover:bg-[var(--color-primary-hover)] shadow-sm focus-visible:ring-[var(--color-focus-ring)]",
    secondary: "bg-[var(--color-surface-elevated)] text-[var(--color-text-primary)] border border-[var(--color-border-subtle)] hover:bg-[var(--color-surface-hover)] hover:border-[var(--color-border-hover)] focus-visible:ring-[var(--color-focus-ring)]",
    ghost: "bg-transparent text-[var(--color-text-secondary)] hover:text-[var(--color-text-primary)] hover:bg-[var(--color-surface-hover)] focus-visible:ring-[var(--color-focus-ring)]",
    danger: "bg-[var(--color-danger-base)] text-[var(--color-danger-foreground)] hover:bg-[var(--color-danger-hover)] focus-visible:ring-[var(--color-danger-ring)]"
  };

  return (
    <button
      ref={ref}
      disabled={disabled || isLoading}
      aria-busy={isLoading}
      aria-disabled={disabled || isLoading}
      className={\`\${baseStyles} \${sizeStyles[size]} \${variantStyles[variant]} \${className}\`}
      {...props}
    >
      {isLoading ? (
        <span className="inline-block w-4 h-4 border-2 border-current border-t-transparent rounded-full animate-spin" aria-hidden="true" />
      ) : leftIcon ? (
        <span className="inline-flex shrink-0" aria-hidden="true">{leftIcon}</span>
      ) : null}
      
      <span className={isLoading ? "opacity-70" : ""}>{children}</span>
      
      {!isLoading && rightIcon && (
        <span className="inline-flex shrink-0" aria-hidden="true">{rightIcon}</span>
      )}
    </button>
  );
});

Button.displayName = 'Button';`,
    dos: [
      'Maintain fixed height across variants to prevent vertical layout jitter.',
      'Preserve the original button bounding box width during loading states.',
      'Use semantic <button type="button"> unless submitting an actual <form>.',
      'Provide visible focus rings that achieve at least 3.0:1 contrast against adjacent background.'
    ],
    donts: [
      'Never render clickable <div> elements instead of native <button> tags.',
      'Avoid generic gradient fills with unreadable white text on light pastel colors.',
      'Never use pure opacity drops without border adjustments in dark mode.',
      'Never remove focus-visible indicators without an explicit replacement ring.'
    ],
    accessibility: [
      'WCAG 2.2 AA Success Criterion 2.5.8: Target size must be at least 24x24px, recommended 44x44px for primary touch interactions.',
      'WCAG 1.4.3: Minimum contrast ratio of 4.5:1 for button text against button surface.',
      'Screen reader support: Loading buttons must indicate state via aria-busy="true" and descriptive accessible label.'
    ]
  },
  {
    name: 'input-text.md',
    title: 'Text Input & Field Primitives Specification',
    overview: 'Text fields allow users to enter, edit, and search textual data. In Pure SaaS, input fields must be calm, predictable, and immediately responsive to keyboard interaction, validation states, and system autofill.',
    states: [
      { state: 'Rest / Default', visual: 'Neutral subtle border (1px solid var(--color-border-default)), clean background, legible placeholder with >= 4.5:1 contrast', token: 'var(--color-input-bg)' },
      { state: 'Hover', visual: 'Border sharpens slightly to var(--color-border-hover), no jumpy box-shadow', token: 'var(--color-border-hover)' },
      { state: 'Focused', visual: 'Continuous border glow or 2px offset focus ring; label remains visible and anchored', token: 'var(--color-focus-ring)' },
      { state: 'Filled', visual: 'Primary text color with optional clear affordance button on trailing edge', token: 'var(--color-text-primary)' },
      { state: 'Invalid / Error', visual: 'Error border (var(--color-danger-border)), helper text switches to error color with icon', token: 'var(--color-danger-base)' },
      { state: 'Disabled', visual: 'Subtle hatched or dim background, cursor: not-allowed, user-select: none', token: 'var(--color-surface-disabled)' }
    ],
    codeSnippet: `import React, { useId } from 'react';

export interface TextInputProps extends React.InputHTMLAttributes<HTMLInputElement> {
  label: string;
  helperText?: string;
  error?: string;
  leftElement?: React.ReactNode;
  rightElement?: React.ReactNode;
}

export const TextInput: React.FC<TextInputProps> = ({
  label,
  helperText,
  error,
  leftElement,
  rightElement,
  id: customId,
  disabled,
  className = '',
  ...props
}) => {
  const generatedId = useId();
  const inputId = customId || generatedId;
  const errorId = \`\${inputId}-error\`;
  const helperId = \`\${inputId}-helper\`;

  return (
    <div className="flex flex-col gap-1.5 w-full text-left">
      <label htmlFor={inputId} className="text-xs font-semibold tracking-wide text-[var(--color-text-secondary)]">
        {label}
      </label>
      
      <div className="relative flex items-center">
        {leftElement && (
          <div className="absolute left-3 text-[var(--color-text-muted)] pointer-events-none flex items-center">
            {leftElement}
          </div>
        )}
        
        <input
          id={inputId}
          disabled={disabled}
          aria-invalid={Boolean(error)}
          aria-describedby={error ? errorId : helperText ? helperId : undefined}
          className={\`w-full h-10 px-3 \${leftElement ? 'pl-9' : ''} \${rightElement ? 'pr-9' : ''} text-sm rounded-lg bg-[var(--color-surface-base)] border text-[var(--color-text-primary)] placeholder-[var(--color-text-muted)] transition-colors duration-150 focus:outline-none focus:ring-2 focus:ring-[var(--color-focus-ring)] \${
            error 
              ? 'border-[var(--color-danger-base)] focus:ring-[var(--color-danger-ring)]' 
              : 'border-[var(--color-border-default)] hover:border-[var(--color-border-hover)]'
          } disabled:bg-[var(--color-surface-disabled)] disabled:cursor-not-allowed \${className}\`}
          {...props}
        />
        
        {rightElement && (
          <div className="absolute right-3 text-[var(--color-text-muted)] flex items-center">
            {rightElement}
          </div>
        )}
      </div>

      {error ? (
        <p id={errorId} role="alert" className="text-xs text-[var(--color-danger-text)] font-medium">
          {error}
        </p>
      ) : helperText ? (
        <p id={helperId} className="text-xs text-[var(--color-text-muted)]">
          {helperText}
        </p>
      ) : null}
    </div>
  );
};`,
    dos: [
      'Always connect the <label> element using htmlFor matching the input id.',
      'Bind error messages via aria-describedby and role="alert".',
      'Preserve proper input type attributes (email, tel, url, number) to trigger correct mobile virtual keyboards.',
      'Ensure autocomplete attributes are present for authentication, address, and credit card fields.'
    ],
    donts: [
      'Never rely solely on placeholders to describe field purpose (placeholders vanish on entry).',
      'Do not rely solely on color to indicate an invalid state; include an icon or explanatory text.',
      'Never disable cut, copy, or paste actions on password or confirmation inputs.',
      'Never apply generic floating labels that jitter or cause layout reflows.'
    ],
    accessibility: [
      'WCAG 3.3.1 Error Identification: Any input error must be described to the user in text.',
      'WCAG 1.3.1 Info and Relationships: Programmatic link between label, input, and description.',
      'Color contrast: Input border must have at least 3.0:1 contrast with adjacent surface.'
    ]
  },
  {
    name: 'textarea.md',
    title: 'Textarea & Multi-line Editor Specification',
    overview: 'Multi-line inputs accommodate variable-length content such as comments, notes, and code snippets. They require responsive auto-expanding behaviors or clearly bounded scrolling with character counting affordances.',
    states: [
      { state: 'Default', visual: 'Balanced vertical padding (10-12px), fixed line-height (1.5), visible resize handle or auto-grow', token: 'var(--color-input-bg)' },
      { state: 'Focused', visual: 'High contrast ring, helper character counter updates dynamically', token: 'var(--color-focus-ring)' },
      { state: 'Overflow / Scroll', visual: 'Subtle custom scrollbar matching surface tokens, no jarring gutter popping', token: 'var(--color-scrollbar-thumb)' },
      { state: 'Approaching Limit', visual: 'Counter turns warning amber at 90% character limit', token: 'var(--color-warning-text)' }
    ],
    codeSnippet: `import React, { useRef, useEffect } from 'react';

export interface TextareaProps extends React.TextareaHTMLAttributes<HTMLTextAreaElement> {
  label: string;
  maxLength?: number;
  autoResize?: boolean;
  value?: string;
}

export const Textarea: React.FC<TextareaProps> = ({
  label,
  maxLength,
  autoResize = true,
  value,
  id,
  onChange,
  className = '',
  ...props
}) => {
  const textareaRef = useRef<HTMLTextAreaElement>(null);
  const currentLength = typeof value === 'string' ? value.length : 0;

  useEffect(() => {
    if (autoResize && textareaRef.current) {
      textareaRef.current.style.height = 'auto';
      textareaRef.current.style.height = \`\${textareaRef.current.scrollHeight}px\`;
    }
  }, [value, autoResize]);

  return (
    <div className="flex flex-col gap-1.5 w-full">
      <div className="flex justify-between items-center">
        <label htmlFor={id} className="text-xs font-semibold text-[var(--color-text-secondary)]">{label}</label>
        {maxLength && (
          <span className="text-xs text-[var(--color-text-muted)] font-mono">
            {currentLength}/{maxLength}
          </span>
        )}
      </div>
      <textarea
        id={id}
        ref={textareaRef}
        value={value}
        maxLength={maxLength}
        onChange={onChange}
        rows={3}
        className={\`w-full p-3 text-sm rounded-lg bg-[var(--color-surface-base)] border border-[var(--color-border-default)] text-[var(--color-text-primary)] placeholder-[var(--color-text-muted)] focus:outline-none focus:ring-2 focus:ring-[var(--color-focus-ring)] resize-none transition-all duration-150 \${className}\`}
        {...props}
      />
    </div>
  );
};`,
    dos: [
      'Provide comfortable line-height (1.4-1.6) for legible paragraph entry.',
      'Auto-resize smoothly without jumping the scroll window.',
      'Display remaining characters when strict field limits exist.'
    ],
    donts: [
      'Never lock resize without providing an automatic expansion mechanism.',
      'Never hide error messages below the scroll fold of the textarea.'
    ],
    accessibility: [
      'WCAG 1.4.12: Ensure text spacing can be adjusted by user stylesheet without clipping.',
      'Keyboard: Tab key moves focus to the next field unless inside an intentional code editor.'
    ]
  },
  {
    name: 'select-dropdown.md',
    title: 'Select & Option Menu Guidelines',
    overview: 'Select controls let users choose one or more values from a list. Native selects are preferred on mobile devices for native wheel pickers; custom popover selects provide richer search, grouping, and badge integration on desktop.',
    states: [
      { state: 'Closed / Idle', visual: 'Field container with chevron icon on right edge', token: 'var(--color-surface-base)' },
      { state: 'Open / Expanded', visual: 'Chevron rotates 180deg, popover panel floats with elevation shadow and border', token: 'var(--color-surface-overlay)' },
      { state: 'Option Hover / Focused', visual: 'Subtle highlight background, checkmark displayed next to active selection', token: 'var(--color-surface-selected)' },
      { state: 'Disabled', visual: 'Reduced contrast, pointer-events: none', token: 'var(--color-surface-disabled)' }
    ],
    codeSnippet: `// Desktop custom select with accessible roving tabindex and ESC handling
import React, { useState, useRef, useEffect } from 'react';

export interface Option {
  value: string;
  label: string;
}

export const Select: React.FC<{ options: Option[]; value: string; onChange: (v: string) => void }> = ({
  options,
  value,
  onChange
}) => {
  const [isOpen, setIsOpen] = useState(false);
  const containerRef = useRef<HTMLDivElement>(null);

  const selectedOption = options.find(o => o.value === value);

  useEffect(() => {
    const handleOutside = (e: MouseEvent) => {
      if (containerRef.current && !containerRef.current.contains(e.target as Node)) {
        setIsOpen(false);
      }
    };
    document.addEventListener('mousedown', handleOutside);
    return () => document.removeEventListener('mousedown', handleOutside);
  }, []);

  return (
    <div ref={containerRef} className="relative w-full">
      <button
        type="button"
        aria-haspopup="listbox"
        aria-expanded={isOpen}
        onClick={() => setIsOpen(!isOpen)}
        className="w-full h-10 px-3 flex items-center justify-between text-sm rounded-lg bg-[var(--color-surface-base)] border border-[var(--color-border-default)] hover:border-[var(--color-border-hover)] focus:outline-none focus:ring-2 focus:ring-[var(--color-focus-ring)]"
      >
        <span>{selectedOption ? selectedOption.label : 'Select an option...'}</span>
        <span className={\`transition-transform duration-200 \${isOpen ? 'rotate-180' : ''}\`}>▼</span>
      </button>

      {isOpen && (
        <ul
          role="listbox"
          className="absolute z-50 w-full mt-1 py-1 rounded-lg bg-[var(--color-surface-overlay)] border border-[var(--color-border-subtle)] shadow-lg max-h-60 overflow-auto focus:outline-none"
        >
          {options.map((opt) => (
            <li
              key={opt.value}
              role="option"
              aria-selected={opt.value === value}
              onClick={() => {
                onChange(opt.value);
                setIsOpen(false);
              }}
              className="px-3 py-2 text-sm flex items-center justify-between cursor-pointer hover:bg-[var(--color-surface-hover)] aria-selected:bg-[var(--color-surface-selected)] aria-selected:font-medium"
            >
              <span>{opt.label}</span>
              {opt.value === value && <span>✓</span>}
            </li>
          ))}
        </ul>
      )}
    </div>
  );
};`,
    dos: [
      'Render native <select> on touch-first mobile viewports for OS accessibility pickers.',
      'Close menu immediately upon Escape key or click outside.',
      'Support arrow key navigation (Up/Down) through list options.'
    ],
    donts: [
      'Never render unscrollable dropdowns that clip off the bottom of the viewport.',
      'Never trap focus permanently inside the select popup without Escape dismissal.'
    ],
    accessibility: [
      'WAI-ARIA Listbox Pattern: aria-expanded, role="listbox", role="option", aria-selected.',
      'Focus restoration to trigger button after option selection or dismissal.'
    ]
  },
  {
    name: 'checkbox-radio.md',
    title: 'Checkbox and Radio Group Patterns',
    overview: 'Checkboxes support multi-selection and binary toggles within forms. Radio buttons handle mutually exclusive single-selection within a defined set. Both demand precise alignment with their labels and generous hit targets.',
    states: [
      { state: 'Unchecked', visual: '16x16px or 18x18px box/circle, subtle border, transparent background', token: 'var(--color-border-default)' },
      { state: 'Checked', visual: 'Solid accent background, crisp white checkmark or inner dot', token: 'var(--color-accent-primary)' },
      { state: 'Indeterminate', visual: 'Horizontal dash indicating partial selection of child elements', token: 'var(--color-accent-primary)' },
      { state: 'Focus-Visible', visual: 'Offset outer ring with 2px padding, ensuring visibility over both light and dark backgrounds', token: 'var(--color-focus-ring)' }
    ],
    codeSnippet: `import React from 'react';

export const Checkbox: React.FC<{
  id: string;
  label: string;
  checked: boolean;
  onChange: (checked: boolean) => void;
  description?: string;
}> = ({ id, label, checked, onChange, description }) => {
  return (
    <label htmlFor={id} className="flex items-start gap-3 cursor-pointer select-none group">
      <div className="relative flex items-center justify-center mt-0.5">
        <input
          id={id}
          type="checkbox"
          checked={checked}
          onChange={(e) => onChange(e.target.checked)}
          className="peer sr-only"
        />
        <div className="w-4 h-4 rounded border border-[var(--color-border-default)] bg-[var(--color-surface-base)] peer-checked:bg-[var(--color-accent-primary)] peer-checked:border-[var(--color-accent-primary)] peer-focus-visible:ring-2 peer-focus-visible:ring-offset-2 peer-focus-visible:ring-[var(--color-focus-ring)] transition-all duration-150 flex items-center justify-center text-white" />
        <svg className="absolute w-2.5 h-2.5 pointer-events-none opacity-0 peer-checked:opacity-100 transition-opacity duration-150 stroke-current stroke-2 fill-none" viewBox="0 0 12 12">
          <polyline points="2 6 5 9 10 3" />
        </svg>
      </div>
      <div className="flex flex-col">
        <span className="text-sm font-medium text-[var(--color-text-primary)] group-hover:text-[var(--color-text-hover)]">{label}</span>
        {description && <span className="text-xs text-[var(--color-text-secondary)]">{description}</span>}
      </div>
    </label>
  );
};`,
    dos: [
      'Expand the clickable hit target to include the full label text.',
      'Use radio groups with role="radiogroup" and fieldset/legend for mutually exclusive choices.',
      'Support indeterminate state for parent-child tree checkboxes.'
    ],
    donts: [
      'Never place checkboxes without an associated label element.',
      'Never shrink radio/checkbox sizes below 16px.'
    ],
    accessibility: [
      'Keyboard: Space toggles checkbox; Arrow keys cycle radio buttons in a group.',
      'WCAG 2.5.8: Target size spacing minimums.'
    ]
  },
  {
    name: 'toggle-switch.md',
    title: 'Toggle Switch Specification',
    overview: 'Switches provide immediate, binary toggles for live settings. Unlike checkboxes that require a form submit button, a switch takes effect immediately upon change.',
    states: [
      { state: 'Off / Inactive', visual: 'Track is neutral muted gray, knob resting on left', token: 'var(--color-switch-off)' },
      { state: 'On / Active', visual: 'Track turns active accent color, knob slides right with spring ease', token: 'var(--color-switch-on)' },
      { state: 'Disabled', visual: 'Knob and track dim to 40% opacity, unclickable', token: 'var(--color-switch-disabled)' }
    ],
    codeSnippet: `import React from 'react';

export const Switch: React.FC<{
  checked: boolean;
  onChange: (v: boolean) => void;
  label: string;
  id: string;
}> = ({ checked, onChange, label, id }) => {
  return (
    <div className="flex items-center justify-between gap-4">
      <label htmlFor={id} className="text-sm font-medium text-[var(--color-text-primary)] cursor-pointer">
        {label}
      </label>
      <button
        id={id}
        type="button"
        role="switch"
        aria-checked={checked}
        onClick={() => onChange(!checked)}
        className={\`relative inline-flex h-6 w-11 shrink-0 cursor-pointer rounded-full border-2 border-transparent transition-colors duration-200 ease-in-out focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-offset-2 focus-visible:ring-[var(--color-focus-ring)] \${
          checked ? 'bg-[var(--color-accent-primary)]' : 'bg-[var(--color-surface-muted)]'
        }\`}
      >
        <span
          className={\`pointer-events-none inline-block h-5 w-5 transform rounded-full bg-white shadow-md ring-0 transition duration-200 ease-in-out \${
            checked ? 'translate-x-5' : 'translate-x-0'
          }\`}
        />
      </button>
    </div>
  );
};`,
    dos: [
      'Use switch role="switch" with aria-checked.',
      'Provide instant visual feedback and persist state in the background immediately.',
      'Use for binary preferences like Dark Mode, Notifications, or Feature Flags.'
    ],
    donts: [
      'Never use switches inside multi-field forms that require a "Submit" or "Cancel" button; use checkboxes instead.',
      'Never omit the text label beside the switch.'
    ],
    accessibility: [
      'Space key and Enter key toggle the switch.',
      'Label announcement with current state ("on" or "off").'
    ]
  },
  {
    name: 'modal-dialog.md',
    title: 'Modal Dialog & Alert Architectural Guide',
    overview: 'Modals interrupt user flow to capture mandatory decisions or display focused tasks. Pure SaaS enforces focus containment, backdrop dimming without excessive blur, and non-destructive escape dismissal.',
    states: [
      { state: 'Closed / Unmounted', visual: 'Hidden from DOM or display: none', token: 'N/A' },
      { state: 'Opening Transition', visual: 'Fade backdrop (150ms) + subtle scale-up 0.96 -> 1.0 (200ms cubic-bezier)', token: 'var(--motion-ease-spring)' },
      { state: 'Active Modal', visual: 'High elevation surface, 1px subtle boundary border, scroll locked on document body', token: 'var(--color-surface-overlay)' },
      { state: 'Closing Transition', visual: 'Fade out and scale down (150ms)', token: 'var(--motion-ease-out)' }
    ],
    codeSnippet: `import React, { useEffect, useRef } from 'react';
import { createPortal } from 'react-dom';

export interface ModalProps {
  isOpen: boolean;
  onClose: () => void;
  title: string;
  children: React.ReactNode;
}

export const Modal: React.FC<ModalProps> = ({ isOpen, onClose, title, children }) => {
  const modalRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    if (!isOpen) return;
    const handleKeyDown = (e: KeyboardEvent) => {
      if (e.key === 'Escape') onClose();
    };
    document.addEventListener('keydown', handleKeyDown);
    document.body.style.overflow = 'hidden';

    return () => {
      document.removeEventListener('keydown', handleKeyDown);
      document.body.style.overflow = '';
    };
  }, [isOpen, onClose]);

  if (!isOpen) return null;

  return createPortal(
    <div className="fixed inset-0 z-50 flex items-center justify-center p-4">
      <div 
        className="fixed inset-0 bg-black/50 backdrop-blur-xs transition-opacity duration-200" 
        onClick={onClose} 
        aria-hidden="true" 
      />
      <div
        ref={modalRef}
        role="dialog"
        aria-modal="true"
        aria-labelledby="modal-title"
        className="relative z-10 w-full max-w-lg p-6 bg-[var(--color-surface-overlay)] border border-[var(--color-border-subtle)] rounded-2xl shadow-2xl transition-all duration-200 transform scale-100"
      >
        <div className="flex items-center justify-between pb-4 border-b border-[var(--color-border-subtle)]">
          <h2 id="modal-title" className="text-lg font-semibold text-[var(--color-text-primary)]">{title}</h2>
          <button
            onClick={onClose}
            aria-label="Close dialog"
            className="p-1 rounded-md text-[var(--color-text-muted)] hover:text-[var(--color-text-primary)] hover:bg-[var(--color-surface-hover)] focus:ring-2 focus:ring-[var(--color-focus-ring)]"
          >
            ✕
          </button>
        </div>
        <div className="mt-4">{children}</div>
      </div>
    </div>,
    document.body
  );
};`,
    dos: [
      'Render into document.body using a React Portal to escape overflow: hidden parents.',
      'Lock background scrolling while dialog is active.',
      'Trapping focus inside the dialog until closed.',
      'Restore focus to trigger element when dialog closes.'
    ],
    donts: [
      'Never nest multiple modals on top of each other; use sheets or step flows instead.',
      'Never apply heavy 30px backdrop blurs that degrade mobile frame rates.'
    ],
    accessibility: [
      'WAI-ARIA Dialog Pattern: role="dialog", aria-modal="true", aria-labelledby linking to modal title.',
      'Escape key must close the dialog immediately.'
    ]
  },
  {
    name: 'sheet-drawer.md',
    title: 'Sheet & Drawer Primitives',
    overview: 'Sheets slide in from screen edges (right on desktop, bottom on mobile) to display secondary inspection views, filters, or context panels while preserving current page state.',
    states: [
      { state: 'Hidden', visual: 'Translated 100% off screen', token: 'translate-x-full' },
      { state: 'Entering', visual: 'Spring slide-in with dim backdrop fade', token: 'var(--motion-ease-spring)' },
      { state: 'Open', visual: 'Anchored flush to screen edge with high elevation shadow and internal scroll region', token: 'var(--color-surface-overlay)' }
    ],
    codeSnippet: `// Slide-over side sheet component
import React, { useEffect } from 'react';

export const SideSheet: React.FC<{ isOpen: boolean; onClose: () => void; title: string; children: React.ReactNode }> = ({
  isOpen,
  onClose,
  title,
  children
}) => {
  useEffect(() => {
    if (isOpen) {
      document.body.style.overflow = 'hidden';
    } else {
      document.body.style.overflow = '';
    }
  }, [isOpen]);

  if (!isOpen) return null;

  return (
    <div className="fixed inset-0 z-50 flex justify-end">
      <div className="fixed inset-0 bg-black/40 backdrop-blur-xs" onClick={onClose} />
      <div className="relative z-10 w-full max-w-md h-full bg-[var(--color-surface-base)] border-l border-[var(--color-border-subtle)] shadow-2xl p-6 flex flex-col justify-between">
        <div>
          <div className="flex items-center justify-between pb-4 border-b border-[var(--color-border-subtle)]">
            <h3 className="text-base font-semibold text-[var(--color-text-primary)]">{title}</h3>
            <button onClick={onClose} className="p-1 rounded hover:bg-[var(--color-surface-hover)]">✕</button>
          </div>
          <div className="mt-4 overflow-y-auto">{children}</div>
        </div>
      </div>
    </div>
  );
};`,
    dos: [
      'Use bottom sheet drawers on mobile screens (<640px) with touch swipe-to-dismiss gestures.',
      'Keep dismiss button clearly visible in header at all times.'
    ],
    donts: [
      'Do not trap horizontal scroll gestures inside side sheets.',
      'Do not hide primary actions behind secondary drawer depths.'
    ],
    accessibility: [
      'role="dialog", aria-modal="true", tab trap, ESC key dismissal.'
    ]
  },
  {
    name: 'popover-tooltip.md',
    title: 'Popover and Tooltip Floating Primitives',
    overview: 'Tooltips provide brief, non-interactive context on hover/focus. Popovers offer rich, interactive overlays anchored to a trigger element (e.g. date pickers, filter badges).',
    states: [
      { state: 'Hidden', visual: 'Opacity 0, pointer-events: none', token: 'opacity-0' },
      { state: 'Visible Tooltip', visual: 'Compact dark pill with crisp microtext (11-12px), 200ms enter delay', token: 'var(--color-tooltip-bg)' },
      { state: 'Visible Popover', visual: 'Layered card container with border and direct arrow indicator, interactive contents', token: 'var(--color-surface-overlay)' }
    ],
    codeSnippet: `import React, { useState } from 'react';

export const Tooltip: React.FC<{ text: string; children: React.ReactElement }> = ({ text, children }) => {
  const [visible, setVisible] = useState(false);

  return (
    <div 
      className="relative inline-flex items-center"
      onMouseEnter={() => setVisible(true)}
      onMouseLeave={() => setVisible(false)}
      onFocus={() => setVisible(true)}
      onBlur={() => setVisible(false)}
    >
      {children}
      {visible && (
        <div 
          role="tooltip"
          className="absolute bottom-full left-1/2 -translate-x-1/2 mb-2 px-2 py-1 text-xs font-medium text-white bg-neutral-900 rounded shadow-md whitespace-nowrap pointer-events-none z-50 animate-fade-in"
        >
          {text}
        </div>
      )}
    </div>
  );
};`,
    dos: [
      'Add 200-300ms hover delay on tooltips to avoid visual flicker during casual mouse movement.',
      'Ensure tooltips close on Escape key press.',
      'Keep tooltip content under 80 characters; use popovers for rich interactive content.'
    ],
    donts: [
      'Never put interactive links or buttons inside a tooltip (use popovers).',
      'Never hide essential information in tooltips that cannot be accessed on mobile touch screens.'
    ],
    accessibility: [
      'ARIA tooltip role="tooltip" associated via aria-describedby on the trigger.'
    ]
  },
  {
    name: 'dropdown-menu.md',
    title: 'Dropdown Context & Action Menus',
    overview: 'Dropdown menus provide grouped command lists triggered by buttons or context actions. They must support swift keyboard navigation, visual dividers, and shortcut indicator labels.',
    states: [
      { state: 'Trigger Idle', visual: 'Standard button or icon button with aria-haspopup="menu"', token: 'var(--color-surface-base)' },
      { state: 'Menu Open', visual: 'Floating panel with 1px border, shadow-lg, and vertical item stack', token: 'var(--color-surface-overlay)' },
      { state: 'Item Hover / Focus', visual: 'Subtle background tint, icon sharpens, shortcut glyphs remain aligned', token: 'var(--color-surface-hover)' }
    ],
    codeSnippet: `// Dropdown Menu Item Structure
<div role="menu" aria-orientation="vertical" className="w-56 p-1 rounded-xl bg-[var(--color-surface-overlay)] border border-[var(--color-border-subtle)] shadow-xl">
  <button role="menuitem" className="w-full flex items-center justify-between px-3 py-2 text-xs font-medium rounded-lg hover:bg-[var(--color-surface-hover)] text-[var(--color-text-primary)]">
    <span>Edit Item</span>
    <kbd className="text-[10px] text-[var(--color-text-muted)] font-mono">⌘E</kbd>
  </button>
  <button role="menuitem" className="w-full flex items-center justify-between px-3 py-2 text-xs font-medium rounded-lg hover:bg-[var(--color-surface-hover)] text-[var(--color-text-primary)]">
    <span>Duplicate</span>
    <kbd className="text-[10px] text-[var(--color-text-muted)] font-mono">⌘D</kbd>
  </button>
  <div className="h-px my-1 bg-[var(--color-border-subtle)]" role="separator" />
  <button role="menuitem" className="w-full flex items-center justify-between px-3 py-2 text-xs font-medium rounded-lg hover:bg-[var(--color-danger-subtle)] text-[var(--color-danger-text)]">
    <span>Delete</span>
    <kbd className="text-[10px] opacity-70 font-mono">⌫</kbd>
  </button>
</div>`,
    dos: [
      'Support ArrowDown / ArrowUp navigation between menu items.',
      'Differentiate destructive items with danger tokens and confirmation prompts.',
      'Close menu immediately upon selecting an item or pressing Escape.'
    ],
    donts: [
      'Do not let dropdown menus extend beyond viewport edges (implement flip/collision detection).',
      'Never render menus without role="menu" and role="menuitem".'
    ],
    accessibility: [
      'Keyboard roving focus, Escape to dismiss, focus returned to trigger.'
    ]
  },
  {
    name: 'tabs-segmented-control.md',
    title: 'Tabs & Segmented Control Design Specification',
    overview: 'Tabs partition related views under a common context. Segmented controls provide compact, inline toggles for filters or view modes with an animated sliding background pill.',
    states: [
      { state: 'Inactive Tab', visual: 'Muted text, transparent background, hover state brings subtle text brightness', token: 'var(--color-text-secondary)' },
      { state: 'Active Tab', visual: 'High contrast text, sliding background pill or 2px bottom indicator line', token: 'var(--color-text-primary)' },
      { state: 'Focus Indicator', visual: 'Focus ring surrounding individual tab pill', token: 'var(--color-focus-ring)' }
    ],
    codeSnippet: `import React, { useState } from 'react';

export const SegmentedControl: React.FC<{ options: string[]; value: string; onChange: (v: string) => void }> = ({
  options,
  value,
  onChange
}) => {
  return (
    <div role="tablist" className="inline-flex p-1 rounded-xl bg-[var(--color-surface-muted)] border border-[var(--color-border-subtle)]">
      {options.map((opt) => {
        const isActive = opt === value;
        return (
          <button
            key={opt}
            role="tab"
            aria-selected={isActive}
            onClick={() => onChange(opt)}
            className={\`px-3 py-1.5 text-xs font-medium rounded-lg transition-all duration-150 \${
              isActive 
                ? 'bg-[var(--color-surface-base)] text-[var(--color-text-primary)] shadow-sm' 
                : 'text-[var(--color-text-secondary)] hover:text-[var(--color-text-primary)]'
            }\`}
          >
            {opt}
          </button>
        );
      })}
    </div>
  );
};`,
    dos: [
      'Use role="tablist", role="tab", and role="tabpanel".',
      'Support ArrowLeft / ArrowRight to switch between tabs.',
      'Maintain synchronized tabpanel display without unmounting state unless explicitly desired.'
    ],
    donts: [
      'Never use tabs for multi-step sequential wizards (use steppers instead).',
      'Do not wrap tabs onto multiple horizontal rows.'
    ],
    accessibility: [
      'WCAG 2.4.7: Visible focus rings on active and inactive tab controls.'
    ]
  },
  {
    name: 'accordion-disclosure.md',
    title: 'Accordion & Disclosure Patterns',
    overview: 'Accordions stack collapsible content panels vertically to conserve viewport real estate and reduce cognitive load, ideal for FAQs, dense inspect panels, and complex filters.',
    states: [
      { state: 'Collapsed', visual: 'Header row with title and right-aligned chevron pointing down', token: 'var(--color-border-subtle)' },
      { state: 'Expanded', visual: 'Chevron smoothly rotates 180deg, content panel expands with height transition', token: 'var(--color-surface-base)' }
    ],
    codeSnippet: `import React, { useState } from 'react';

export const AccordionItem: React.FC<{ title: string; children: React.ReactNode }> = ({ title, children }) => {
  const [isOpen, setIsOpen] = useState(false);

  return (
    <div className="border-b border-[var(--color-border-subtle)]">
      <button
        type="button"
        aria-expanded={isOpen}
        onClick={() => setIsOpen(!isOpen)}
        className="w-full py-4 flex items-center justify-between text-left text-sm font-medium text-[var(--color-text-primary)] hover:text-[var(--color-text-hover)] focus:outline-none focus-visible:ring-2 focus-visible:ring-[var(--color-focus-ring)]"
      >
        <span>{title}</span>
        <span className={\`transform transition-transform duration-200 text-xs text-[var(--color-text-muted)] \${isOpen ? 'rotate-180' : ''}\`}>▼</span>
      </button>
      {isOpen && (
        <div className="pb-4 text-xs text-[var(--color-text-secondary)] leading-relaxed animate-fade-in">
          {children}
        </div>
      )}
    </div>
  );
};`,
    dos: [
      'Use native <button> with aria-expanded attribute for the accordion trigger.',
      'Allow users to expand multiple sections simultaneously unless business logic strictly forbids it.',
      'Ensure smooth CSS transition for open/close animation.'
    ],
    donts: [
      'Never hide critical transactional details or legal agreements solely inside collapsed accordions.'
    ],
    accessibility: [
      'WAI-ARIA Accordion Pattern: button controls panel via aria-controls and aria-expanded.'
    ]
  },
  {
    name: 'card.md',
    title: 'Card Container Architecture',
    overview: 'Cards group related information and actions into bounded visual units. Pure SaaS avoids generic card-vomit by enforcing deliberate contrast, purposeful padding, and subtle hairline borders.',
    states: [
      { state: 'Static Card', visual: 'Subtle 1px border, neutral surface, crisp corner radius (8-16px)', token: 'var(--color-surface-base)' },
      { state: 'Interactive Card Hover', visual: 'Subtle upward lift (-2px translateY) or surface highlight, border turns var(--color-border-hover)', token: 'var(--color-surface-hover)' },
      { state: 'Selected Card', visual: 'Accent border ring (2px) and selected badge/icon', token: 'var(--color-accent-primary)' }
    ],
    codeSnippet: `<div className="group relative p-5 rounded-2xl bg-[var(--color-surface-base)] border border-[var(--color-border-subtle)] hover:border-[var(--color-border-hover)] transition-all duration-200 hover:shadow-md flex flex-col justify-between">
  <div>
    <div className="flex items-center justify-between mb-3">
      <span className="text-xs font-semibold uppercase tracking-wider text-[var(--color-text-muted)]">Analytics</span>
      <span className="w-2 h-2 rounded-full bg-emerald-500" />
    </div>
    <h3 className="text-base font-semibold text-[var(--color-text-primary)] mb-1">Weekly Active Workspaces</h3>
    <p className="text-xs text-[var(--color-text-secondary)]">Aggregated across production clusters.</p>
  </div>
  <div className="mt-4 pt-3 border-t border-[var(--color-border-subtle)] flex items-center justify-between">
    <span className="text-lg font-bold font-mono text-[var(--color-text-primary)]">14,280</span>
    <span className="text-xs font-medium text-emerald-500">+12.4%</span>
  </div>
</div>`,
    dos: [
      'Establish consistent internal padding tokens (p-4, p-5, or p-6).',
      'Use hairline borders instead of thick muddy drop shadows in dark mode.',
      'Provide nested button hit targets with stopPropagation.'
    ],
    donts: [
      'Avoid wrapping every single isolated sentence into its own card.',
      'Never place multiple conflicting primary buttons inside a single card container.'
    ],
    accessibility: [
      'When an entire card is clickable, use a single pseudo-element link overlay or clear button.'
    ]
  },
  {
    name: 'data-table.md',
    title: 'Data Table & Virtualized List Guidelines',
    overview: 'Data tables organize dense tabular information for fast scanning, sorting, and inline modification. Pure SaaS requires sticky column headers, clean zebra striping or dividers, and fluid horizontal overflow.',
    states: [
      { state: 'Header Row', visual: 'Sticky top-0, uppercase tracking, sort indicator arrows on interactive columns', token: 'var(--color-surface-muted)' },
      { state: 'Row Hover', visual: 'Subtle highlight across the entire row without layout shifting', token: 'var(--color-surface-hover)' },
      { state: 'Selected Row', visual: 'Accent background tint with checked row selection checkbox', token: 'var(--color-surface-selected)' }
    ],
    codeSnippet: `<div className="w-full overflow-x-auto rounded-xl border border-[var(--color-border-subtle)]">
  <table className="w-full text-left border-collapse text-xs">
    <thead className="bg-[var(--color-surface-muted)] text-[var(--color-text-secondary)] font-semibold border-b border-[var(--color-border-subtle)]">
      <tr>
        <th scope="col" className="p-3 w-10"><input type="checkbox" aria-label="Select all rows" /></th>
        <th scope="col" className="p-3">User</th>
        <th scope="col" className="p-3">Role</th>
        <th scope="col" className="p-3">Status</th>
        <th scope="col" className="p-3 text-right">Actions</th>
      </tr>
    </thead>
    <tbody className="divide-y divide-[var(--color-border-subtle)] bg-[var(--color-surface-base)] text-[var(--color-text-primary)]">
      <tr className="hover:bg-[var(--color-surface-hover)] transition-colors">
        <td className="p-3"><input type="checkbox" aria-label="Select user Alex Morgan" /></td>
        <td className="p-3 font-medium">Alex Morgan</td>
        <td className="p-3 text-[var(--color-text-secondary)]">Admin</td>
        <td className="p-3"><span className="px-2 py-0.5 rounded-full text-[10px] bg-emerald-500/10 text-emerald-500 font-medium">Active</span></td>
        <td className="p-3 text-right"><button className="text-[var(--color-text-muted)] hover:text-white">•••</button></td>
      </tr>
    </tbody>
  </table>
</div>`,
    dos: [
      'Always include scope="col" on <th> elements and scope="row" on header cells.',
      'Provide sticky headers for tables with more than 15 rows.',
      'Align numeric data to the right and text data to the left.'
    ],
    donts: [
      'Never allow table content to overflow outside its container without an accessible scrollbar.',
      'Do not rely solely on tiny font sizes (<11px) to squeeze columns in.'
    ],
    accessibility: [
      'Accessible scroll container: tabindex="0" on table overflow wrapper so keyboard users can scroll horizontally.'
    ]
  },
  {
    name: 'sidebar-nav.md',
    title: 'Sidebar Navigation Pattern',
    overview: 'Sidebar navigation structures hierarchical application spaces. It must gracefully collapse between expanded rail and icon-only modes while clearly communicating the active route.',
    states: [
      { state: 'Item Default', visual: 'Muted icon and text, subtle hover surface change', token: 'var(--color-text-secondary)' },
      { state: 'Item Active', visual: 'Solid background fill, high-contrast icon and label, left accent pill indicator', token: 'var(--color-surface-selected)' },
      { state: 'Collapsed Mode', visual: 'Labels hidden, icons centered, tooltips displayed on hover', token: 'w-16 transition-width' }
    ],
    codeSnippet: `<nav aria-label="Main Navigation" className="w-64 h-screen bg-[var(--color-surface-base)] border-r border-[var(--color-border-subtle)] p-4 flex flex-col justify-between">
  <div className="flex flex-col gap-1">
    <div className="px-3 py-2 mb-4 flex items-center gap-2.5">
      <div className="w-6 h-6 rounded-md bg-[var(--color-accent-primary)]" />
      <span className="font-semibold text-sm tracking-tight text-[var(--color-text-primary)]">Acme Cloud</span>
    </div>
    
    <a href="/dashboard" aria-current="page" className="flex items-center gap-3 px-3 py-2 rounded-lg text-xs font-medium bg-[var(--color-surface-selected)] text-[var(--color-text-primary)]">
      <span>📊</span>
      <span>Overview</span>
    </a>
    <a href="/deployments" className="flex items-center gap-3 px-3 py-2 rounded-lg text-xs font-medium text-[var(--color-text-secondary)] hover:bg-[var(--color-surface-hover)] hover:text-[var(--color-text-primary)]">
      <span>🚀</span>
      <span>Deployments</span>
    </a>
  </div>
  
  <div className="pt-4 border-t border-[var(--color-border-subtle)]">
    <div className="flex items-center gap-3 px-3 py-2">
      <div className="w-7 h-7 rounded-full bg-neutral-700" />
      <div className="flex flex-col">
        <span className="text-xs font-medium text-[var(--color-text-primary)]">Jane Doe</span>
        <span className="text-[10px] text-[var(--color-text-muted)]">Pro Plan</span>
      </div>
    </div>
  </div>
</nav>`,
    dos: [
      'Use aria-current="page" on the currently selected route.',
      'Group links logically into clear section blocks with uppercase category labels.',
      'Transition to an off-canvas drawer on viewport widths below 1024px.'
    ],
    donts: [
      'Never hide user profile and sign-out controls off the bottom of the viewport.',
      'Avoid loud, clashing background colors for active states.'
    ],
    accessibility: [
      '<nav> landmark with aria-label to differentiate from top navigation.'
    ]
  },
  {
    name: 'top-nav.md',
    title: 'Top Navigation Bar Architecture',
    overview: 'Top bars provide persistent product branding, global search, notifications, and primary user controls. They must remain stable across scroll positions without visual stutter.',
    states: [
      { state: 'Top / Unscrolled', visual: 'Transparent or flush background matching page surface', token: 'bg-transparent' },
      { state: 'Scrolled / Sticky', visual: 'Subtle backdrop blur, hairline bottom border, elevated shadow', token: 'backdrop-blur-md border-b' }
    ],
    codeSnippet: `<header className="sticky top-0 z-40 w-full h-14 bg-[var(--color-surface-base)]/80 backdrop-blur-md border-b border-[var(--color-border-subtle)] px-6 flex items-center justify-between">
  <div className="flex items-center gap-6">
    <a href="/" className="font-bold text-sm tracking-tight text-[var(--color-text-primary)]">Acme</a>
    <nav className="hidden md:flex items-center gap-4 text-xs font-medium text-[var(--color-text-secondary)]">
      <a href="/features" className="hover:text-[var(--color-text-primary)]">Features</a>
      <a href="/pricing" className="hover:text-[var(--color-text-primary)]">Pricing</a>
      <a href="/docs" className="hover:text-[var(--color-text-primary)]">Documentation</a>
    </nav>
  </div>
  <div className="flex items-center gap-3">
    <button className="text-xs font-medium text-[var(--color-text-secondary)] hover:text-white">Sign In</button>
    <button className="h-8 px-3 text-xs font-medium rounded-lg bg-[var(--color-accent-primary)] text-white hover:opacity-90">Get Started</button>
  </div>
</header>`,
    dos: [
      'Use semantic <header> landmark.',
      'Keep height compact (52px - 64px) to preserve vertical workspace.',
      'Provide clear skip links before the header for screen reader and keyboard navigation.'
    ],
    donts: [
      'Never fill top navbars with decorative banners that push content below the fold.'
    ],
    accessibility: [
      'Keyboard navigation must flow naturally through logo, links, search, and user actions.'
    ]
  },
  {
    name: 'breadcrumbs.md',
    title: 'Breadcrumb Navigation Hierarchy',
    overview: 'Breadcrumbs communicate nested position within an application hierarchy, enabling users to retrace their steps upwards through parent levels.',
    states: [
      { state: 'Parent Link', visual: 'Muted text color, underlines or brightens on hover', token: 'var(--color-text-secondary)' },
      { state: 'Separator', visual: 'Subtle slash or chevron glyph (aria-hidden="true")', token: 'var(--color-text-muted)' },
      { state: 'Current Page', visual: 'Active primary text color, aria-current="page", unclickable', token: 'var(--color-text-primary)' }
    ],
    codeSnippet: `<nav aria-label="Breadcrumbs">
  <ol className="flex items-center gap-2 text-xs text-[var(--color-text-muted)]">
    <li>
      <a href="/projects" className="hover:text-[var(--color-text-primary)] transition-colors">Projects</a>
    </li>
    <li aria-hidden="true" className="select-none">/</li>
    <li>
      <a href="/projects/acme" className="hover:text-[var(--color-text-primary)] transition-colors">Acme Corp</a>
    </li>
    <li aria-hidden="true" className="select-none">/</li>
    <li aria-current="page" className="font-semibold text-[var(--color-text-primary)]">
      Production Settings
    </li>
  </ol>
</nav>`,
    dos: [
      'Use an ordered list `<ol>` inside a `<nav aria-label="Breadcrumb">` wrapper.',
      'Mark the leaf item with aria-current="page".',
      'Truncate middle crumbs with an overflow menu when path exceeds 4 levels.'
    ],
    donts: [
      'Never make the active (last) breadcrumb an interactive link that reloads the current page.'
    ],
    accessibility: [
      'WCAG 2.4.8 Location: Aids user orientation within deep hierarchical sites.'
    ]
  },
  {
    name: 'pagination.md',
    title: 'Pagination & Page Navigation Primitives',
    overview: 'Pagination divides large record sets into discrete pages. It provides direct access to numbered pages, previous/next steps, and total count summaries.',
    states: [
      { state: 'Page Number Idle', visual: 'Neutral button with number label, 32x32px minimum', token: 'var(--color-surface-base)' },
      { state: 'Current Page', visual: 'Solid accent background or high contrast border with aria-current="page"', token: 'var(--color-accent-primary)' },
      { state: 'Disabled Step', visual: 'Opacity 40%, disabled attribute present on Prev/Next buttons', token: 'disabled:opacity-40' }
    ],
    codeSnippet: `<nav aria-label="Pagination" className="flex items-center justify-between py-4">
  <span className="text-xs text-[var(--color-text-secondary)]">
    Showing <span className="font-medium text-[var(--color-text-primary)]">1</span> to <span className="font-medium text-[var(--color-text-primary)]">25</span> of <span className="font-medium text-[var(--color-text-primary)]">240</span> results
  </span>
  <div className="flex items-center gap-1">
    <button disabled aria-label="Previous page" className="h-8 px-2.5 text-xs rounded-lg border border-[var(--color-border-subtle)] disabled:opacity-40">Previous</button>
    <button aria-current="page" className="w-8 h-8 text-xs font-semibold rounded-lg bg-[var(--color-accent-primary)] text-white">1</button>
    <button className="w-8 h-8 text-xs rounded-lg hover:bg-[var(--color-surface-hover)]">2</button>
    <button className="w-8 h-8 text-xs rounded-lg hover:bg-[var(--color-surface-hover)]">3</button>
    <span className="w-8 h-8 flex items-center justify-center text-xs text-[var(--color-text-muted)]">…</span>
    <button className="w-8 h-8 text-xs rounded-lg hover:bg-[var(--color-surface-hover)]">10</button>
    <button aria-label="Next page" className="h-8 px-2.5 text-xs rounded-lg border border-[var(--color-border-subtle)] hover:bg-[var(--color-surface-hover)]">Next</button>
  </div>
</nav>`,
    dos: [
      'Provide descriptive aria-labels on Previous and Next icon buttons.',
      'Show current page and total available pages clearly.',
      'Preserve pagination query state in the URL (`?page=2`).'
    ],
    donts: [
      'Never hide total page count when dealing with bounded database queries.'
    ],
    accessibility: [
      'aria-current="page" on the active button; keyboard tab order across buttons.'
    ]
  },
  {
    name: 'command-palette.md',
    title: 'Command Palette (Cmd+K) Architecture',
    overview: 'The command palette offers rapid keyboard-first navigation and action execution. It indexes pages, settings, and commands into a searchable modal dialog.',
    states: [
      { state: 'Closed', visual: 'Inactive, listened via global keyboard event listener (Cmd+K / Ctrl+K)', token: 'N/A' },
      { state: 'Open & Filtering', visual: 'Centered floating overlay, top search input with search icon, instant live results below', token: 'var(--color-surface-overlay)' },
      { state: 'Result Focused', visual: 'Active item highlighted, category tag displayed, Enter triggers action', token: 'var(--color-surface-selected)' }
    ],
    codeSnippet: `// Key architecture: input focus on open, debounced query, roving activeIndex
import React, { useState, useEffect } from 'react';

export const CommandPalette: React.FC = () => {
  const [open, setOpen] = useState(false);
  const [query, setQuery] = useState('');

  useEffect(() => {
    const handleKeyDown = (e: KeyboardEvent) => {
      if ((e.metaKey || e.ctrlKey) && e.key === 'k') {
        e.preventDefault();
        setOpen((v) => !v);
      }
    };
    window.addEventListener('keydown', handleKeyDown);
    return () => window.removeEventListener('keydown', handleKeyDown);
  }, []);

  if (!open) return null;

  return (
    <div className="fixed inset-0 z-50 flex items-start justify-center pt-24 p-4">
      <div className="fixed inset-0 bg-black/50 backdrop-blur-xs" onClick={() => setOpen(false)} />
      <div className="relative z-10 w-full max-w-xl rounded-2xl bg-[var(--color-surface-overlay)] border border-[var(--color-border-subtle)] shadow-2xl overflow-hidden">
        <div className="flex items-center px-4 border-b border-[var(--color-border-subtle)]">
          <span className="text-neutral-400">🔍</span>
          <input
            autoFocus
            value={query}
            onChange={(e) => setQuery(e.target.value)}
            placeholder="Type a command or search..."
            className="w-full h-12 px-3 bg-transparent text-sm text-[var(--color-text-primary)] placeholder-[var(--color-text-muted)] focus:outline-none"
          />
          <kbd className="text-[10px] bg-neutral-800 text-neutral-400 px-1.5 py-0.5 rounded border border-neutral-700">ESC</kbd>
        </div>
        <div className="p-2 max-h-80 overflow-y-auto">
          <div className="text-[10px] font-semibold text-[var(--color-text-muted)] px-3 py-1 uppercase tracking-wider">Navigation</div>
          <button className="w-full flex items-center justify-between px-3 py-2 rounded-lg text-xs font-medium text-[var(--color-text-primary)] hover:bg-[var(--color-surface-hover)]">
            <span>Go to Analytics</span>
            <span className="text-[10px] text-neutral-400">Jump to view</span>
          </button>
        </div>
      </div>
    </div>
  );
};`,
    dos: [
      'Listen for Cmd+K on Mac and Ctrl+K on Windows.',
      'Auto-focus search input immediately upon dialog render.',
      'Support ArrowDown and ArrowUp to cycle active index, and Enter to execute.'
    ],
    donts: [
      'Do not perform heavy synchronous blocking searches in the UI thread.'
    ],
    accessibility: [
      'role="combobox", aria-expanded="true", aria-controls="command-results".'
    ]
  },
  {
    name: 'toast-snackbar.md',
    title: 'Toast & Snackbar Notification System',
    overview: 'Toasts provide brief, non-intrusive feedback on completed background operations (e.g., "Saved changes", "Link copied"). They float over screen corners and dismiss automatically.',
    states: [
      { state: 'Entering', visual: 'Slide and fade in from viewport corner (translate-y-2 -> 0)', token: 'var(--motion-ease-spring)' },
      { state: 'Persistent Display', visual: 'High contrast card, semantic icon, brief message, optional Action button', token: 'var(--color-surface-overlay)' },
      { state: 'Exiting', visual: 'Fade and slide out after 4000ms delay or manual close', token: 'var(--motion-ease-out)' }
    ],
    codeSnippet: `<div className="fixed bottom-4 right-4 z-50 flex flex-col gap-2 pointer-events-none">
  <div role="status" aria-live="polite" className="pointer-events-auto flex items-center gap-3 px-4 py-3 rounded-xl bg-[var(--color-surface-overlay)] border border-[var(--color-border-subtle)] shadow-xl text-xs font-medium text-[var(--color-text-primary)] animate-slide-up">
    <span className="w-2 h-2 rounded-full bg-emerald-500" />
    <span>Deployment initiated successfully.</span>
    <button className="ml-2 text-[var(--color-accent-primary)] hover:underline font-semibold">View</button>
  </div>
</div>`,
    dos: [
      'Use aria-live="polite" for standard confirmations and aria-live="assertive" for critical alerts.',
      'Allow users to dismiss toasts manually.',
      'Pause auto-dismiss timer on mouse hover or keyboard focus.'
    ],
    donts: [
      'Never use toasts for fatal errors that require immediate user action.',
      'Do not spam more than 3 visible stacked toasts at once.'
    ],
    accessibility: [
      'Screen readers announce text automatically via aria-live regions without stealing focus.'
    ]
  }
];

let created = 0;
for (const comp of components) {
  const filePath = path.join(targetDir, comp.name);
  let content = `# ${comp.title}\n\n`;
  content += `${comp.overview}\n\n---\n\n`;
  content += `## 1. Visual Specification & State Matrix\n\n`;
  content += `| State | Visual Treatment | Design Token |\n`;
  content += `| :--- | :--- | :--- |\n`;
  for (const s of comp.states) {
    content += `| **${s.state}** | ${s.visual} | \`${s.token}\` |\n`;
  }
  content += `\n---\n\n## 2. Implementation Guide\n\n`;
  content += `\`\`\`tsx\n${comp.codeSnippet}\n\`\`\`\n\n---\n\n`;
  content += `## 3. Best Practices (Do's & Don'ts)\n\n`;
  content += `| Do | Don't |\n| :--- | :--- |\n`;
  const maxRows = Math.max(comp.dos.length, comp.donts.length);
  for (let i = 0; i < maxRows; i++) {
    const d = comp.dos[i] || '';
    const dn = comp.donts[i] || '';
    content += `| ${d} | ${dn} |\n`;
  }
  content += `\n---\n\n## 4. Accessibility & WCAG 2.2 AA Compliance\n\n`;
  for (const a of comp.accessibility) {
    content += `- **${a}**\n`;
  }
  content += `\n---\n\n## 5. Anti-Slop Criteria\n\n`;
  content += `- Avoid gratuitous animations that delay user interaction.\n`;
  content += `- Keep borders crisp (1px hairline) and ensure dark-mode contrast parity.\n`;
  content += `- Never use arbitrary Tailwind numbers or unverified hex colors; bind directly to semantic tokens.\n`;

  fs.writeFileSync(filePath, content, 'utf8');
  created++;
}

console.log(`Created ${created} component references in references/components/`);

