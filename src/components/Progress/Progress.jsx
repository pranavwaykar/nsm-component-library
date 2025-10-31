import React, { forwardRef } from 'react';
import PropTypes from 'prop-types';
import '../../index.scss';
import './Progress.scss';

export const ProgressBar = forwardRef(({ value, max = 100, indeterminate = false, label, as, ...rest }, ref) => {
  const pct = Math.max(0, Math.min(100, (Number(value) / Number(max)) * 100));
  const Component = as || 'div';
  return (
    <Component ref={ref} className="sb-progressbar" role="progressbar" aria-valuemin={0} aria-valuemax={max} aria-valuenow={indeterminate ? undefined : Math.round(pct)} aria-label={label} {...rest}>
      <div className={`sb-progressbar__fill ${indeterminate ? 'is-indeterminate' : ''}`} style={indeterminate ? undefined : { width: `${pct}%` }} />
    </Component>
  );
});

ProgressBar.propTypes = { value: PropTypes.number, max: PropTypes.number, indeterminate: PropTypes.bool, label: PropTypes.string, as: PropTypes.elementType };

export const ProgressRing = forwardRef(({ value, max = 100, size = 44, stroke = 4, indeterminate = false, label, as, ...rest }, ref) => {
  const radius = (size - stroke) / 2;
  const circumference = 2 * Math.PI * radius;
  const pct = Math.max(0, Math.min(100, (Number(value) / Number(max)) * 100));
  const dash = indeterminate ? circumference * 0.25 : (pct / 100) * circumference;
  const Component = as || 'svg';
  return (
    <Component ref={ref} className={`sb-progressring ${indeterminate ? 'is-indeterminate' : ''}`} width={size} height={size} role="img" aria-label={label} {...rest}>
      <circle className="sb-progressring__bg" cx={size/2} cy={size/2} r={radius} strokeWidth={stroke} />
      <circle className="sb-progressring__fg" cx={size/2} cy={size/2} r={radius} strokeWidth={stroke} strokeDasharray={`${dash} ${circumference}`} />
    </Component>
  );
});

ProgressRing.propTypes = { value: PropTypes.number, max: PropTypes.number, size: PropTypes.number, stroke: PropTypes.number, indeterminate: PropTypes.bool, label: PropTypes.string, as: PropTypes.elementType };

export default { ProgressBar, ProgressRing };


