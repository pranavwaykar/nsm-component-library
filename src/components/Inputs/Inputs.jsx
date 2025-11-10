import React, { useEffect, useRef, useState } from "react";
import PropTypes from "prop-types";
import "../../index.scss";
import "./inputs.scss";
import { expandStyleProps } from "../../utils/styleSystem";

const isRenderable = (v) =>
  v !== undefined &&
  v !== null &&
  typeof v !== "boolean" &&
  (typeof v === "string" ||
    typeof v === "number" ||
    React.isValidElement(v) ||
    (Array.isArray(v) &&
      v.every(
        (x) =>
          typeof x === "string" ||
          typeof x === "number" ||
          React.isValidElement(x)
      )));

export const TextInput = ({
  label,
  value,
  placeholder,
  error,
  helper,
  onChange,
  as = "label",
  className,
  style,
  hidden,
  containerProps = {},
  inputProps = {},
  children,
  ...rest
}) => {
  const Component = as;
  const mergedStyle = {
    ...expandStyleProps(rest),
    ...(style || {}),
    ...(containerProps.style || {}),
  };
  if (hidden === true && mergedStyle.display === undefined)
    mergedStyle.display = "none";
  const rootClass = [
    `sb-field`,
    error ? "is-error" : "",
    containerProps.className,
    className,
  ]
    .filter(Boolean)
    .join(" ");
  const {
    style: _omitStyle,
    className: _omitClass,
    ...containerRest
  } = containerProps;
  return (
    <Component
      className={rootClass}
      style={mergedStyle}
      {...containerRest}
      {...rest}
    >
      {label ? <span className="sb-field__label">{label}</span> : null}
      <input
        className="sb-input"
        value={value}
        placeholder={placeholder}
        onChange={(e) => onChange?.(e.target.value)}
        {...inputProps}
      />
      {isRenderable(helper) ? (
        <span className="sb-field__help">{helper}</span>
      ) : null}
      {isRenderable(error) ? (
        <span className="sb-field__error">{error}</span>
      ) : null}
      {children}
    </Component>
  );
};

TextInput.propTypes = {
  label: PropTypes.string,
  value: PropTypes.string,
  placeholder: PropTypes.string,
  error: PropTypes.string,
  helper: PropTypes.string,
  onChange: PropTypes.func,
};

export const TextArea = ({
  label,
  value,
  placeholder,
  rows = 4,
  error,
  helper,
  onChange,
  as = "label",
  className,
  style,
  hidden,
  containerProps = {},
  inputProps = {},
  children,
  ...rest
}) => {
  const Component = as;
  const mergedStyle = {
    ...expandStyleProps(rest),
    ...(style || {}),
    ...(containerProps.style || {}),
  };
  if (hidden === true && mergedStyle.display === undefined)
    mergedStyle.display = "none";
  const rootClass = [
    `sb-field`,
    error ? "is-error" : "",
    containerProps.className,
    className,
  ]
    .filter(Boolean)
    .join(" ");
  const {
    style: _omitStyle,
    className: _omitClass,
    ...containerRest
  } = containerProps;
  return (
    <Component
      className={rootClass}
      style={mergedStyle}
      {...containerRest}
      {...rest}
    >
      {label ? <span className="sb-field__label">{label}</span> : null}
      <textarea
        className="sb-input sb-input--area"
        rows={rows}
        value={value}
        placeholder={placeholder}
        onChange={(e) => onChange?.(e.target.value)}
        {...inputProps}
      />
      {isRenderable(helper) ? (
        <span className="sb-field__help">{helper}</span>
      ) : null}
      {isRenderable(error) ? (
        <span className="sb-field__error">{error}</span>
      ) : null}
      {children}
    </Component>
  );
};

TextArea.propTypes = TextInput.propTypes;

