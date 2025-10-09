import React, { useEffect, useRef, useState } from 'react';
import PropTypes from 'prop-types';
import './shared/tokens.css';
import './Inputs/inputs.scss';

export const TextInput = ({ label, value, placeholder, error, helper, onChange, ...rest }) => (
  <label className={`sb-field ${error ? 'is-error' : ''}`}>
    {label ? <span className="sb-field__label">{label}</span> : null}
    <input className="sb-input" value={value} placeholder={placeholder} onChange={(e) => onChange?.(e.target.value)} {...rest} />
    {helper ? <span className="sb-field__help">{helper}</span> : null}
    {error ? <span className="sb-field__error">{error}</span> : null}
  </label>
);

TextInput.propTypes = {
  label: PropTypes.string,
  value: PropTypes.string,
  placeholder: PropTypes.string,
  error: PropTypes.string,
  helper: PropTypes.string,
  onChange: PropTypes.func,
};

export const TextArea = ({ label, value, placeholder, rows = 4, error, helper, onChange, ...rest }) => (
  <label className={`sb-field ${error ? 'is-error' : ''}`}>
    {label ? <span className="sb-field__label">{label}</span> : null}
    <textarea className="sb-input sb-input--area" rows={rows} value={value} placeholder={placeholder} onChange={(e) => onChange?.(e.target.value)} {...rest} />
    {helper ? <span className="sb-field__help">{helper}</span> : null}
    {error ? <span className="sb-field__error">{error}</span> : null}
  </label>
);

TextArea.propTypes = TextInput.propTypes;

export const Select = ({ label, value, options = [], onChange, multiple = false, placeholder, error, helper }) => (
  <label className={`sb-field ${error ? 'is-error' : ''}`}>
    {label ? <span className="sb-field__label">{label}</span> : null}
    <select className="sb-input" multiple={multiple} value={value} onChange={(e) => {
      if (multiple) {
        const v = Array.from(e.target.selectedOptions).map((o) => o.value);
        onChange?.(v);
      } else {
        onChange?.(e.target.value);
      }
    }}>
      {placeholder && !multiple ? <option value="">{placeholder}</option> : null}
      {options.map((opt) => (
        <option key={opt.value} value={opt.value}>{opt.label}</option>
      ))}
    </select>
    {helper ? <span className="sb-field__help">{helper}</span> : null}
    {error ? <span className="sb-field__error">{error}</span> : null}
  </label>
);

Select.propTypes = {
  label: PropTypes.string,
  value: PropTypes.oneOfType([PropTypes.string, PropTypes.array]),
  options: PropTypes.arrayOf(PropTypes.shape({ value: PropTypes.string.isRequired, label: PropTypes.string.isRequired })),
  onChange: PropTypes.func,
  multiple: PropTypes.bool,
  placeholder: PropTypes.string,
  error: PropTypes.string,
  helper: PropTypes.string,
};

export const Checkbox = ({ label, checked, onChange }) => (
  <label className="sb-check">
    <input type="checkbox" checked={checked} onChange={(e) => onChange?.(e.target.checked)} />
    <span>{label}</span>
  </label>
);

Checkbox.propTypes = { label: PropTypes.string, checked: PropTypes.bool, onChange: PropTypes.func };

export const Toggle = ({ label, checked, onChange }) => (
  <label className="sb-toggle">
    <input type="checkbox" checked={checked} onChange={(e) => onChange?.(e.target.checked)} />
    <span className="sb-toggle__track"><span className="sb-toggle__thumb" /></span>
    {label ? <span className="sb-toggle__label">{label}</span> : null}
  </label>
);

Toggle.propTypes = Checkbox.propTypes;

export const RadioGroup = ({ name, value, options = [], onChange }) => (
  <div className="sb-radio">
    {options.map((opt) => (
      <label key={opt.value}>
        <input type="radio" name={name} value={opt.value} checked={value === opt.value} onChange={(e) => onChange?.(e.target.value)} />
        <span>{opt.label}</span>
      </label>
    ))}
  </div>
);

RadioGroup.propTypes = { name: PropTypes.string, value: PropTypes.string, options: PropTypes.array, onChange: PropTypes.func };

export const RangeInput = ({ label, value, min = 0, max = 100, step = 1, onChange }) => (
  <label className="sb-field">
    {label ? <span className="sb-field__label">{label}</span> : null}
    <input className="sb-range" type="range" min={min} max={max} step={step} value={value} onChange={(e) => onChange?.(Number(e.target.value))} />
  </label>
);

RangeInput.propTypes = { label: PropTypes.string, value: PropTypes.number, min: PropTypes.number, max: PropTypes.number, step: PropTypes.number, onChange: PropTypes.func };

