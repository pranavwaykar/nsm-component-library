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

function resolveElementType(as, fallback) {
  if (!as) return fallback;
  if (typeof as === "string") return as.trim() ? as : fallback;
  return as;
}

export const TextInput = ({
  label,
  text,
  placeholder,
  error,
  helper,
  onChange,
  as = "label",
  showLabel = true,
  className,
  style,
  hidden,
  containerProps = {},
  inputProps = {},
  children,
  inputColor,
  inputBorder,
  inputBgColor,
  leftSection,
  rightSection,
  disabled = false,
  loading = false,
  size,
  shadow,
  ...rest
}) => {
  const Component = resolveElementType(as, "label");
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
    disabled ? "is-disabled" : "",
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
  const effectiveValue =
    text !== undefined ? String(text) : undefined;
  const sizeMap = {
    xs: { padding: "4px 8px", fontSize: "12px" },
    sm: { padding: "6px 10px", fontSize: "13px" },
    md: { padding: "8px 10px", fontSize: "14px" },
    lg: { padding: "10px 12px", fontSize: "16px" },
    xl: { padding: "12px 14px", fontSize: "18px" },
  };
  const shadowKey = shadow ? ({ none: "0", sm: "1", md: "3", lg: "5" }[String(shadow)] || null) : null;
  const inputInlineStyle = {
    ...(inputProps?.style || {}),
    ...(inputColor !== undefined ? { color: inputColor } : {}),
    ...(inputBorder !== undefined ? { borderColor: inputBorder } : {}),
    ...(inputBgColor !== undefined ? { backgroundColor: inputBgColor } : {}),
    ...(size && sizeMap[size] ? sizeMap[size] : {}),
    ...(shadowKey ? { boxShadow: `var(--sb-shadow-${shadowKey})` } : {}),
    ...(loading ? { paddingRight: "28px" } : {}),
  };
  return (
    <Component
      className={rootClass}
      style={mergedStyle}
      {...containerRest}
      {...rest}
    >
      {showLabel !== false && label ? <span className="sb-field__label">{label}</span> : null}
      <div className={`sb-input-wrap ${leftSection ? "has-left" : ""} ${rightSection ? "has-right" : ""}`.trim()}>
        {leftSection ? (
          <span className="sb-field__section sb-field__section--left" aria-hidden>
            {leftSection}
          </span>
        ) : null}
        <input
          className={`sb-input ${leftSection ? "has-left-section" : ""} ${rightSection ? "has-right-section" : ""}`.trim()}
          value={effectiveValue}
          placeholder={placeholder}
          onChange={(e) => onChange?.(e.target.value)}
          disabled={disabled || loading}
          style={inputInlineStyle}
          {...inputProps}
        />
        {rightSection ? (
          <span className="sb-field__section sb-field__section--right" aria-hidden>
            {rightSection}
          </span>
        ) : null}
        {loading ? <span className="sb-input-spinner" aria-hidden /> : null}
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

TextInput.propTypes = {
  label: PropTypes.string,
  showLabel: PropTypes.bool,
  text: PropTypes.oneOfType([PropTypes.string, PropTypes.number]),
  placeholder: PropTypes.string,
  error: PropTypes.string,
  helper: PropTypes.string,
  onChange: PropTypes.func,
  inputColor: PropTypes.string,
  inputBorder: PropTypes.string,
  inputBgColor: PropTypes.string,
  disabled: PropTypes.bool,
  loading: PropTypes.bool,
  size: PropTypes.oneOf(["xs","sm","md","lg","xl"]),
  shadow: PropTypes.oneOf(["none","sm","md","lg"]),
  leftSection: PropTypes.node,
  rightSection: PropTypes.node,
};

export const TextArea = ({
  label,
  text,
  placeholder,
  rows = 4,
  error,
  helper,
  onChange,
  as = "label",
  showLabel = true,
  className,
  style,
  hidden,
  containerProps = {},
  inputProps = {},
  children,
  inputColor,
  inputBorder,
  inputBgColor,
  leftSection,
  rightSection,
  disabled = false,
  loading = false,
  size,
  shadow,
  ...rest
}) => {
  const Component = resolveElementType(as, "label");
  const expanded = expandStyleProps(rest);
  const dimKeys = ["width","height","minWidth","maxWidth","minHeight","maxHeight"];
  const inputDims = {};
  const mergedStyle = {
    ...expanded,
    ...(style || {}),
    ...(containerProps.style || {}),
  };
  // Move dimension-related props to the input container instead of the outer wrapper
  dimKeys.forEach((k) => {
    if (mergedStyle[k] !== undefined) {
      inputDims[k] = mergedStyle[k];
      delete mergedStyle[k];
    }
  });
  if (hidden === true && mergedStyle.display === undefined)
    mergedStyle.display = "none";
  const rootClass = [
    `sb-field`,
    error ? "is-error" : "",
    disabled ? "is-disabled" : "",
    loading ? "is-loading" : "",
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
  const effectiveValue = text !== undefined ? String(text) : undefined;
  const sizeMap = {
    xs: { padding: "4px 8px", fontSize: "12px" },
    sm: { padding: "6px 10px", fontSize: "13px" },
    md: { padding: "8px 10px", fontSize: "14px" },
    lg: { padding: "10px 12px", fontSize: "16px" },
    xl: { padding: "12px 14px", fontSize: "18px" },
  };
  const shadowKey = shadow ? ({ none: "0", sm: "1", md: "3", lg: "5" }[String(shadow)] || null) : null;
  const textareaInlineStyle = {
    ...(inputProps?.style || {}),
    ...(inputColor !== undefined ? { color: inputColor } : {}),
    ...(inputBorder !== undefined ? { borderColor: inputBorder } : {}),
    ...(inputBgColor !== undefined ? { backgroundColor: inputBgColor } : {}),
    ...(size && sizeMap[size] ? sizeMap[size] : {}),
    ...(shadowKey ? { boxShadow: `var(--sb-shadow-${shadowKey})` } : {}),
    ...inputDims,
  };
  return (
    <Component
      className={rootClass}
      style={mergedStyle}
      {...containerRest}
      {...rest}
    >
      {showLabel !== false && label ? <span className="sb-field__label">{label}</span> : null}
      <div className={`sb-input-wrap ${leftSection ? "has-left" : ""} ${rightSection ? "has-right" : ""}`.trim()} style={inputDims}>
        {leftSection ? (
          <span className="sb-field__section sb-field__section--left" aria-hidden>
            {leftSection}
          </span>
        ) : null}
        <textarea
          className={`sb-input sb-input--area ${leftSection ? "has-left-section" : ""} ${rightSection ? "has-right-section" : ""}`.trim()}
          rows={rows}
          value={effectiveValue}
          placeholder={placeholder}
          onChange={(e) => onChange?.(e.target.value)}
          disabled={disabled || loading}
          style={textareaInlineStyle}
          {...inputProps}
        />
        {rightSection ? (
          <span className="sb-field__section sb-field__section--right" aria-hidden>
            {rightSection}
          </span>
        ) : null}
        {loading ? <span className="sb-input-spinner sb-input-spinner--center" aria-hidden /> : null}
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

TextArea.propTypes = TextInput.propTypes;

export const Select = ({
  label,
  options = [],
  onChange,
  multiple = false,
  placeholder,
  error,
  helper,
  caretIcon,
  as = "label",
  showLabel = true,
  className,
  style,
  hidden,
  containerProps = {},
  selectProps = {},
  children,
  inputColor,
  inputBorder,
  inputBgColor,
  size,
  shadow,
  disabled = false,
  loading = false,
  ...rest
}) => {
  const Component = resolveElementType(as, "label");
  const expanded = expandStyleProps(rest);
  const dimKeys = ["width","height","minWidth","maxWidth","minHeight","maxHeight"];
  const inputDims = {};
  const mergedStyle = {
    ...expanded,
    ...(style || {}),
    ...(containerProps.style || {}),
  };
  dimKeys.forEach((k) => {
    if (mergedStyle[k] !== undefined) {
      inputDims[k] = mergedStyle[k];
      delete mergedStyle[k];
    }
  });
  if (hidden === true && mergedStyle.display === undefined)
    mergedStyle.display = "none";
  const rootClass = [
    `sb-field`,
    error ? "is-error" : "",
    disabled ? "is-disabled" : "",
    loading ? "is-loading" : "",
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
  const sizeMap = {
    xs: { padding: "4px 28px 4px 8px", fontSize: "12px" },
    sm: { padding: "6px 28px 6px 10px", fontSize: "13px" },
    md: { padding: "8px 28px 8px 10px", fontSize: "14px" },
    lg: { padding: "10px 32px 10px 12px", fontSize: "16px" },
    xl: { padding: "12px 36px 12px 14px", fontSize: "18px" },
  };
  const shadowKey = shadow ? ({ none: "0", sm: "1", md: "3", lg: "5" }[String(shadow)] || null) : null;
  const [sel, setSel] = useState(multiple ? [] : "");
  return (
    <Component
      className={`${rootClass} sb-field--select`.trim()}
      style={mergedStyle}
      {...containerRest}
      {...rest}
    >
      {showLabel !== false && label ? <span className="sb-field__label">{label}</span> : null}
      <div
        className="sb-input-wrap"
        style={inputDims}
      >
        <select
          className={`sb-input ${caretIcon ? "has-right-section" : ""}`.trim()}
          multiple={multiple}
          value={sel}
          disabled={disabled}
          onChange={(e) => {
            if (multiple) {
              const v = Array.from(e.target.selectedOptions).map(
                (o) => o.value
              );
              setSel(v);
              onChange?.(v);
            } else {
              const v = e.target.value;
              setSel(v);
              onChange?.(v);
            }
          }}
          style={{
            ...(selectProps?.style || {}),
            ...(inputColor !== undefined ? { color: inputColor } : {}),
            ...(inputBorder !== undefined ? { borderColor: inputBorder } : {}),
            ...(inputBgColor !== undefined ? { backgroundColor: inputBgColor } : {}),
            ...(size && sizeMap[size] ? sizeMap[size] : {}),
            ...(shadowKey ? { boxShadow: `var(--sb-shadow-${shadowKey})` } : {}),
            ...inputDims,
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
        {caretIcon ? (
          <span className="sb-field__section sb-field__section--right" aria-hidden>
            {caretIcon}
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
  showLabel: PropTypes.bool,
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
  caretIcon: PropTypes.node,
  inputColor: PropTypes.string,
  inputBorder: PropTypes.string,
  inputBgColor: PropTypes.string,
  size: PropTypes.oneOf(["xs","sm","md","lg","xl"]),
  shadow: PropTypes.oneOf(["none","sm","md","lg"]),
  disabled: PropTypes.bool,
  loading: PropTypes.bool,
};

export const Checkbox = ({
  label,
  checked,
  onChange,
  error,
  helper,
  as = "label",
  showLabel = true,
  style,
  hidden,
  disabled = false,
  loading = false,
  rightSection,
  size,
  shadow,
  controlCheckboxSize,
  controlColor,
  ...rest
}) => {
  const Component = resolveElementType(as, "label");
  const merged = { ...expandStyleProps(rest), ...(style || {}) };
  if (hidden === true && merged.display === undefined) merged.display = "none";
  const sizeMap = {
    xs: { fontSize: "12px" },
    sm: { fontSize: "13px" },
    md: { fontSize: "14px" },
    lg: { fontSize: "16px" },
    xl: { fontSize: "18px" },
  };
  const shadowKey = shadow ? ({ none: "0", sm: "1", md: "3", lg: "5" }[String(shadow)] || null) : null;
  return (
    <Component
      className={`sb-check ${disabled ? "is-disabled" : ""} ${loading ? "is-loading" : ""}`.trim()}
      style={{ ...merged, ...(size && sizeMap[size] ? sizeMap[size] : {}) }}
      {...rest}
    >
      <input
        type="checkbox"
        checked={checked}
        onChange={(e) => onChange?.(e.target.checked)}
        disabled={disabled}
        style={{
          ...(shadowKey
            ? { boxShadow: `var(--sb-shadow-${shadowKey}), 0 6px 18px rgba(0,0,0,.10)` }
            : {}),
          ...(controlCheckboxSize ? { width: controlCheckboxSize, height: controlCheckboxSize } : {}),
          ...(controlColor ? { accentColor: controlColor } : {}),
        }}
      />
      {showLabel !== false && label ? <span>{label}</span> : null}
      {rightSection ? (
        <span className="sb-field__section sb-field__section--right" aria-hidden>
          {rightSection}
        </span>
      ) : null}
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
  showLabel: PropTypes.bool,
  checked: PropTypes.bool,
  onChange: PropTypes.func,
  disabled: PropTypes.bool,
  loading: PropTypes.bool,
  error: PropTypes.string,
  helper: PropTypes.string,
  rightSection: PropTypes.node,
  size: PropTypes.oneOf(["xs","sm","md","lg","xl"]),
  shadow: PropTypes.oneOf(["none","sm","md","lg"]),
  controlCheckboxSize: PropTypes.oneOfType([PropTypes.number, PropTypes.string]),
  controlColor: PropTypes.string,
};

export const Toggle = ({
  label,
  checked,
  onChange,
  error,
  helper,
  as = "label",
  showLabel = true,
  style,
  hidden,
  disabled = false,
  loading = false,
  rightSection,
  size,
  shadow,
  controlToggleSize,
  toggleOnColor,
  toggleOffColor,
  knobColor,
  ...rest
}) => {
  const Component = resolveElementType(as, "label");
  const merged = { ...expandStyleProps(rest), ...(style || {}) };
  if (hidden === true && merged.display === undefined) merged.display = "none";
  const sizeMap = {
    xs: { fontSize: "12px" },
    sm: { fontSize: "13px" },
    md: { fontSize: "14px" },
    lg: { fontSize: "16px" },
    xl: { fontSize: "18px" },
  };
  const shadowKey = shadow ? ({ none: "0", sm: "1", md: "3", lg: "5" }[String(shadow)] || null) : null;
  const cssControlSize =
    controlToggleSize !== undefined
      ? typeof controlToggleSize === "number"
        ? `${controlToggleSize}px`
        : String(controlToggleSize)
      : undefined;
  return (
    <Component
      className={`sb-toggle ${disabled ? "is-disabled" : ""} ${loading ? "is-loading" : ""}`.trim()}
      style={{
        ...merged,
        ...(size && sizeMap[size] ? sizeMap[size] : {}),
        ...(cssControlSize ? { ["--t-h"]: cssControlSize } : {}),
      }}
      {...rest}
    >
      <input
        type="checkbox"
        checked={checked}
        onChange={(e) => onChange?.(e.target.checked)}
        disabled={disabled}
      />
      <span
        className="sb-toggle__track"
        style={{
          ...(shadowKey
            ? { boxShadow: `var(--sb-shadow-${shadowKey}), 0 6px 18px rgba(0,0,0,.10)` }
            : {}),
          background: checked ? (toggleOnColor || "#111827") : (toggleOffColor || "#e5e7eb"),
        }}
      >
        <span
          className="sb-toggle__thumb"
          style={{
            ...(knobColor ? { background: knobColor } : {}),
          }}
        />
      </span>
      {showLabel !== false && label ? <span className="sb-toggle__label">{label}</span> : null}
      {rightSection ? (
        <span className="sb-field__section sb-field__section--right" aria-hidden>
          {rightSection}
        </span>
      ) : null}
      {isRenderable(helper) ? (
        <span className="sb-field__help">{helper}</span>
      ) : null}
      {isRenderable(error) ? (
        <span className="sb-field__error">{error}</span>
      ) : null}
    </Component>
  );
};

Toggle.propTypes = {
  ...Checkbox.propTypes,
  controlToggleSize: PropTypes.oneOfType([PropTypes.number, PropTypes.string]),
  toggleOnColor: PropTypes.string,
  toggleOffColor: PropTypes.string,
  knobColor: PropTypes.string,
};

export const RadioGroup = ({
  label,
  name,
  value,
  options = [],
  onChange,
  error,
  helper,
  as = "div",
  showLabel = true,
  style,
  hidden,
  disabled = false,
  loading = false,
  size,
  shadow,
  rightSection,
  controlRadioSize,
  radioInnerColor,
  radioOuterColor,
  ...rest
}) => {
  const Component = resolveElementType(as, "div");
  const merged = { ...expandStyleProps(rest), ...(style || {}) };
  if (hidden === true && merged.display === undefined) merged.display = "none";
  const sizeMap = {
    xs: { fontSize: "12px" },
    sm: { fontSize: "13px" },
    md: { fontSize: "14px" },
    lg: { fontSize: "16px" },
    xl: { fontSize: "18px" },
  };
  const shadowKey = shadow ? ({ none: "0", sm: "1", md: "3", lg: "5" }[String(shadow)] || null) : null;
  const cssRadioSize =
    controlRadioSize !== undefined
      ? typeof controlRadioSize === "number"
        ? `${controlRadioSize}px`
        : String(controlRadioSize)
      : undefined;
  return (
    <Component className={`sb-radio ${disabled ? "is-disabled" : ""} ${loading ? "is-loading" : ""}`.trim()} style={{ ...merged, ...(size && sizeMap[size] ? sizeMap[size] : {}) }} {...rest}>
      {showLabel !== false && label ? <span className="sb-field__label">{label}</span> : null}
      {options.map((opt) => (
        <label key={opt.value}>
          <input
            type="radio"
            name={name}
            value={opt.value}
            checked={value === opt.value}
            onChange={() => { if (disabled) return; onChange?.(opt.value); }}
            disabled={disabled}
            style={{
              ...(shadowKey ? { boxShadow: `var(--sb-shadow-${shadowKey})` } : {}),
              ...(cssRadioSize ? { ["--radio-size"]: cssRadioSize } : {}),
              ...(radioOuterColor ? { ["--radio-outer"]: radioOuterColor } : {}),
              ...(radioInnerColor ? { ["--radio-inner"]: radioInnerColor } : {}),
            }}
          />
          <span>{opt.label}</span>
        </label>
      ))}
      {rightSection ? (
        <span className="sb-field__section sb-field__section--right" aria-hidden>
          {rightSection}
        </span>
      ) : null}
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
  showLabel: PropTypes.bool,
  name: PropTypes.string,
  value: PropTypes.string,
  options: PropTypes.array,
  onChange: PropTypes.func,
  error: PropTypes.string,
  helper: PropTypes.string,
  disabled: PropTypes.bool,
  loading: PropTypes.bool,
  size: PropTypes.oneOf(["xs","sm","md","lg","xl"]),
  shadow: PropTypes.oneOf(["none","sm","md","lg"]),
  rightSection: PropTypes.node,
  controlRadioSize: PropTypes.oneOfType([PropTypes.number, PropTypes.string]),
  radioInnerColor: PropTypes.string,
  radioOuterColor: PropTypes.string,
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
  showLabel = true,
  style,
  hidden,
  inputBorder,
  inputBgColor,
  sliderColor,
  sliderThumbSize,
  size,
  shadow,
  disabled = false,
  loading = false,
  ...rest
}) => {
  const Component = resolveElementType(as, "label");
  const expanded = expandStyleProps(rest);
  const dimKeys = [
    "width","height","minWidth","maxWidth","minHeight","maxHeight",
    "margin","marginTop","marginRight","marginBottom","marginLeft",
    "padding","paddingTop","paddingRight","paddingBottom","paddingLeft"
  ];
  const inputDims = {};
  const merged = { ...expanded, ...(style || {}) };
  dimKeys.forEach((k) => {
    if (merged[k] !== undefined) {
      inputDims[k] = merged[k];
      delete merged[k];
    }
  });
  if (hidden === true && merged.display === undefined) merged.display = "none";
  const sizeMap = {
    xs: { track: "4px", thumb: "12px" },
    sm: { track: "5px", thumb: "14px" },
    md: { track: "6px", thumb: "16px" },
    lg: { track: "7px", thumb: "18px" },
    xl: { track: "8px", thumb: "20px" },
  };
  const shadowKey = shadow ? ({ none: "0", sm: "1", md: "3", lg: "5" }[String(shadow)] || null) : null;
  const percent =
    typeof value === "number" && typeof min === "number" && typeof max === "number" && max > min
      ? Math.min(100, Math.max(0, ((value - min) / (max - min)) * 100))
      : 0;
  return (
    <Component className={`sb-field ${disabled ? "is-disabled" : ""} ${loading ? "is-loading" : ""}`.trim()} style={merged} {...rest}>
      {showLabel !== false && label ? <span className="sb-field__label">{label}</span> : null}
      <input
        className="sb-range"
        type="range"
        min={min}
        max={max}
        step={step}
        value={value}
        onChange={(e) => onChange?.(Number(e.target.value))}
        disabled={disabled}
        style={{
          ...(rest?.styleForRange || {}),
          ...(inputBorder !== undefined ? { borderColor: inputBorder } : {}),
          ...(inputBgColor !== undefined ? { backgroundColor: inputBgColor } : {}),
          ...(size && sizeMap[size]
            ? { ["--range-h"]: sizeMap[size].track, ["--range-thumb-d"]: sizeMap[size].thumb }
            : {}),
          ...(sliderThumbSize !== undefined
            ? {
                ["--range-thumb-d"]:
                  typeof sliderThumbSize === "number"
                    ? `${sliderThumbSize}px`
                    : String(sliderThumbSize),
              }
            : {}),
          ...(shadowKey ? { ["--range-thumb-shadow"]: `var(--sb-shadow-${shadowKey})` } : {}),
          ...(sliderColor
            ? {
                // Proper two-color gradient with duplicated stops for crisp split
                background: `linear-gradient(to right, ${sliderColor} 0%, ${sliderColor} ${percent}%, #e5e7eb ${percent}%, #e5e7eb 100%)`,
                ["--range-slider-color"]: sliderColor,
              }
            : {}),
          ...inputDims,
        }}
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
  showLabel: PropTypes.bool,
  value: PropTypes.number,
  min: PropTypes.number,
  max: PropTypes.number,
  step: PropTypes.number,
  onChange: PropTypes.func,
  error: PropTypes.string,
  helper: PropTypes.string,
  inputBorder: PropTypes.string,
  inputBgColor: PropTypes.string,
  sliderColor: PropTypes.string,
  sliderThumbSize: PropTypes.oneOfType([PropTypes.number, PropTypes.string]),
  size: PropTypes.oneOf(["xs","sm","md","lg","xl"]),
  shadow: PropTypes.oneOf(["none","sm","md","lg"]),
  disabled: PropTypes.bool,
  loading: PropTypes.bool,
};

export const FileInput = ({
  label,
  onFiles,
  accept,
  multiple = false,
  as = "div",
  showLabel = true,
  showHelper = true,
  showPlaceholder = true,
  placeholder = "Choose file",
  helper,
  error,
  style,
  hidden,
  inputBgColor,
  inputBorder,
  size,
  shadow,
  fileRemovable = true,
  disabled = false,
  loading = false,
  ...rest
}) => {
  const ref = useRef(null);
  const [selectedFiles, setSelectedFiles] = useState([]);
  const [hover, setHover] = useState(false);
  function onDrop(e) {
    e.preventDefault();
    setHover(false);
    if (e.dataTransfer?.files?.length) {
      const f = Array.from(e.dataTransfer.files);
      setSelectedFiles(f);
      onFiles?.(f);
    }
  }
  const Component = resolveElementType(as, "div");
  const merged = { ...expandStyleProps(rest), ...(style || {}) };
  if (hidden === true && merged.display === undefined) merged.display = "none";
  const inputId = rest?.id;
  const sizeMap = {
    xs: { fontSize: "12px" },
    sm: { fontSize: "13px" },
    md: { fontSize: "14px" },
    lg: { fontSize: "16px" },
    xl: { fontSize: "18px" },
  };
  const padMap = {
    xs: "4px 8px",
    sm: "5px 9px",
    md: "6px 10px",
    lg: "8px 12px",
    xl: "10px 14px",
  };
  const shadowKey = shadow ? ({ none: "0", sm: "1", md: "3", lg: "5" }[String(shadow)] || null) : null;
  return (
    <Component
      className={`sb-file ${hover ? "is-hover" : ""} ${disabled ? "is-disabled" : ""} ${loading ? "is-loading" : ""} ${error ? "is-error" : ""}`.trim()}
      style={{ ...merged, ...(size && sizeMap[size] ? sizeMap[size] : {}) }}
      onDragOver={(e) => {
        e.preventDefault();
        setHover(true);
      }}
      onDragLeave={() => setHover(false)}
      onDrop={onDrop}
      {...rest}
    >
      {showLabel !== false && label ? (
        inputId ? (
          <label className="sb-file__label" htmlFor={inputId}>
            {label}
          </label>
        ) : (
          <div className="sb-file__label" onClick={() => ref.current?.click()}>{label}</div>
        )
      ) : null}
      {showPlaceholder !== false ? (
        <button
          className="sb-file__btn"
          type="button"
          onClick={() => ref.current?.click()}
          disabled={disabled || loading}
          style={{
            ...(inputBgColor !== undefined ? { backgroundColor: inputBgColor } : {}),
            ...(inputBorder !== undefined ? { borderColor: inputBorder } : {}),
            ...(shadowKey ? { boxShadow: `var(--sb-shadow-${shadowKey})` } : {}),
            ...(size && padMap[size] ? { padding: padMap[size] } : {}),
          }}
        >
          {placeholder}
        </button>
      ) : null}
      <input
        ref={ref}
        type="file"
        id={inputId}
        accept={accept}
        multiple={multiple}
        onChange={(e) => {
          const f = Array.from(e.target.files || []);
          setSelectedFiles(f);
          onFiles?.(f);
        }}
        hidden
        disabled={disabled || loading}
      />
      {showHelper !== false ? (
        <div className="sb-file__hint">{helper || "Drag & drop files here"}</div>
      ) : null}
      {isRenderable(error) ? <span className="sb-field__error">{error}</span> : null}
      {selectedFiles.length ? (
        <ul className="sb-file__list">
          {selectedFiles.map((f, i) => (
            <li key={`${f.name}-${i}`}>
              {f.name}
              {fileRemovable ? (
                <button
                  type="button"
                  className="sb-file__remove"
                  aria-label={`Remove ${f.name}`}
                  onClick={() => {
                    const next = selectedFiles.filter((_, idx) => idx !== i);
                    setSelectedFiles(next);
                    onFiles?.(next);
                    if (next.length === 0 && ref.current) {
                      try { ref.current.value = ""; } catch (_) {}
                    }
                  }}
                  disabled={disabled || loading}
                >
                  ×
                </button>
              ) : null}
            </li>
          ))}
        </ul>
      ) : null}
    </Component>
  );
};

FileInput.propTypes = {
  label: PropTypes.string,
  showLabel: PropTypes.bool,
  showHelper: PropTypes.bool,
  showPlaceholder: PropTypes.bool,
  placeholder: PropTypes.string,
  helper: PropTypes.string,
  error: PropTypes.string,
  inputBorder: PropTypes.string,
  size: PropTypes.oneOf(["xs","sm","md","lg","xl"]),
  shadow: PropTypes.oneOf(["none","sm","md","lg"]),
  fileRemovable: PropTypes.bool,
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
  showLabel = true,
  style,
  hidden,
  inputBorder,
  inputBgColor,
  size,
  shadow,
  disabled = false,
  loading = false,
  ...rest
}) => {
  const Component = resolveElementType(as, "label");
  const expanded = expandStyleProps(rest);
  const dimKeys = ["width","height","minWidth","maxWidth","minHeight","maxHeight"];
  const inputDims = {};
  const merged = { ...expanded, ...(style || {}) };
  dimKeys.forEach((k) => {
    if (merged[k] !== undefined) {
      inputDims[k] = merged[k];
      delete merged[k];
    }
  });
  if (hidden === true && merged.display === undefined) merged.display = "none";
  const sizeMap = {
    xs: { padding: "2px 4px", fontSize: "12px" },
    sm: { padding: "3px 6px", fontSize: "13px" },
    md: { padding: "3px 6px", fontSize: "14px" },
    lg: { padding: "4px 8px", fontSize: "16px" },
    xl: { padding: "5px 10px", fontSize: "18px" },
  };
  const shadowKey = shadow ? ({ none: "0", sm: "1", md: "3", lg: "5" }[String(shadow)] || null) : null;
  return (
    <Component className={`sb-field ${disabled ? "is-disabled" : ""} ${loading ? "is-loading" : ""}`.trim()} style={merged} {...rest}>
      {showLabel !== false && label ? <span className="sb-field__label">{label}</span> : null}
      <input
        className="sb-color"
        type="color"
        value={value}
        onChange={(e) => onChange?.(e.target.value)}
        disabled={disabled}
        style={{
          ...(rest?.styleForColor || {}),
          ...(inputBorder !== undefined ? { borderColor: inputBorder } : {}),
          ...(inputBgColor !== undefined ? { backgroundColor: inputBgColor } : {}),
          ...(size && sizeMap[size] ? sizeMap[size] : {}),
          ...(shadowKey ? { boxShadow: `var(--sb-shadow-${shadowKey})` } : {}),
          ...inputDims,
        }}
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
  showLabel: PropTypes.bool,
  value: PropTypes.string,
  onChange: PropTypes.func,
  error: PropTypes.string,
  helper: PropTypes.string,
  inputBorder: PropTypes.string,
  inputBgColor: PropTypes.string,
  size: PropTypes.oneOf(["xs","sm","md","lg","xl"]),
  shadow: PropTypes.oneOf(["none","sm","md","lg"]),
  disabled: PropTypes.bool,
  loading: PropTypes.bool,
};

export const DateInput = ({
  label,
  value,
  text,
  onChange,
  placeholder = "",
  error,
  helper,
  as = "label",
  showLabel = true,
  style,
  hidden,
  inputColor,
  inputBorder,
  inputBgColor,
  disabled = false,
  loading = false,
  ...rest
}) => {
  const Component = resolveElementType(as, "label");
  const merged = { ...expandStyleProps(rest), ...(style || {}) };
  if (hidden === true && merged.display === undefined) merged.display = "none";
  const effectiveValue =
    value !== undefined ? value : text !== undefined ? String(text) : undefined;
  return (
    <Component className={`sb-field ${disabled ? "is-disabled" : ""} ${loading ? "is-loading" : ""}`.trim()} style={merged} {...rest}>
      {showLabel !== false && label ? <span className="sb-field__label">{label}</span> : null}
      <input
        className="sb-ms-trigger"
        type="date"
        value={effectiveValue}
        placeholder={placeholder}
        onChange={(e) => onChange?.(e.target.value)}
        disabled={disabled}
        style={{
          ...(rest?.styleForDate || {}),
          ...(inputColor !== undefined ? { color: inputColor } : {}),
          ...(inputBorder !== undefined ? { borderColor: inputBorder } : {}),
          ...(inputBgColor !== undefined ? { backgroundColor: inputBgColor } : {}),
        }}
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
  showLabel: PropTypes.bool,
  value: PropTypes.string,
  text: PropTypes.oneOfType([PropTypes.string, PropTypes.number]),
  onChange: PropTypes.func,
  placeholder: PropTypes.string,
  error: PropTypes.string,
  helper: PropTypes.string,
  inputColor: PropTypes.string,
  inputBorder: PropTypes.string,
  inputBgColor: PropTypes.string,
  disabled: PropTypes.bool,
  loading: PropTypes.bool,
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
  showLabel = true,
  className,
  style,
  hidden,
  inputBorder,
  inputBgColor,
  menuBgColor,
  menuTextColor,
  menuBorderColor,
  leftOptionSectionIcon,
  rightOptionSectionIcon,
  leftSection,
  rightSection,
  // caret props removed
  chipRadius,
  chipBgColor,
  chipTextColor,
  chipBorderColor,
  chipRemovable = true,
  loading = false,
  size,
  shadow,
  searchable = false,
  ...rest
}) => {
  const rootRef = useRef(null);
  const [open, setOpen] = useState(false);
  const [query, setQuery] = useState("");

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
  const visibleOptions = (() => {
    const selectedSet = new Set(Array.isArray(value) ? value : []);
    let base = options;
    if (searchable && query) {
      const q = String(query).toLowerCase();
      base = base.filter(
        (opt) =>
          opt.label?.toLowerCase().includes(q) ||
          String(opt.value).toLowerCase().includes(q)
      );
    }
    // hide already selected options from dropdown list
    return base.filter((opt) => !selectedSet.has(opt.value));
  })();

  const Component = resolveElementType(as, "label");
  const expanded = expandStyleProps(rest);
  const dimKeys = ["width","height","minWidth","maxWidth","minHeight","maxHeight"];
  const triggerDims = {};
  const merged = { ...expanded, ...(style || {}) };
  dimKeys.forEach((k) => {
    if (merged[k] !== undefined) {
      triggerDims[k] = merged[k];
      delete merged[k];
    }
  });
  if (hidden === true && merged.display === undefined) merged.display = "none";
  const sizeMap = {
    xs: { padding: "4px 28px 4px 8px", fontSize: "12px" },
    sm: { padding: "6px 28px 6px 10px", fontSize: "13px" },
    md: { padding: "8px 28px 8px 10px", fontSize: "14px" },
    lg: { padding: "10px 32px 10px 12px", fontSize: "16px" },
    xl: { padding: "12px 36px 12px 14px", fontSize: "18px" },
  };
  const shadowKey = shadow ? ({ none: "0", sm: "1", md: "3", lg: "5" }[String(shadow)] || null) : null;
  return (
    <Component
      ref={rootRef}
      className={`sb-field ${error ? "is-error" : ""} ${disabled ? "is-disabled" : ""} ${loading ? "is-loading" : ""} ${className || ""}`.trim()}
      style={merged}
      {...rest}
    >
      {showLabel !== false && label ? <span className="sb-field__label">{label}</span> : null}
      <div className={`sb-ms ${disabled ? "is-disabled" : ""}`.trim()}>
        <button
          type="button"
          className={`sb-ms-trigger ${leftSection ? "has-left" : ""} ${rightSection ? "has-right" : ""}`.trim()}
          onClick={() => setOpen((o) => !o)}
          disabled={disabled}
          aria-haspopup="listbox"
          aria-expanded={open}
          style={{
            ...(rest?.styleForTrigger || {}),
            ...(inputBorder !== undefined ? { borderColor: inputBorder } : {}),
            ...(inputBgColor !== undefined ? { backgroundColor: inputBgColor } : {}),
            ...(size && sizeMap[size] ? sizeMap[size] : {}),
            ...(shadowKey ? { boxShadow: `var(--sb-shadow-${shadowKey})` } : {}),
            ...triggerDims,
          }}
        >
          {leftSection ? (
            <span className="sb-field__section sb-field__section--left" aria-hidden>
              {leftSection}
            </span>
          ) : null}
          {selectedOptions.length === 0 ? (
            <span className="sb-ms-placeholder">{placeholder}</span>
          ) : (
            selectedOptions.map((opt) => (
              <span
                key={opt.value}
                className="sb-ms-chip"
                style={{
                  ...(chipBgColor !== undefined ? { background: chipBgColor } : {}),
                  ...(chipTextColor !== undefined ? { color: chipTextColor } : {}),
                  ...(chipBorderColor !== undefined ? { border: `1px solid ${chipBorderColor}` } : {}),
                  ...(chipRadius !== undefined
                    ? {
                        borderRadius:
                          typeof chipRadius === "string" &&
                          new Set(["none", "sm", "md", "lg", "pill", "full"]).has(
                            String(chipRadius)
                          )
                            ? `var(--sb-radius-${chipRadius})`
                            : chipRadius,
                      }
                    : {}),
                }}
              >
                <span className="sb-ms-chip__label">{opt.label}</span>
                {chipRemovable ? (
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
                ) : null}
              </span>
            ))
          )}
          {rightSection ? (
            <span className="sb-field__section sb-field__section--right" aria-hidden>
              {rightSection}
            </span>
          ) : null}
          <span className="sb-ms-caret" style={{ right: rightSection ? 34 : 10 }} aria-hidden>▾</span>
        </button>

        {open ? (
          <div
            className="sb-ms-menu"
            role="listbox"
            aria-multiselectable="true"
            style={{
              ...(menuBgColor !== undefined ? { background: menuBgColor } : {}),
              ...(menuTextColor !== undefined ? { color: menuTextColor } : {}),
              ...(menuBorderColor !== undefined ? { borderColor: menuBorderColor } : {}),
            }}
            onMouseDown={(e) => {
              e.preventDefault();
              e.stopPropagation();
            }}
          >
            {searchable ? (
              <div style={{ padding: 6 }}>
                <input
                  type="text"
                  value={query}
                  onChange={(e) => setQuery(e.target.value)}
                  placeholder="Search…"
                  style={{
                    width: "94%",
                    border: "1px solid #e5e7eb",
                    borderRadius: 6,
                    padding: "6px 8px",
                    outline: 0,
                  }}
                  onMouseDown={(e) => e.stopPropagation()}
                />
              </div>
            ) : null}
            {visibleOptions.map((opt) => (
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
                {leftOptionSectionIcon ? (
                  <span
                    className="sb-field__section sb-field__section--left"
                    aria-hidden
                  >
                    {typeof leftOptionSectionIcon === "function"
                      ? leftOptionSectionIcon(opt)
                      : leftOptionSectionIcon}
                  </span>
                ) : null}
                <span>{opt.label}</span>
                {rightOptionSectionIcon ? (
                  <span
                    className="sb-field__section sb-field__section--right"
                    aria-hidden
                  >
                    {typeof rightOptionSectionIcon === "function"
                      ? rightOptionSectionIcon(opt)
                      : rightOptionSectionIcon}
                  </span>
                ) : null}
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
  showLabel = true,
  className,
  style,
  hidden,
  inputColor,
  inputBorder,
  inputBgColor,
  leftSection,
  rightSection,
  menuBgColor,
  menuTextColor,
  menuBorderColor,
  leftOptionSectionIcon,
  rightOptionSectionIcon,
  size,
  shadow,
  loading = false,
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

  const Component = resolveElementType(as, "label");
  const expanded = expandStyleProps(rest);
  const dimKeys = ["width","height","minWidth","maxWidth","minHeight","maxHeight"];
  const triggerDims = {};
  const merged = { ...expanded, ...(style || {}) };
  dimKeys.forEach((k) => {
    if (merged[k] !== undefined) {
      triggerDims[k] = merged[k];
      delete merged[k];
    }
  });
  if (hidden === true && merged.display === undefined) merged.display = "none";
  const sizeMap = {
    xs: { padding: "4px 28px 4px 8px", fontSize: "12px" },
    sm: { padding: "6px 28px 6px 10px", fontSize: "13px" },
    md: { padding: "8px 28px 8px 10px", fontSize: "14px" },
    lg: { padding: "10px 32px 10px 12px", fontSize: "16px" },
    xl: { padding: "12px 36px 12px 14px", fontSize: "18px" },
  };
  const shadowKey = shadow ? ({ none: "0", sm: "1", md: "3", lg: "5" }[String(shadow)] || null) : null;
  return (
    <Component
      ref={rootRef}
      className={`sb-field ${error ? "is-error" : ""} ${disabled ? "is-disabled" : ""} ${loading ? "is-loading" : ""} ${className || ""}`.trim()}
      style={merged}
      {...rest}
    >
      {showLabel !== false && label ? <span className="sb-field__label">{label}</span> : null}
      <div className={`sb-ms ${disabled ? "is-disabled" : ""}`.trim()}>
        <button
          type="button"
          className={`sb-ms-trigger ${leftSection ? "has-left" : ""} ${rightSection ? "has-right" : ""}`.trim()}
          onClick={() => setOpen((o) => !o)}
          disabled={disabled}
          aria-haspopup="listbox"
          aria-expanded={open}
          style={{
            ...(rest?.styleForTrigger || {}),
            ...(inputColor !== undefined ? { color: inputColor } : {}),
            ...(inputBorder !== undefined ? { borderColor: inputBorder } : {}),
            ...(inputBgColor !== undefined ? { backgroundColor: inputBgColor } : {}),
            ...(size && sizeMap[size] ? sizeMap[size] : {}),
            ...(shadowKey ? { boxShadow: `var(--sb-shadow-${shadowKey})` } : {}),
            ...triggerDims,
          }}
        >
          {leftSection ? (
            <span className="sb-field__section sb-field__section--left" aria-hidden>
              {leftSection}
            </span>
          ) : null}
          {selected ? (
            <span>{selected.label}</span>
          ) : (
            <span className="sb-ms-placeholder">{placeholder}</span>
          )}
          {rightSection ? (
            <span className="sb-field__section sb-field__section--right" aria-hidden>
              {rightSection}
            </span>
          ) : null}
          <span className="sb-ms-caret" style={{ right: rightSection ? 34 : 10 }} aria-hidden>▾</span>
        </button>

        {open ? (
          <div
            className="sb-ms-menu"
            role="listbox"
            aria-multiselectable="false"
            style={{
              ...(menuBgColor !== undefined ? { background: menuBgColor } : {}),
              ...(menuTextColor !== undefined ? { color: menuTextColor } : {}),
              ...(menuBorderColor !== undefined ? { borderColor: menuBorderColor } : {}),
            }}
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
                {leftOptionSectionIcon ? (
                  <span aria-hidden className="sb-field__section sb-field__section--left">
                    {typeof leftOptionSectionIcon === "function" ? leftOptionSectionIcon(opt) : leftOptionSectionIcon}
                  </span>
                ) : null}
                <span>{opt.label}</span>
                {rightOptionSectionIcon ? (
                  <span aria-hidden className="sb-field__section sb-field__section--right">
                    {typeof rightOptionSectionIcon === "function" ? rightOptionSectionIcon(opt) : rightOptionSectionIcon}
                  </span>
                ) : null}
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
  showLabel: PropTypes.bool,
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
  inputColor: PropTypes.string,
  inputBorder: PropTypes.string,
  inputBgColor: PropTypes.string,
  menuBgColor: PropTypes.string,
  menuTextColor: PropTypes.string,
  menuBorderColor: PropTypes.string,
  leftOptionSectionIcon: PropTypes.oneOfType([PropTypes.node, PropTypes.func]),
  rightOptionSectionIcon: PropTypes.oneOfType([PropTypes.node, PropTypes.func]),
  size: PropTypes.oneOf(["xs","sm","md","lg","xl"]),
  shadow: PropTypes.oneOf(["none","sm","md","lg"]),
  leftSection: PropTypes.node,
  rightSection: PropTypes.node,
  loading: PropTypes.bool,
};

function toStartOfMonth(d) {
  return new Date(d.getFullYear(), d.getMonth(), 1);
}

function addMonths(d, delta) {
  return new Date(d.getFullYear(), d.getMonth() + delta, 1);
}

function addDays(d, delta) {
  const x = new Date(d);
  x.setDate(x.getDate() + delta);
  return x;
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
  loading = false,
  triggerBgColor,
  error,
  helper,
  closeOnSelect = true,
  granularity = "day", // 'day' | 'month'
  as = "label",
  showLabel = true,
  style,
  hidden,
  menuBgColor,
  menuTextColor,
  menuBorderColor,
  placeholderColor,
  // fine grained menu colors
  menuTitleColor,
  menuDowColor,
  menuDayColor,
  // presets and arrows
  presetBgColor,
  presetButtonBgColor,
  presetButtonTextColor,
  prevArrowColor,
  nextArrowColor,
  // dropdown sizing/spacing
  menuW,
  menuH,
  menuMinW,
  menuMaxW,
  menuMinH,
  menuMaxH,
  menuPadding,
  menuMargin,
  menuPlacement = "bottom-left",
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

  const Component = resolveElementType(as, "label");
  const expanded = expandStyleProps(rest);
  const merged = { ...expanded, ...(style || {}) };
  if (hidden === true && merged.display === undefined) merged.display = "none";
  // Move padding to trigger; keep margins on wrapper
  const triggerStyle = {};
  ["padding","paddingTop","paddingRight","paddingBottom","paddingLeft",
   "width","minWidth","maxWidth","height","minHeight","maxHeight"].forEach((k) => {
    if (merged[k] !== undefined) {
      triggerStyle[k] = merged[k];
      delete merged[k];
    }
  });

  function shiftMonth(delta) {
    if (disabled || granularity !== "month") return;
    const base = startDate || new Date();
    const nextStart = new Date(base.getFullYear(), base.getMonth() + delta, 1);
    const nextEnd = new Date(nextStart.getFullYear(), nextStart.getMonth() + 1, 0);
    onChange?.({ start: toIso(nextStart), end: toIso(nextEnd) });
    setYearView(nextStart.getFullYear());
  }

  function shiftDay(delta) {
    if (disabled || granularity !== "day") return;
    if (startDate && endDate) {
      const ns = addDays(startDate, delta);
      const ne = addDays(endDate, delta);
      onChange?.({ start: toIso(ns), end: toIso(ne) });
    } else if (startDate && !endDate) {
      const ns = addDays(startDate, delta);
      onChange?.({ start: toIso(ns), end: "" });
    } else if (!startDate && endDate) {
      const ne = addDays(endDate, delta);
      onChange?.({ start: "", end: toIso(ne) });
    } else {
      const today = addDays(new Date(), delta);
      onChange?.({ start: toIso(today), end: "" });
    }
  }

  return (
    <Component
      ref={rootRef}
      className={`sb-field ${error ? "is-error" : ""} ${disabled ? "is-disabled" : ""} ${loading ? "is-loading" : ""}`.trim()}
      style={merged}
      {...rest}
    >
      {showLabel !== false && label ? <span className="sb-field__label">{label}</span> : null}
      <div className={`sb-dr ${disabled ? "is-disabled" : ""}`.trim()}>
        <div
          className="sb-ms-trigger sb-dr-trigger"
          aria-haspopup="dialog"
          aria-expanded={open}
          onClick={() => setOpen((o) => !o)}
          style={{
            ...(triggerBgColor !== undefined ? { backgroundColor: triggerBgColor } : {}),
            ...triggerStyle,
          }}
        >
          <button
            type="button"
            className="sb-dr-inline sb-dr-prev"
            aria-label="Previous month"
            onClick={(e) => {
              e.preventDefault();
              e.stopPropagation();
              if (granularity === "month") shiftMonth(-1);
              else shiftDay(-1);
            }}
            disabled={disabled}
            style={{ ...(prevArrowColor ? { color: prevArrowColor } : {}) }}
          >
            <i className="fi fi-rr-angle-small-left" />
          </button>
          <button
            type="button"
            className="sb-dr-label"
            onClick={(e) => { e.preventDefault(); e.stopPropagation(); setOpen((o) => !o); }}
            disabled={disabled}
          >
            {display ? (
              <span>{display}</span>
            ) : (
              <span className="sb-ms-placeholder" style={{ ...(placeholderColor ? { color: placeholderColor } : {}) }}>{placeholder}</span>
            )}
          </button>
          <button
            type="button"
            className="sb-dr-inline sb-dr-next"
            aria-label="Next month"
            onClick={(e) => {
              e.preventDefault();
              e.stopPropagation();
              if (granularity === "month") shiftMonth(1);
              else shiftDay(1);
            }}
            disabled={disabled}
            style={{ ...(nextArrowColor ? { color: nextArrowColor } : {}) }}
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
            style={{
              ...(menuBgColor !== undefined ? { background: menuBgColor } : {}),
              ...(menuTextColor !== undefined ? { color: menuTextColor } : {}),
              ...(menuBorderColor !== undefined ? { borderColor: menuBorderColor } : {}),
              ...(menuBgColor !== undefined ? { ["--dr-menu-bg"]: menuBgColor } : {}),
              ...(menuTextColor !== undefined ? { ["--dr-menu-text"]: menuTextColor } : {}),
              ...(menuBorderColor !== undefined ? { ["--dr-menu-border"]: menuBorderColor } : {}),
              ...(menuTitleColor !== undefined ? { ["--dr-title-color"]: menuTitleColor } : {}),
              ...(menuDowColor !== undefined ? { ["--dr-dow-color"]: menuDowColor } : {}),
              ...(menuDayColor !== undefined ? { ["--dr-day-color"]: menuDayColor } : {}),
              ...(presetBgColor !== undefined ? { ["--dr-preset-bg"]: presetBgColor } : {}),
              ...(presetButtonBgColor !== undefined ? { ["--dr-preset-btn-bg"]: presetButtonBgColor } : {}),
              ...(presetButtonTextColor !== undefined ? { ["--dr-preset-btn-text"]: presetButtonTextColor } : {}),
              ...(prevArrowColor !== undefined ? { ["--dr-prev-color"]: prevArrowColor } : {}),
              ...(nextArrowColor !== undefined ? { ["--dr-next-color"]: nextArrowColor } : {}),
              ...(menuW ? { width: menuW } : {}),
              ...(menuH ? { height: menuH } : {}),
              ...(menuMinW ? { minWidth: menuMinW } : {}),
              ...(menuMaxW ? { maxWidth: menuMaxW } : {}),
              ...(menuMinH ? { minHeight: menuMinH } : {}),
              ...(menuMaxH ? { maxHeight: menuMaxH } : {}),
              ...(menuPadding ? { padding: menuPadding } : {}),
              ...(menuMargin ? { margin: menuMargin } : {}),
              ...(menuPlacement === "bottom-left" ? { top: "calc(100% + 4px)", bottom: "auto", left: 0, right: "auto" } : {}),
              ...(menuPlacement === "bottom-right" ? { top: "calc(100% + 4px)", bottom: "auto", left: "auto", right: 0 } : {}),
              ...(menuPlacement === "top-left" ? { top: "auto", bottom: "calc(100% + 4px)", left: 0, right: "auto" } : {}),
              ...(menuPlacement === "top-right" ? { top: "auto", bottom: "calc(100% + 4px)", left: "auto", right: 0 } : {}),
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
  showLabel: PropTypes.bool,
  value: PropTypes.shape({ start: PropTypes.string, end: PropTypes.string }),
  placeholder: PropTypes.string,
  onChange: PropTypes.func,
  disabled: PropTypes.bool,
  loading: PropTypes.bool,
  triggerBgColor: PropTypes.string,
  menuBgColor: PropTypes.string,
  menuTextColor: PropTypes.string,
  menuBorderColor: PropTypes.string,
  placeholderColor: PropTypes.string,
  menuTitleColor: PropTypes.string,
  menuDowColor: PropTypes.string,
  menuDayColor: PropTypes.string,
  presetBgColor: PropTypes.string,
  presetButtonBgColor: PropTypes.string,
  presetButtonTextColor: PropTypes.string,
  prevArrowColor: PropTypes.string,
  nextArrowColor: PropTypes.string,
  menuW: PropTypes.string,
  menuH: PropTypes.string,
  menuMinW: PropTypes.string,
  menuMaxW: PropTypes.string,
  menuMinH: PropTypes.string,
  menuMaxH: PropTypes.string,
  menuPadding: PropTypes.string,
  menuMargin: PropTypes.string,
  menuPlacement: PropTypes.oneOf(["bottom-left","bottom-right","top-left","top-right"]),
  error: PropTypes.string,
  helper: PropTypes.string,
  closeOnSelect: PropTypes.bool,
};

export const SearchInput = ({
  label,
  value = "",
  text,
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
  showLabel = true,
  style,
  hidden,
  inputTextColor,
  inputColor, /* backward compat -> inputTextColor */
  inputBorder,
  inputBgColor,
  placeholderColor,
  categoryBgColor,
  categoryTextColor,
  categoryIconColor,
  categoryChevronColor,
  searchIcon,
  micIcon,
  categoryChevronIcon,
  menuBgColor,
  menuTextColor,
  menuBorderColor,
  menuW,
  menuH,
  helper,
  error,
  disabled = false,
  loading = false,
  ...rest
}) => {
  const Component = resolveElementType(as, "div");
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
  const effectiveValue =
    value !== undefined && value !== null
      ? value
      : text !== undefined
      ? String(text)
      : "";

  const [listening, setListening] = useState(false);
  const recogRef = useRef(null);
  function startSpeech() {
    try {
      const Recognition =
        window.SpeechRecognition || window.webkitSpeechRecognition;
      if (!Recognition) {
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
      className={`sb-search ${disabled ? "is-disabled" : ""} ${loading ? "is-loading" : ""}`.trim()}
      style={merged}
      {...rest}
    >
      {showLabel !== false && label ? <span className="sb-field__label">{label}</span> : null}
      <div className="sb-search__inset" style={{ ...(inputBorder !== undefined ? { border: inputBorder } : {}), ...(inputBgColor !== undefined ? { backgroundColor: inputBgColor } : {}) }}>
        <button
          type="button"
          className={`sb-search__cat ${open ? "is-open" : ""}`}
          onClick={() => setOpen((o) => !o)}
          disabled={disabled}
          aria-haspopup="listbox"
          aria-expanded={open}
          style={{ ...(categoryBgColor !== undefined ? { background: categoryBgColor } : {}), ...(categoryTextColor !== undefined ? { color: categoryTextColor } : {}) }}
        >
          <div className="sb-search__cat-content">
            {searchIcon === undefined ? <i className="fi fi-rr-folder" style={{ ...(categoryIconColor ? { color: categoryIconColor } : {}) }} /> : searchIcon}
            <span>{current.label}</span>
          </div>
          {categoryChevronIcon !== undefined ? categoryChevronIcon : <i className="fi fi-rr-angle-small-down" aria-hidden style={{ ...(categoryChevronColor ? { color: categoryChevronColor } : {}) }} />}
        </button>
        {open ? (
          <div
            className="sb-search__menu"
            role="listbox"
            style={{ ...(menuBgColor ? { background: menuBgColor } : {}), ...(menuTextColor ? { color: menuTextColor } : {}), ...(menuBorderColor ? { borderColor: menuBorderColor } : {}), ...(menuW ? { width: menuW } : {}), ...(menuH ? { height: menuH, overflow: "auto" } : {}) }}
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
          {searchIcon !== undefined ? <span onClick={() => setActive(true)}>{searchIcon}</span> : <i className="fi fi-rr-search" onClick={() => setActive(true)} />}
          <div className="sb-search__content">
            {active || value ? (
              <input
                ref={ref}
                type="text"
                value={effectiveValue}
                onChange={(e) => onChange?.(e.target.value)}
                disabled={disabled}
                style={{ ...(inputTextColor !== undefined ? { color: inputTextColor } : {}), ...(inputTextColor === undefined && inputColor !== undefined ? { color: inputColor } : {}) }}
                onBlur={() => setActive(false)}
                placeholder={placeholder}
              />
            ) : (
              <div onClick={() => setActive(true)} style={{ ...(placeholderColor ? { color: placeholderColor } : {}) }}>{placeholder}</div>
            )}
          </div>
          <button
            type="button"
            className="sb-search__mic"
            onClick={() => (listening ? stopSpeech() : startSpeech())}
            disabled={disabled}
            aria-pressed={listening}
            aria-label="Voice search"
          >
            {micIcon !== undefined ? micIcon : <i className="fi fi-tr-circle-microphone" />}
          </button>
        </div>
      </div>
      {isRenderable(helper) ? <span className="sb-field__help">{helper}</span> : null}
      {isRenderable(error) ? <span className="sb-field__error">{error}</span> : null}
    </Component>
  );
};

SearchInput.propTypes = {
  label: PropTypes.string,
  showLabel: PropTypes.bool,
  value: PropTypes.string,
  onChange: PropTypes.func,
  placeholder: PropTypes.string,
  categories: PropTypes.array,
  category: PropTypes.string,
  onCategoryChange: PropTypes.func,
  as: PropTypes.string,
  style: PropTypes.object,
  hidden: PropTypes.bool,
  inputTextColor: PropTypes.string,
  inputBorder: PropTypes.string,
  inputBgColor: PropTypes.string,
  placeholderColor: PropTypes.string,
  categoryBgColor: PropTypes.string,
  categoryTextColor: PropTypes.string,
  categoryIconColor: PropTypes.string,
  categoryChevronColor: PropTypes.string,
  searchIcon: PropTypes.node,
  micIcon: PropTypes.node,
  categoryChevronIcon: PropTypes.node,
  menuBgColor: PropTypes.string,
  menuTextColor: PropTypes.string,
  menuBorderColor: PropTypes.string,
  menuW: PropTypes.string,
  menuH: PropTypes.string,
  helper: PropTypes.string,
  error: PropTypes.string,
  disabled: PropTypes.bool,
  loading: PropTypes.bool,
};