export const Select = ({
  label,
  value,
  options = [],
  onChange,
  multiple = false,
  placeholder,
  error,
  helper,
  leftSection,
  rightSection,
  as = "label",
  className,
  style,
  hidden,
  containerProps = {},
  selectProps = {},
  children,
  ...rest
}) => {
  const Component = as;
  const mergedStyle = {
    ...expandStyleProps(rest),
    ...(style || {}),
    ...(containerProps.style || {}),
  };
  if (hidden === true && mergedStyle.display === undefined)
    mergedStyle.display = "none";
  const rootClass = [
    `sb-field`,
    error ? "is-error" : "",
    containerProps.className,
    className,
  ]
    .filter(Boolean)
    .join(" ");
  const {
    style: _omitStyle,
    className: _omitClass,
    ...containerRest
  } = containerProps;
  return (
    <Component
      className={`${rootClass} sb-field--select`.trim()}
      style={mergedStyle}
      {...containerRest}
      {...rest}
    >
      {label ? <span className="sb-field__label">{label}</span> : null}
      <div
        className={`sb-input-wrap ${leftSection ? "has-left" : ""} ${
          rightSection ? "has-right" : ""
        }`.trim()}
      >
        {leftSection ? (
          <span
            className="sb-field__section sb-field__section--left"
            aria-hidden
          >
            {leftSection}
          </span>
        ) : null}
        <select
          className={`sb-input ${leftSection ? "has-left-section" : ""} ${
            rightSection ? "has-right-section" : ""
          }`.trim()}
          multiple={multiple}
          value={value}
          onChange={(e) => {
            if (multiple) {
              const v = Array.from(e.target.selectedOptions).map(
                (o) => o.value
              );
              onChange?.(v);
            } else {
              onChange?.(e.target.value);
            }
          }}
          {...selectProps}
        >
          {placeholder && !multiple ? (
            <option value="">{placeholder}</option>
          ) : null}
          {options.map((opt) => (
            <option key={opt.value} value={opt.value}>
              {opt.label}
            </option>
          ))}
        </select>
        {rightSection ? (
          <span
            className="sb-field__section sb-field__section--right"
            aria-hidden
          >
            {rightSection}
          </span>
        ) : null}
      </div>
      {isRenderable(helper) ? (
        <span className="sb-field__help">{helper}</span>
      ) : null}
      {isRenderable(error) ? (
        <span className="sb-field__error">{error}</span>
      ) : null}
      {children}
    </Component>
  );
};

Select.propTypes = {
  label: PropTypes.string,
  value: PropTypes.oneOfType([PropTypes.string, PropTypes.array]),
  options: PropTypes.arrayOf(
    PropTypes.shape({
      value: PropTypes.string.isRequired,
      label: PropTypes.string.isRequired,
    })
  ),
  onChange: PropTypes.func,
  multiple: PropTypes.bool,
  placeholder: PropTypes.string,
  error: PropTypes.string,
  helper: PropTypes.string,
  leftSection: PropTypes.node,
  rightSection: PropTypes.node,
};

export const Checkbox = ({
  label,
  checked,
  onChange,
  error,
  helper,
  as = "label",
  style,
  hidden,
  ...rest
}) => {
  const Component = as;
  const merged = { ...expandStyleProps(rest), ...(style || {}) };
  if (hidden === true && merged.display === undefined) merged.display = "none";
  return (
    <Component className="sb-check" style={merged} {...rest}>
      <input
        type="checkbox"
        checked={checked}
        onChange={(e) => onChange?.(e.target.checked)}
      />
      <span>{label}</span>
      {isRenderable(helper) ? (
        <span className="sb-field__help">{helper}</span>
      ) : null}
      {isRenderable(error) ? (
        <span className="sb-field__error">{error}</span>
      ) : null}
    </Component>
  );
};

Checkbox.propTypes = {
  label: PropTypes.string,
  checked: PropTypes.bool,
  onChange: PropTypes.func,
};

export const Toggle = ({
  label,
  checked,
  onChange,
  error,
  helper,
  as = "label",
  style,
  hidden,
  ...rest
}) => {
  const Component = as;
  const merged = { ...expandStyleProps(rest), ...(style || {}) };
  if (hidden === true && merged.display === undefined) merged.display = "none";
  return (
    <Component className="sb-toggle" style={merged} {...rest}>
      <input
        type="checkbox"
        checked={checked}
        onChange={(e) => onChange?.(e.target.checked)}
      />
      <span className="sb-toggle__track">
        <span className="sb-toggle__thumb" />
      </span>
      {label ? <span className="sb-toggle__label">{label}</span> : null}
      {isRenderable(helper) ? (
        <span className="sb-field__help">{helper}</span>
      ) : null}
      {isRenderable(error) ? (
        <span className="sb-field__error">{error}</span>
      ) : null}
    </Component>
  );
};

Toggle.propTypes = Checkbox.propTypes;

export const RadioGroup = ({
  label,
  name,
  value,
  options = [],
  onChange,
  error,
  helper,
  as = "div",
  style,
  hidden,
  ...rest
}) => {
  const Component = as;
  const merged = { ...expandStyleProps(rest), ...(style || {}) };
  if (hidden === true && merged.display === undefined) merged.display = "none";
  return (
    <Component className="sb-radio" style={merged} {...rest}>
      {label ? <span className="sb-field__label">{label}</span> : null}
      {options.map((opt) => (
        <label key={opt.value} onClick={() => onChange?.(opt.value)}>
          <span>{opt.label}</span>
        </label>
      ))}
      {isRenderable(helper) ? (
        <span className="sb-field__help">{helper}</span>
      ) : null}
      {isRenderable(error) ? (
        <span className="sb-field__error">{error}</span>
      ) : null}
    </Component>
  );
};

