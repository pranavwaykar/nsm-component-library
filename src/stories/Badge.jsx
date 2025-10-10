import React from 'react';
import PropTypes from 'prop-types';
import './badge.scss';

export const Badge = ({ label, variant = 'neutral', dot = false, pill = true }) => {
  const classNames = ['sb-badge', `sb-badge--${variant}`, pill ? 'sb-badge--pill' : null].filter(Boolean).join(' ');
  return (
    <span className={classNames}>
      {dot ? <span className="sb-badge__dot" /> : null}
      {label}
    </span>
  );
};

Badge.propTypes = {
  label: PropTypes.string.isRequired,
  variant: PropTypes.oneOf(['neutral','primary','success','warning','error','info']),
  dot: PropTypes.bool,
  pill: PropTypes.bool,
};