export const FileInput = ({ label, onFiles, accept, multiple = false }) => {
  const ref = useRef(null);
  const [hover, setHover] = useState(false);
  function onDrop(e) {
    e.preventDefault();
    setHover(false);
    if (e.dataTransfer?.files?.length) onFiles?.(Array.from(e.dataTransfer.files));
  }
  return (
    <div className={`sb-file ${hover ? 'is-hover' : ''}`} onDragOver={(e) => { e.preventDefault(); setHover(true); }} onDragLeave={() => setHover(false)} onDrop={onDrop}>
      {label ? <div className="sb-file__label">{label}</div> : null}
      <button className="sb-file__btn" type="button" onClick={() => ref.current?.click()}>Choose file</button>
      <input ref={ref} type="file" accept={accept} multiple={multiple} onChange={(e) => onFiles?.(Array.from(e.target.files || []))} hidden />
      <div className="sb-file__hint">Drag & drop files here</div>
    </div>
  );
};

FileInput.propTypes = { label: PropTypes.string, onFiles: PropTypes.func, accept: PropTypes.string, multiple: PropTypes.bool };

export const ColorPicker = ({ label, value, onChange }) => (
  <label className="sb-field">
    {label ? <span className="sb-field__label">{label}</span> : null}
    <input className="sb-color" type="color" value={value} onChange={(e) => onChange?.(e.target.value)} />
  </label>
);

ColorPicker.propTypes = { label: PropTypes.string, value: PropTypes.string, onChange: PropTypes.func };

export const DateInput = ({ label, value, onChange }) => (
  <label className="sb-field">
    {label ? <span className="sb-field__label">{label}</span> : null}
    <input className="sb-input" type="date" value={value} onChange={(e) => onChange?.(e.target.value)} />
  </label>
);

DateInput.propTypes = { label: PropTypes.string, value: PropTypes.string, onChange: PropTypes.func };


export const MultiSelect = ({ label, value = [], options = [], placeholder = 'Pick values', onChange, disabled = false, error, helper, closeOnSelect = true }) => {
  const rootRef = useRef(null);
  const [open, setOpen] = useState(false);

  useEffect(() => {
    function handleDocumentClick(e) {
      if (!rootRef.current) return;
      if (!rootRef.current.contains(e.target)) setOpen(false);
    }
    document.addEventListener('mousedown', handleDocumentClick);
    return () => document.removeEventListener('mousedown', handleDocumentClick);
  }, []);

  function isSelected(v) {
    return value.includes(v);
  }

  function toggleValue(v) {
    if (disabled) return;
    const next = isSelected(v) ? value.filter((x) => x !== v) : [...value, v];
    onChange?.(next);
    if (closeOnSelect) setOpen(false);
  }

  function removeValue(v) {
    if (disabled) return;
    onChange?.(value.filter((x) => x !== v));
  }

  const selectedOptions = options.filter((o) => value.includes(o.value));

  return (
    <label ref={rootRef} className={`sb-field ${error ? 'is-error' : ''}`}>
      {label ? <span className="sb-field__label">{label}</span> : null}
      <div className={`sb-ms ${disabled ? 'is-disabled' : ''}`}>
        <button
          type="button"
          className="sb-ms-trigger"
          onClick={() => setOpen((o) => !o)}
          disabled={disabled}
          aria-haspopup="listbox"
          aria-expanded={open}
        >
          {selectedOptions.length === 0 ? (
            <span className="sb-ms-placeholder">{placeholder}</span>
          ) : (
            selectedOptions.map((opt) => (
              <span key={opt.value} className="sb-ms-chip">
                <span className="sb-ms-chip__label">{opt.label}</span>
                <button type="button" className="sb-ms-chip__x" aria-label={`Remove ${opt.label}`} onClick={(e) => { e.stopPropagation(); removeValue(opt.value); }}>×</button>
              </span>
            ))
          )}
          <span className="sb-ms-caret">▾</span>
        </button>

        {open ? (
          <div className="sb-ms-menu" role="listbox" aria-multiselectable="true" onMouseDown={(e) => { e.preventDefault(); e.stopPropagation(); }}>
            {options.map((opt) => (
              <div key={opt.value} className="sb-ms-item" role="option" aria-selected={isSelected(opt.value)} onClick={(e) => { e.preventDefault(); e.stopPropagation(); toggleValue(opt.value); }}>
                <input type="checkbox" readOnly checked={isSelected(opt.value)} />
                <span>{opt.label}</span>
              </div>
            ))}
          </div>
        ) : null}
      </div>
      {helper ? <span className="sb-field__help">{helper}</span> : null}
      {error ? <span className="sb-field__error">{error}</span> : null}
    </label>
  );
};

