import React from 'react';
import PropTypes from 'prop-types';
import './tokens.css';
import './progress.scss';

export const ProgressBar = ({ value, max = 100, indeterminate = false, label }) => {
  const pct = Math.max(0, Math.min(100, (Number(value) / Number(max)) * 100));
  return (
    <div className="sb-progressbar" role="progressbar" aria-valuemin={0} aria-valuemax={max} aria-valuenow={indeterminate ? undefined : Math.round(pct)} aria-label={label}>
      <div className={`sb-progressbar__fill ${indeterminate ? 'is-indeterminate' : ''}`} style={indeterminate ? undefined : { width: `${pct}%` }} />
    </div>
  );
};

ProgressBar.propTypes = {
  value: PropTypes.number,
  max: PropTypes.number,
  indeterminate: PropTypes.bool,
  label: PropTypes.string,
};

export const ProgressRing = ({ value, max = 100, size = 44, stroke = 4, indeterminate = false, label }) => {
  const radius = (size - stroke) / 2;
  const circumference = 2 * Math.PI * radius;
  const pct = Math.max(0, Math.min(100, (Number(value) / Number(max)) * 100));
  const dash = indeterminate ? circumference * 0.25 : (pct / 100) * circumference;
  return (
    <svg className={`sb-progressring ${indeterminate ? 'is-indeterminate' : ''}`} width={size} height={size} role="img" aria-label={label}>
      <circle className="sb-progressring__bg" cx={size/2} cy={size/2} r={radius} strokeWidth={stroke} />
      <circle className="sb-progressring__fg" cx={size/2} cy={size/2} r={radius} strokeWidth={stroke} strokeDasharray={`${dash} ${circumference}`} />
    </svg>
  );
};

ProgressRing.propTypes = {
  value: PropTypes.number,
  max: PropTypes.number,
  size: PropTypes.number,
  stroke: PropTypes.number,
  indeterminate: PropTypes.bool,
  label: PropTypes.string,
};


