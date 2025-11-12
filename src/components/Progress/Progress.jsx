import React, { forwardRef } from 'react';
import PropTypes from 'prop-types';
import '../../index.scss';
import './Progress.scss';
import { expandStyleProps } from '../../utils/styleSystem';

export const ProgressBar = forwardRef(({ value, max = 100, indeterminate = false, label, shadow, loading = false, disabled = false, barTrackColor, barFillColor, barWidth, barHeight, as, style, hidden, ...rest }, ref) => {
  const pct = Math.max(0, Math.min(100, (Number(value) / Number(max)) * 100));
  const Component = as || 'div';
  const mergedStyle = { ...expandStyleProps(rest), ...(style || {}) };
  if (shadow) {
    const smap = { none: '0', sm: '1', md: '3', lg: '5' };
    const key = smap[String(shadow)] || null;
    if (key) mergedStyle.boxShadow = `var(--sb-shadow-${key})`;
    if (shadow === 'none') mergedStyle.boxShadow = 'var(--sb-shadow-0)';
  }
  if (hidden === true && mergedStyle.display === undefined) mergedStyle.display = 'none';
  if (barWidth) mergedStyle.width = barWidth;
  if (barHeight) mergedStyle.height = barHeight;
  const bgStyle = barTrackColor ? { background: barTrackColor } : undefined;
  const fillStyle = indeterminate
    ? undefined
    : { width: `${pct}%`, ...(barFillColor ? { background: barFillColor } : {}) };
  return (
    <Component ref={ref} className={`sb-progressbar ${loading ? 'is-loading' : ''} ${disabled ? 'is-disabled' : ''}`.trim()} role="progressbar" aria-valuemin={0} aria-valuemax={max} aria-valuenow={indeterminate ? undefined : Math.round(pct)} aria-label={label} style={{ ...mergedStyle, ...bgStyle }} {...rest}>
      <div className={`sb-progressbar__fill ${indeterminate ? 'is-indeterminate' : ''}`} style={indeterminate ? (barFillColor ? { background: barFillColor } : undefined) : fillStyle} />
    </Component>
  );
});

ProgressBar.propTypes = { value: PropTypes.number, max: PropTypes.number, indeterminate: PropTypes.bool, label: PropTypes.string, as: PropTypes.elementType };

export const ProgressRing = forwardRef(({ value, max = 100, size = 44, stroke = 4, indeterminate = false, label, shadow, loading = false, disabled = false, ringBgColor, ringFgColor, as, style, hidden, ...rest }, ref) => {
  const radius = (size - stroke) / 2;
  const circumference = 2 * Math.PI * radius;
  const pct = Math.max(0, Math.min(100, (Number(value) / Number(max)) * 100));
  const dash = indeterminate ? circumference * 0.25 : (pct / 100) * circumference;
  const Component = as || 'svg';
  const mergedStyle = { ...expandStyleProps(rest), ...(style || {}) };
  if (shadow) {
    const smap = { none: '0', sm: '1', md: '3', lg: '5' };
    const key = smap[String(shadow)] || null;
    if (key) mergedStyle.boxShadow = `var(--sb-shadow-${key})`;
    if (shadow === 'none') mergedStyle.boxShadow = 'var(--sb-shadow-0)';
  }
  if (hidden === true && mergedStyle.display === undefined) mergedStyle.display = 'none';
  return (
    <Component ref={ref} className={`sb-progressring ${indeterminate ? 'is-indeterminate' : ''} ${loading ? 'is-loading' : ''} ${disabled ? 'is-disabled' : ''}`.trim()} width={size} height={size} role="img" aria-label={label} style={mergedStyle} {...rest}>
      <circle className="sb-progressring__bg" cx={size/2} cy={size/2} r={radius} strokeWidth={stroke} style={ringBgColor ? { stroke: ringBgColor } : undefined} />
      <circle className="sb-progressring__fg" cx={size/2} cy={size/2} r={radius} strokeWidth={stroke} strokeDasharray={`${dash} ${circumference}`} style={ringFgColor ? { stroke: ringFgColor } : undefined} />
    </Component>
  );
});

ProgressRing.propTypes = { value: PropTypes.number, max: PropTypes.number, size: PropTypes.number, stroke: PropTypes.number, indeterminate: PropTypes.bool, label: PropTypes.string, as: PropTypes.elementType };

export default { ProgressBar, ProgressRing };