RadioGroup.propTypes = {
  label: PropTypes.string,
  name: PropTypes.string,
  value: PropTypes.string,
  options: PropTypes.array,
  onChange: PropTypes.func,
  error: PropTypes.string,
  helper: PropTypes.string,
};

export const RangeInput = ({
  label,
  value,
  min = 0,
  max = 100,
  step = 1,
  onChange,
  error,
  helper,
  as = "label",
  style,
  hidden,
  ...rest
}) => {
  const Component = as;
  const merged = { ...expandStyleProps(rest), ...(style || {}) };
  if (hidden === true && merged.display === undefined) merged.display = "none";
  return (
    <Component className="sb-field" style={merged} {...rest}>
      {label ? <span className="sb-field__label">{label}</span> : null}
      <input
        className="sb-range"
        type="range"
        min={min}
        max={max}
        step={step}
        value={value}
        onChange={(e) => onChange?.(Number(e.target.value))}
      />
      {isRenderable(helper) ? (
        <span className="sb-field__help">{helper}</span>
      ) : null}
      {isRenderable(error) ? (
        <span className="sb-field__error">{error}</span>
      ) : null}
    </Component>
  );
};

RangeInput.propTypes = {
  label: PropTypes.string,
  value: PropTypes.number,
  min: PropTypes.number,
  max: PropTypes.number,
  step: PropTypes.number,
  onChange: PropTypes.func,
  error: PropTypes.string,
  helper: PropTypes.string,
};

export const FileInput = ({
  label,
  onFiles,
  accept,
  multiple = false,
  as = "div",
  style,
  hidden,
  ...rest
}) => {
  const ref = useRef(null);
  const [hover, setHover] = useState(false);
  function onDrop(e) {
    e.preventDefault();
    setHover(false);
    if (e.dataTransfer?.files?.length)
      onFiles?.(Array.from(e.dataTransfer.files));
  }
  const Component = as;
  const merged = { ...expandStyleProps(rest), ...(style || {}) };
  if (hidden === true && merged.display === undefined) merged.display = "none";
  return (
    <Component
      className={`sb-file ${hover ? "is-hover" : ""}`}
      style={merged}
      onDragOver={(e) => {
        e.preventDefault();
        setHover(true);
      }}
      onDragLeave={() => setHover(false)}
      onDrop={onDrop}
      {...rest}
    >
      {label ? <div className="sb-file__label">{label}</div> : null}
      <button
        className="sb-file__btn"
        type="button"
        onClick={() => ref.current?.click()}
      >
        Choose file
      </button>
      <input
        ref={ref}
        type="file"
        accept={accept}
        multiple={multiple}
        onChange={(e) => onFiles?.(Array.from(e.target.files || []))}
        hidden
      />
      <div className="sb-file__hint">Drag & drop files here</div>
    </Component>
  );
};

FileInput.propTypes = {
  label: PropTypes.string,
  onFiles: PropTypes.func,
  accept: PropTypes.string,
  multiple: PropTypes.bool,
};

export const ColorPicker = ({
  label,
  value,
  onChange,
  error,
  helper,
  as = "label",
  style,
  hidden,
  ...rest
}) => {
  const Component = as;
  const merged = { ...expandStyleProps(rest), ...(style || {}) };
  if (hidden === true && merged.display === undefined) merged.display = "none";
  return (
    <Component className="sb-field" style={merged} {...rest}>
      {label ? <span className="sb-field__label">{label}</span> : null}
      <input
        className="sb-color"
        type="color"
        value={value}
        onChange={(e) => onChange?.(e.target.value)}
      />
      {isRenderable(helper) ? (
        <span className="sb-field__help">{helper}</span>
      ) : null}
      {isRenderable(error) ? (
        <span className="sb-field__error">{error}</span>
      ) : null}
    </Component>
  );
};

ColorPicker.propTypes = {
  label: PropTypes.string,
  value: PropTypes.string,
  onChange: PropTypes.func,
  error: PropTypes.string,
  helper: PropTypes.string,
};

