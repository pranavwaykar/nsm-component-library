import React, { forwardRef } from 'react';
import PropTypes from 'prop-types';
import '../../index.scss';
import './Progress.scss';
import { expandStyleProps } from '../../utils/styleSystem';

export const ProgressBar = forwardRef(({ value, max = 100, indeterminate = false, label, showLabel = true, labelPlacement = 'bottom', labelColor, labelFontFamily, labelFontSize, labelFontWeight, labelGap, shadow, loading = false, disabled = false, barTrackColor, barFillColor, barWidth, barHeight, as, style, hidden, ...rest }, ref) => {
  const pct = Math.max(0, Math.min(100, (Number(value) / Number(max)) * 100));
  const Outer = as || 'div';
  const mergedStyle = { ...expandStyleProps(rest), ...(style || {}) };
  let elemShadow;
  if (shadow) {
    const smap = { none: '0', sm: '1', md: '3', lg: '5' };
    const key = smap[String(shadow)] || null;
    if (key) elemShadow = `var(--sb-shadow-${key})`;
    if (shadow === 'none') elemShadow = 'var(--sb-shadow-0)';
  }
  if (hidden === true && mergedStyle.display === undefined) mergedStyle.display = 'none';
  const bgStyle = barTrackColor ? { background: barTrackColor } : undefined;
  const trackStyle = { ...(bgStyle || {}) };
  if (barWidth) trackStyle.width = barWidth;
  if (barHeight) trackStyle.height = barHeight;
  if (elemShadow) trackStyle.boxShadow = elemShadow;
  const fillStyle = indeterminate
    ? undefined
    : { width: `${pct}%`, ...(barFillColor ? { background: barFillColor } : {}) };
  return (
    <Outer className={`sb-progress sb-progress--bar ${loading ? 'is-loading' : ''} ${disabled ? 'is-disabled' : ''}`.trim()} style={{ ...mergedStyle, gap: labelGap ?? mergedStyle.gap }} {...rest}>
      <div ref={ref} className="sb-progressbar" role="progressbar" aria-valuemin={0} aria-valuemax={max} aria-valuenow={indeterminate ? undefined : Math.round(pct)} aria-label={label} style={trackStyle}>
        <div className={`sb-progressbar__fill ${indeterminate ? 'is-indeterminate' : ''}`} style={indeterminate ? (barFillColor ? { background: barFillColor } : undefined) : fillStyle} />
      </div>
      {showLabel && (
        <div className="sb-progress__label" style={{ color: labelColor, fontFamily: labelFontFamily, fontSize: labelFontSize, fontWeight: labelFontWeight, order: labelPlacement === 'top' ? -1 : 1 }}>
          {label}
        </div>
      )}
    </Outer>
  );
});

ProgressBar.propTypes = { value: PropTypes.number, max: PropTypes.number, indeterminate: PropTypes.bool, label: PropTypes.node, as: PropTypes.elementType };

export const ProgressRing = forwardRef(({ value, max = 100, size = 44, stroke = 4, indeterminate = false, label, showLabel = true, labelPlacement = 'bottom', labelColor, labelFontFamily, labelFontSize, labelFontWeight, labelGap, shadow, loading = false, disabled = false, ringBgColor, ringFgColor, as, style, hidden, ...rest }, ref) => {
  const radius = (size - stroke) / 2;
  const circumference = 2 * Math.PI * radius;
  const pct = Math.max(0, Math.min(100, (Number(value) / Number(max)) * 100));
  const dash = indeterminate ? circumference * 0.25 : (pct / 100) * circumference;
  const Outer = as || 'div';
  const mergedStyle = { ...expandStyleProps(rest), ...(style || {}) };
  let elemShadow;
  if (shadow) {
    const smap = { none: '0', sm: '1', md: '3', lg: '5' };
    const key = smap[String(shadow)] || null;
    if (key) elemShadow = `var(--sb-shadow-${key})`;
    if (shadow === 'none') elemShadow = 'var(--sb-shadow-0)';
  }
  if (hidden === true && mergedStyle.display === undefined) mergedStyle.display = 'none';
  return (
    <Outer className={`sb-progress sb-progress--ring ${indeterminate ? 'is-indeterminate' : ''} ${loading ? 'is-loading' : ''} ${disabled ? 'is-disabled' : ''}`.trim()} style={{ ...mergedStyle, gap: labelGap ?? mergedStyle.gap }} {...rest}>
      <div className="sb-progressring__wrap" style={{ boxShadow: elemShadow, borderRadius: '50%', display: 'inline-block' }}>
        <svg ref={ref} className="sb-progressring" width={size} height={size} role="img" aria-label={label}>
          <circle className="sb-progressring__bg" cx={size/2} cy={size/2} r={radius} strokeWidth={stroke} style={ringBgColor ? { stroke: ringBgColor } : undefined} />
          <circle className="sb-progressring__fg" cx={size/2} cy={size/2} r={radius} strokeWidth={stroke} strokeDasharray={`${dash} ${circumference}`} style={ringFgColor ? { stroke: ringFgColor } : undefined} />
        </svg>
      </div>
      {showLabel && (
        <div className="sb-progress__label" style={{ color: labelColor, fontFamily: labelFontFamily, fontSize: labelFontSize, fontWeight: labelFontWeight, order: labelPlacement === 'top' ? -1 : 1 }}>
          {label}
        </div>
      )}
    </Outer>
  );
});

ProgressRing.propTypes = { value: PropTypes.number, max: PropTypes.number, size: PropTypes.number, stroke: PropTypes.number, indeterminate: PropTypes.bool, label: PropTypes.node, as: PropTypes.elementType };

export default { ProgressBar, ProgressRing };