MultiSelect.propTypes = {
  label: PropTypes.string,
  value: PropTypes.arrayOf(PropTypes.string),
  options: PropTypes.arrayOf(PropTypes.shape({ value: PropTypes.string.isRequired, label: PropTypes.string.isRequired })),
  placeholder: PropTypes.string,
  onChange: PropTypes.func,
  disabled: PropTypes.bool,
  error: PropTypes.string,
  helper: PropTypes.string,
  closeOnSelect: PropTypes.bool,
};


export const SingleSelect = ({ label, value = '', options = [], placeholder = 'Choose…', onChange, disabled = false, error, helper }) => {
  const rootRef = useRef(null);
  const [open, setOpen] = useState(false);

  useEffect(() => {
    function handleDocumentClick(e) {
      if (!rootRef.current) return;
      if (!rootRef.current.contains(e.target)) setOpen(false);
    }
    document.addEventListener('mousedown', handleDocumentClick);
    return () => document.removeEventListener('mousedown', handleDocumentClick);
  }, []);

  const selected = options.find((o) => o.value === value);

  function selectValue(v) {
    if (disabled) return;
    onChange?.(v);
    setOpen(false);
  }

  return (
    <label ref={rootRef} className={`sb-field ${error ? 'is-error' : ''}`}>
      {label ? <span className="sb-field__label">{label}</span> : null}
      <div className={`sb-ms ${disabled ? 'is-disabled' : ''}`}>
        <button
          type="button"
          className="sb-ms-trigger"
          onClick={() => setOpen((o) => !o)}
          disabled={disabled}
          aria-haspopup="listbox"
          aria-expanded={open}
        >
          {selected ? (
            <span>{selected.label}</span>
          ) : (
            <span className="sb-ms-placeholder">{placeholder}</span>
          )}
          <span className="sb-ms-caret">▾</span>
        </button>

        {open ? (
          <div className="sb-ms-menu" role="listbox" aria-multiselectable="false" onMouseDown={(e) => { e.preventDefault(); e.stopPropagation(); }}>
            {options.map((opt) => (
              <div key={opt.value} className="sb-ms-item" role="option" aria-selected={opt.value === value} onClick={(e) => { e.preventDefault(); e.stopPropagation(); selectValue(opt.value); }}>
                <input type="radio" readOnly checked={opt.value === value} />
                <span>{opt.label}</span>
              </div>
            ))}
          </div>
        ) : null}
      </div>
      {helper ? <span className="sb-field__help">{helper}</span> : null}
      {error ? <span className="sb-field__error">{error}</span> : null}
    </label>
  );
};

SingleSelect.propTypes = {
  label: PropTypes.string,
  value: PropTypes.string,
  options: PropTypes.arrayOf(PropTypes.shape({ value: PropTypes.string.isRequired, label: PropTypes.string.isRequired })),
  placeholder: PropTypes.string,
  onChange: PropTypes.func,
  disabled: PropTypes.bool,
  error: PropTypes.string,
  helper: PropTypes.string,
};

function toStartOfMonth(d) {
  return new Date(d.getFullYear(), d.getMonth(), 1);
}

function addMonths(d, delta) {
  return new Date(d.getFullYear(), d.getMonth() + delta, 1);
}

function daysInMonth(year, month) {
  return new Date(year, month + 1, 0).getDate();
}

function formatMdY(d) {
  const mm = String(d.getMonth() + 1).padStart(2, '0');
  const dd = String(d.getDate()).padStart(2, '0');
  const yy = d.getFullYear();
  return `${mm}/${dd}/${yy}`;
}

function toIso(d) {
  const mm = String(d.getMonth() + 1).padStart(2, '0');
  const dd = String(d.getDate()).padStart(2, '0');
  return `${d.getFullYear()}-${mm}-${dd}`;
}

function fromIso(iso) {
  if (!iso) return null;
  const [y, m, d] = iso.split('-').map((x) => Number(x));
  if (!y || !m || !d) return null;
  return new Date(y, m - 1, d);
}

function buildMonthMatrix(base) {
  const first = toStartOfMonth(base);
  const total = daysInMonth(first.getFullYear(), first.getMonth());
  const startDay = first.getDay(); // 0..6 Sun..Sat
  const cells = [];
  for (let i = 0; i < startDay; i++) cells.push(null);
  for (let day = 1; day <= total; day++) cells.push(new Date(first.getFullYear(), first.getMonth(), day));
  while (cells.length % 7 !== 0) cells.push(null);
  const weeks = [];
  for (let i = 0; i < cells.length; i += 7) weeks.push(cells.slice(i, i + 7));
  return weeks;
}

