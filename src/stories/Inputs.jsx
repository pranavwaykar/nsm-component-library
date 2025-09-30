import React, { useRef, useState } from 'react';
import PropTypes from 'prop-types';
import './inputs.scss';

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