export const DateInput = ({
  label,
  value,
  onChange,
  placeholder = "",
  error,
  helper,
  as = "label",
  style,
  hidden,
  ...rest
}) => {
  const Component = as;
  const merged = { ...expandStyleProps(rest), ...(style || {}) };
  if (hidden === true && merged.display === undefined) merged.display = "none";
  return (
    <Component className="sb-field" style={merged} {...rest}>
      {label ? <span className="sb-field__label">{label}</span> : null}
      <input
        className="sb-ms-trigger"
        type="date"
        value={value}
        placeholder={placeholder}
        onChange={(e) => onChange?.(e.target.value)}
      />
      {isRenderable(helper) ? (
        <span className="sb-field__help">{helper}</span>
      ) : null}
      {isRenderable(error) ? (
        <span className="sb-field__error">{error}</span>
      ) : null}
    </Component>
  );
};

DateInput.propTypes = {
  label: PropTypes.string,
  value: PropTypes.string,
  onChange: PropTypes.func,
  placeholder: PropTypes.string,
  error: PropTypes.string,
  helper: PropTypes.string,
};

export const MultiSelect = ({
  label,
  value = [],
  options = [],
  placeholder = "Pick values",
  onChange,
  disabled = false,
  error,
  helper,
  closeOnSelect = true,
  as = "label",
  className,
  style,
  hidden,
  ...rest
}) => {
  const rootRef = useRef(null);
  const [open, setOpen] = useState(false);

  useEffect(() => {
    function handleDocumentClick(e) {
      if (!rootRef.current) return;
      if (!rootRef.current.contains(e.target)) setOpen(false);
    }
    document.addEventListener("mousedown", handleDocumentClick);
    return () => document.removeEventListener("mousedown", handleDocumentClick);
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

  const Component = as;
  const merged = { ...expandStyleProps(rest), ...(style || {}) };
  if (hidden === true && merged.display === undefined) merged.display = "none";
  return (
    <Component
      ref={rootRef}
      className={`sb-field ${error ? "is-error" : ""} ${
        className || ""
      }`.trim()}
      style={merged}
      {...rest}
    >
      {label ? <span className="sb-field__label">{label}</span> : null}
      <div className={`sb-ms ${disabled ? "is-disabled" : ""}`}>
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
                <button
                  type="button"
                  className="sb-ms-chip__x"
                  aria-label={`Remove ${opt.label}`}
                  onClick={(e) => {
                    e.stopPropagation();
                    removeValue(opt.value);
                  }}
                >
                  ×
                </button>
              </span>
            ))
          )}
          <span className="sb-ms-caret">▾</span>
        </button>

        {open ? (
          <div
            className="sb-ms-menu"
            role="listbox"
            aria-multiselectable="true"
            onMouseDown={(e) => {
              e.preventDefault();
              e.stopPropagation();
            }}
          >
            {options.map((opt) => (
              <div
                key={opt.value}
                className="sb-ms-item"
                role="option"
                aria-selected={isSelected(opt.value)}
                onClick={(e) => {
                  e.preventDefault();
                  e.stopPropagation();
                  toggleValue(opt.value);
                }}
              >
                <span>{opt.label}</span>
              </div>
            ))}
          </div>
        ) : null}
      </div>
      {isRenderable(helper) ? (
        <span className="sb-field__help">{helper}</span>
      ) : null}
      {isRenderable(error) ? (
        <span className="sb-field__error">{error}</span>
      ) : null}
    </Component>
  );
};

export const SingleSelect = ({
  label,
  value = "",
  options = [],
  placeholder = "Choose…",
  onChange,
  disabled = false,
  error,
  helper,
  as = "label",
  className,
  style,
  hidden,
  ...rest
}) => {
  const rootRef = useRef(null);
  const [open, setOpen] = useState(false);

  useEffect(() => {
    function handleDocumentClick(e) {
      if (!rootRef.current) return;
      if (!rootRef.current.contains(e.target)) setOpen(false);
    }
    document.addEventListener("mousedown", handleDocumentClick);
    return () => document.removeEventListener("mousedown", handleDocumentClick);
  }, []);

  const selected = options.find((o) => o.value === value);

  function selectValue(v) {
    if (disabled) return;
    onChange?.(v);
    setOpen(false);
  }

  const Component = as;
  const merged = { ...expandStyleProps(rest), ...(style || {}) };
  if (hidden === true && merged.display === undefined) merged.display = "none";
  return (
    <Component
      ref={rootRef}
      className={`sb-field ${error ? "is-error" : ""} ${
        className || ""
      }`.trim()}
      style={merged}
      {...rest}
    >
      {label ? <span className="sb-field__label">{label}</span> : null}
      <div className={`sb-ms ${disabled ? "is-disabled" : ""}`}>
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
          <div
            className="sb-ms-menu"
            role="listbox"
            aria-multiselectable="false"
            onMouseDown={(e) => {
              e.preventDefault();
              e.stopPropagation();
            }}
          >
            {options.map((opt) => (
              <div
                key={opt.value}
                className="sb-ms-item"
                role="option"
                aria-selected={opt.value === value}
                onClick={(e) => {
                  e.preventDefault();
                  e.stopPropagation();
                  selectValue(opt.value);
                }}
              >
                <span>{opt.label}</span>
              </div>
            ))}
          </div>
        ) : null}
      </div>
      {isRenderable(helper) ? (
        <span className="sb-field__help">{helper}</span>
      ) : null}
      {isRenderable(error) ? (
        <span className="sb-field__error">{error}</span>
      ) : null}
    </Component>
  );
};