export const DateRange = ({ label, value = { start: '', end: '' }, placeholder = 'MM/DD/YYYY – MM/DD/YYYY', onChange, disabled = false, error, helper, closeOnSelect = true }) => {
  const rootRef = useRef(null);
  const [open, setOpen] = useState(false);
  const startDate = fromIso(value?.start);
  const endDate = fromIso(value?.end);
  const [view, setView] = useState(toStartOfMonth(startDate || new Date()));

  useEffect(() => {
    function handleDocumentClick(e) {
      if (!rootRef.current) return;
      if (!rootRef.current.contains(e.target)) setOpen(false);
    }
    document.addEventListener('mousedown', handleDocumentClick);
    return () => document.removeEventListener('mousedown', handleDocumentClick);
  }, []);

  function inRange(d) {
    if (!startDate || !endDate) return false;
    const time = d.getTime();
    return time > startDate.getTime() && time < endDate.getTime();
  }

  function isSame(d1, d2) {
    return d1 && d2 && d1.getFullYear() === d2.getFullYear() && d1.getMonth() === d2.getMonth() && d1.getDate() === d2.getDate();
  }

  function pickDay(d) {
    if (!d || disabled) return;
    if (!startDate || (startDate && endDate)) {
      onChange?.({ start: toIso(d), end: '' });
    } else if (startDate && !endDate) {
      if (d.getTime() < startDate.getTime()) {
        onChange?.({ start: toIso(d), end: '' });
      } else {
        onChange?.({ start: toIso(startDate), end: toIso(d) });
        if (closeOnSelect) setOpen(false);
      }
    }
  }

  const startText = startDate ? formatMdY(startDate) : '';
  const endText = endDate ? formatMdY(endDate) : '';
  const display = startText || endText ? `${startText || 'MM/DD/YYYY'}  – ${endText || 'MM/DD/YYYY'}`.replace('\u0000', '') : '';

  const monthA = view;
  const monthB = addMonths(view, 1);

  function renderMonth(monthDate, showPrev, showNext) {
    const weeks = buildMonthMatrix(monthDate);
    const monthName = monthDate.toLocaleString(undefined, { month: 'long', year: 'numeric' });
    return (
      <div className="sb-dr-month">
        <div className="sb-dr-month__head">
          {showPrev ? <button type="button" className="sb-dr-nav" aria-label="Previous month" onClick={() => setView(addMonths(view, -1))}>‹</button> : <span />}
          <span className="sb-dr-month__title">{monthName}</span>
          {showNext ? <button type="button" className="sb-dr-nav" aria-label="Next month" onClick={() => setView(addMonths(view, 1))}>›</button> : <span />}
        </div>
        <div className="sb-dr-grid sb-dr-grid--dow">
          <span> S </span><span> M </span><span> T </span><span> W </span><span> T </span><span> F </span><span> S </span>
        </div>
        <div className="sb-dr-grid">
          {weeks.flat().map((d, idx) => {
            if (!d) return <span key={idx} className="sb-dr-day is-empty" />;
            const isStart = isSame(d, startDate);
            const isEnd = isSame(d, endDate);
            const mid = inRange(d);
            return (
              <button
                key={idx}
                type="button"
                className={`sb-dr-day ${isStart ? 'is-start' : ''} ${isEnd ? 'is-end' : ''} ${mid ? 'is-mid' : ''}`.trim()}
                onClick={() => pickDay(d)}
              >
                {d.getDate()}
              </button>
            );
          })}
        </div>
      </div>
    );
  }

  return (
    <label ref={rootRef} className={`sb-field ${error ? 'is-error' : ''}`}>
      {label ? <span className="sb-field__label">{label}</span> : null}
      <div className={`sb-dr ${disabled ? 'is-disabled' : ''}`}>
        <button
          type="button"
          className="sb-ms-trigger sb-dr-trigger"
          onClick={() => setOpen((o) => !o)}
          disabled={disabled}
          aria-haspopup="dialog"
          aria-expanded={open}
        >
          {display ? <span>{display}</span> : <span className="sb-ms-placeholder">{placeholder}</span>}
          <span className="sb-ms-caret">📅</span>
        </button>

        {open ? (
          <div className="sb-dr-menu" onMouseDown={(e) => { e.preventDefault(); e.stopPropagation(); }}>
            {renderMonth(monthA, true, false)}
            {renderMonth(monthB, false, true)}
          </div>
        ) : null}
      </div>
      {helper ? <span className="sb-field__help">{helper}</span> : null}
      {error ? <span className="sb-field__error">{error}</span> : null}
    </label>
  );
};

DateRange.propTypes = {
  label: PropTypes.string,
  value: PropTypes.shape({ start: PropTypes.string, end: PropTypes.string }),
  placeholder: PropTypes.string,
  onChange: PropTypes.func,
  disabled: PropTypes.bool,
  error: PropTypes.string,
  helper: PropTypes.string,
  closeOnSelect: PropTypes.bool,
};