SingleSelect.propTypes = {
  label: PropTypes.string,
  value: PropTypes.string,
  options: PropTypes.arrayOf(
    PropTypes.shape({
      value: PropTypes.string.isRequired,
      label: PropTypes.string.isRequired,
    })
  ),
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
  const mm = String(d.getMonth() + 1).padStart(2, "0");
  const dd = String(d.getDate()).padStart(2, "0");
  const yy = d.getFullYear();
  return `${mm}/${dd}/${yy}`;
}

function toIso(d) {
  const mm = String(d.getMonth() + 1).padStart(2, "0");
  const dd = String(d.getDate()).padStart(2, "0");
  return `${d.getFullYear()}-${mm}-${dd}`;
}

function fromIso(iso) {
  if (!iso) return null;
  const [y, m, d] = iso.split("-").map((x) => Number(x));
  if (!y || !m || !d) return null;
  return new Date(y, m - 1, d);
}

function buildMonthMatrix(base) {
  const first = toStartOfMonth(base);
  const total = daysInMonth(first.getFullYear(), first.getMonth());
  const startDay = first.getDay(); // 0..6 Sun..Sat
  const cells = [];
  for (let i = 0; i < startDay; i++) cells.push(null);
  for (let day = 1; day <= total; day++)
    cells.push(new Date(first.getFullYear(), first.getMonth(), day));
  while (cells.length % 7 !== 0) cells.push(null);
  const weeks = [];
  for (let i = 0; i < cells.length; i += 7) weeks.push(cells.slice(i, i + 7));
  return weeks;
}

export const DateRange = ({
  label,
  value = { start: "", end: "" },
  placeholder = "MM/DD/YYYY – MM/DD/YYYY",
  onChange,
  disabled = false,
  error,
  helper,
  closeOnSelect = true,
  granularity = "day", // 'day' | 'month'
  as = "label",
  style,
  hidden,
  ...rest
}) => {
  const rootRef = useRef(null);
  const [open, setOpen] = useState(false);
  const startDate = fromIso(value?.start);
  const endDate = fromIso(value?.end);
  const [view, setView] = useState(toStartOfMonth(startDate || new Date()));
  const [yearView, setYearView] = useState((startDate || new Date()).getFullYear());

  useEffect(() => {
    function handleDocumentClick(e) {
      if (!rootRef.current) return;
      if (!rootRef.current.contains(e.target)) setOpen(false);
    }
    document.addEventListener("mousedown", handleDocumentClick);
    return () => document.removeEventListener("mousedown", handleDocumentClick);
  }, []);

  function inRange(d) {
    if (!startDate || !endDate) return false;
    const time = d.getTime();
    return time > startDate.getTime() && time < endDate.getTime();
  }

  function isSame(d1, d2) {
    return (
      d1 &&
      d2 &&
      d1.getFullYear() === d2.getFullYear() &&
      d1.getMonth() === d2.getMonth() &&
      d1.getDate() === d2.getDate()
    );
  }

  function pickDay(d) {
    if (!d || disabled) return;
    if (!startDate || (startDate && endDate)) {
      onChange?.({ start: toIso(d), end: "" });
    } else if (startDate && !endDate) {
      if (d.getTime() < startDate.getTime()) {
        onChange?.({ start: toIso(d), end: "" });
      } else {
        onChange?.({ start: toIso(startDate), end: toIso(d) });
        if (closeOnSelect) setOpen(false);
      }
    }
  }

  // quick preset helpers
  function startOfDay(d) {
    const x = new Date(d);
    x.setHours(0, 0, 0, 0);
    return x;
  }
  function endOfDay(d) {
    const x = new Date(d);
    x.setHours(23, 59, 59, 999);
    return x;
  }
  function pickPreset(kind) {
    const now = new Date();
    if (granularity === "month") {
      let from, to;
      if (kind === "thisMonth") {
        from = new Date(now.getFullYear(), now.getMonth(), 1);
        to = new Date(now.getFullYear(), now.getMonth() + 1, 0);
      } else if (kind === "last3") {
        from = new Date(now.getFullYear(), now.getMonth() - 2, 1);
        to = new Date(now.getFullYear(), now.getMonth() + 1, 0);
      } else if (kind === "last6") {
        from = new Date(now.getFullYear(), now.getMonth() - 5, 1);
        to = new Date(now.getFullYear(), now.getMonth() + 1, 0);
      } else if (kind === "last12") {
        from = new Date(now.getFullYear(), now.getMonth() - 11, 1);
        to = new Date(now.getFullYear(), now.getMonth() + 1, 0);
      } else {
        from = new Date(now.getFullYear(), now.getMonth(), 1);
        to = new Date(now.getFullYear(), now.getMonth() + 1, 0);
      }
      onChange?.({ start: toIso(from), end: toIso(to) });
      if (closeOnSelect) setOpen(false);
      return;
    } else {
      let from = startOfDay(now);
      let to = endOfDay(now);
      if (kind === "last7")
        from = startOfDay(
          new Date(now.getFullYear(), now.getMonth(), now.getDate() - 6)
        );
      if (kind === "last30")
        from = startOfDay(
          new Date(now.getFullYear(), now.getMonth(), now.getDate() - 29)
        );
      if (kind === "thisMonth") {
        from = startOfDay(new Date(now.getFullYear(), now.getMonth(), 1));
        to = endOfDay(new Date(now.getFullYear(), now.getMonth() + 1, 0));
      }
      onChange?.({ start: toIso(from), end: toIso(to) });
      if (closeOnSelect) setOpen(false);
    }
  }

  function monthLong(d) {
    return d
      ? `${d.toLocaleString(undefined, { month: "long" })}, ${d.getFullYear()}`
      : "";
  }
  const display = (() => {
    if (granularity === "month") {
      if (startDate && endDate) {
        const sameMonth =
          startDate.getFullYear() === endDate.getFullYear() &&
          startDate.getMonth() === endDate.getMonth();
        return sameMonth
          ? monthLong(startDate)
          : `${monthLong(startDate)} – ${monthLong(endDate)}`;
      }
      return "";
    }
    const startText = startDate ? formatMdY(startDate) : "";
    const endText = endDate ? formatMdY(endDate) : "";
    return startText || endText
      ? `${startText || "MM/DD/YYYY"} – ${endText || "MM/DD/YYYY"}`
      : "";
  })();

  const monthA = view;
  const monthB = addMonths(view, 1);

  function renderMonth(monthDate, showPrev, showNext) {
    const weeks = buildMonthMatrix(monthDate);
    const monthName = monthDate.toLocaleString(undefined, {
      month: "long",
      year: "numeric",
    });
    return (
      <div className="sb-dr-month">
        <div className="sb-dr-month__head">
          {showPrev ? (
            <button
              type="button"
              className="sb-dr-nav"
              aria-label="Previous month"
              onClick={() => setView(addMonths(view, -1))}
            >
              ◀
            </button>
          ) : (
            <span />
          )}
          <span className="sb-dr-month__title">{monthName}</span>
          {showNext ? (
            <button
              type="button"
              className="sb-dr-nav"
              aria-label="Next month"
              onClick={() => setView(addMonths(view, 1))}
            >
              ▶
            </button>
          ) : (
            <span />
          )}
        </div>
        <div className="sb-dr-grid sb-dr-grid--dow">
          <span> S </span>
          <span> M </span>
          <span> T </span>
          <span> W </span>
          <span> T </span>
          <span> F </span>
          <span> S </span>
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
                className={`sb-dr-day ${isStart ? "is-start" : ""} ${
                  isEnd ? "is-end" : ""
                } ${mid ? "is-mid" : ""}`.trim()}
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

  function isSameMonth(a, b) {
    return a && b && a.getFullYear() === b.getFullYear() && a.getMonth() === b.getMonth();
  }

  function pickMonth(monthIndex, year) {
    if (disabled) return;
    // Single-month selection: set start to first day and end to last day of the same month, then close
    const startOfPicked = new Date(year, monthIndex, 1);
    const endOfPicked = new Date(year, monthIndex + 1, 0);
    onChange?.({ start: toIso(startOfPicked), end: toIso(endOfPicked) });
    if (closeOnSelect) setOpen(false);
  }

  function renderMonthMode() {
    const months = ["Jan","Feb","Mar","Apr","May","Jun","Jul","Aug","Sep","Oct","Nov","Dec"];
    return (
      <div className="sb-dr-months">
        <div className="sb-dr-month__head">
          <button
            type="button"
            className="sb-dr-nav"
            aria-label="Previous year"
            onClick={() => setYearView((y) => y - 1)}
          >
            ◀
          </button>
          <span className="sb-dr-month__title">
            {(() => {
              // Show current selection if any, else show current year
              const m = startDate ? startDate.getMonth() : new Date().getMonth();
              return `${["Jan","Feb","Mar","Apr","May","Jun","Jul","Aug","Sep","Oct","Nov","Dec"][m]}, ${yearView}`;
            })()}
          </span>
          <button
            type="button"
            className="sb-dr-nav"
            aria-label="Next year"
            onClick={() => setYearView((y) => y + 1)}
          >
            ▶
          </button>
        </div>
        <div className="sb-dr-grid sb-dr-grid--months">
          {months.map((label, idx) => {
            const current = new Date(yearView, idx, 1);
            const isStart = startDate ? isSameMonth(current, startDate) : false;
            const isEnd = endDate ? isSameMonth(current, endDate) : false;
            const inMid =
              startDate &&
              endDate &&
              current > new Date(startDate.getFullYear(), startDate.getMonth(), 1) &&
              current < new Date(endDate.getFullYear(), endDate.getMonth(), 1);
            return (
              <button
                key={label}
                type="button"
                className={`sb-dr-day ${isStart ? "is-start" : ""} ${isEnd ? "is-end" : ""} ${inMid ? "is-mid" : ""}`.trim()}
                onClick={() => pickMonth(idx, yearView)}
              >
                {label}
              </button>
            );
          })}
        </div>
      </div>
    );
  }

  const Component = as;
  const merged = { ...expandStyleProps(rest), ...(style || {}) };
  if (hidden === true && merged.display === undefined) merged.display = "none";

  function shiftMonth(delta) {
    if (disabled || granularity !== "month") return;
    const base = startDate || new Date();
    const nextStart = new Date(base.getFullYear(), base.getMonth() + delta, 1);
    const nextEnd = new Date(nextStart.getFullYear(), nextStart.getMonth() + 1, 0);
    onChange?.({ start: toIso(nextStart), end: toIso(nextEnd) });
    setYearView(nextStart.getFullYear());
  }

  return (
    <Component
      ref={rootRef}
      className={`sb-field ${error ? "is-error" : ""}`}
      style={merged}
      {...rest}
    >
      {label ? <span className="sb-field__label">{label}</span> : null}
      <div className={`sb-dr ${disabled ? "is-disabled" : ""}`}>
        <div className="sb-ms-trigger sb-dr-trigger" aria-haspopup="dialog" aria-expanded={open}>
          <button
            type="button"
            className="sb-dr-inline sb-dr-prev"
            aria-label="Previous month"
            onClick={(e) => {
              e.preventDefault();
              e.stopPropagation();
              shiftMonth(-1);
            }}
            disabled={disabled || granularity !== "month"}
          >
            <i className="fi fi-rr-angle-small-left" />
          </button>
          <button
            type="button"
            className="sb-dr-label"
            onClick={() => setOpen((o) => !o)}
            disabled={disabled}
          >
            {display ? (
              <span>{display}</span>
            ) : (
              <span className="sb-ms-placeholder">{placeholder}</span>
            )}
          </button>
          <button
            type="button"
            className="sb-dr-inline sb-dr-next"
            aria-label="Next month"
            onClick={(e) => {
              e.preventDefault();
              e.stopPropagation();
              shiftMonth(1);
            }}
            disabled={disabled || granularity !== "month"}
          >
            <i className="fi fi-rr-angle-small-right" />
          </button>
          {/* <span className="sb-ms-caret" aria-hidden>📅</span> */}
        </div>

        {open ? (
          <div
            className="sb-dr-menu"
            onMouseDown={(e) => {
              e.preventDefault();
              e.stopPropagation();
            }}
          >
            {granularity === "month" ? (
              renderMonthMode()
            ) : (
              <>
                <div className="sb-dr-presets">
                  <button type="button" onClick={() => pickPreset("today")}>Today</button>
                  <button type="button" onClick={() => pickPreset("last7")}>Last 7 Days</button>
                  <button type="button" onClick={() => pickPreset("thisMonth")}>This Month</button>
                  <button type="button" onClick={() => pickPreset("last30")}>Last 30 Days</button>
                  <button
                    type="button"
                    onClick={() => {
                      onChange?.({ start: "", end: "" });
                      setOpen(false);
                    }}
                  >
                    Clear
                  </button>
                </div>
                {renderMonth(monthA, true, false)}
                {renderMonth(monthB, false, true)}
              </>
            )}
          </div>
        ) : null}
      </div>
      {isRenderable(helper) ? (
        <span className="sb-field__help">{helper}</span>
      ) : null}
      {isRenderable(error) ? (
        <span className="sb-field__error">{error}</span>
      ) : null}
    </Component>
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

export const SearchInput = ({
  label,
  value = "",
  onChange,
  placeholder = "Search within all folders",
  categories = [
    { value: "all", label: "All" },
    { value: "stages", label: "Stages" },
    { value: "tc", label: "Transaction Chronicles" },
    { value: "email", label: "E-Mail" },
    { value: "issue", label: "Issue Chronicles" },
  ],
  category = "all",
  onCategoryChange,
  as = "div",
  style,
  hidden,
  ...rest
}) => {
  const Component = as;
  const merged = { ...expandStyleProps(rest), ...(style || {}) };
  if (hidden === true && merged.display === undefined) merged.display = "none";
  const [open, setOpen] = useState(false);
  const [active, setActive] = useState(false);
  const ref = useRef(null);
  const containerRef = useRef(null);
  useEffect(() => {
    if (active) ref.current?.focus();
  }, [active]);
  useEffect(() => {
    function handleDoc(e) {
      const host = containerRef.current;
      if (!host) return;
      if (!host.contains(e.target)) setOpen(false);
    }
    document.addEventListener("mousedown", handleDoc);
    return () => document.removeEventListener("mousedown", handleDoc);
  }, []);
  const current = categories.find((c) => c.value === category) || categories[0];

  // Speech-to-text (Web Speech API)
  const [listening, setListening] = useState(false);
  const recogRef = useRef(null);
  function startSpeech() {
    try {
      // Standard / webkit variants
      const Recognition =
        window.SpeechRecognition || window.webkitSpeechRecognition;
      if (!Recognition) {
        // No API support
        setListening(false);
        return;
      }
      const rec = new Recognition();
      recogRef.current = rec;
      rec.lang = "en-US";
      rec.interimResults = false;
      rec.maxAlternatives = 1;
      rec.onresult = (ev) => {
        const transcript = ev.results?.[0]?.[0]?.transcript || "";
        onChange?.(transcript);
      };
      rec.onend = () => setListening(false);
      setListening(true);
      rec.start();
    } catch (_) {
      setListening(false);
    }
  }
  function stopSpeech() {
    try {
      recogRef.current?.stop();
    } catch (_) {}
    setListening(false);
  }

  return (
    <Component
      ref={containerRef}
      className="sb-search"
      style={merged}
      {...rest}
    >
      {label ? <span className="sb-field__label">{label}</span> : null}
      <div className="sb-search__inset">
        <button
          type="button"
          className={`sb-search__cat ${open ? "is-open" : ""}`}
          onClick={() => setOpen((o) => !o)}
          aria-haspopup="listbox"
          aria-expanded={open}
        >
          <div className="sb-search__cat-content">
            <i className="fi fi-rr-folder" />
            <span>{current.label}</span>
          </div>
          <i className="fi fi-rr-angle-small-down" aria-hidden />
        </button>
        {open ? (
          <div
            className="sb-search__menu"
            role="listbox"
            onMouseDown={(e) => {
              e.preventDefault();
              e.stopPropagation();
            }}
          >
            {categories.map((opt) => (
              <div
                key={opt.value}
                className="sb-search__item"
                role="option"
                aria-selected={opt.value === category}
                onClick={() => {
                  onCategoryChange?.(opt.value);
                  setOpen(false);
                }}
              >
                {opt.label}
              </div>
            ))}
          </div>
        ) : null}

        <div className="sb-search__input">
          <i className="fi fi-rr-search" onClick={() => setActive(true)} />
          <div className="sb-search__content">
            {active || value ? (
              <input
                ref={ref}
                type="text"
                value={value}
                onChange={(e) => onChange?.(e.target.value)}
                onBlur={() => setActive(false)}
              />
            ) : (
              <div onClick={() => setActive(true)}>{placeholder}</div>
            )}
          </div>
          <button
            type="button"
            className="sb-search__mic"
            onClick={() => (listening ? stopSpeech() : startSpeech())}
            aria-pressed={listening}
            aria-label="Voice search"
          >
            <i className="fi fi-tr-circle-microphone" />
          </button>
        </div>
      </div>
    </Component>
  );
};
