import React from 'react';

import PropTypes from 'prop-types';

import './button.scss';

/** Primary UI component for user interaction */
export const Button = ({
  label,
  variant = 'primary',
  size = 'medium',
  radius = 'md',
  shadow = 'none',
  fullWidth = false,
  uppercase = false,
  disabled = false,
  loading = false,
  leftIcon,
  rightIcon,
  indicator = false,
  count,
  ...props
}) => {
  const classNames = [
    'sb-button',
    `sb-button--${variant}`,
    `sb-button--${size}`,
    `sb-button--radius-${radius}`,
    `sb-button--shadow-${shadow}`,
    fullWidth ? 'sb-button--full' : null,
    uppercase ? 'sb-button--uppercase' : null,
    disabled ? 'is-disabled' : null,
    loading ? 'is-loading' : null,
  ].filter(Boolean).join(' ');

  return (
    <button className={classNames} disabled={disabled || loading} {...props}>
      {leftIcon ? <span className="sb-button__icon-left" aria-hidden>{leftIcon}</span> : null}
      <span className="sb-button__label">{label}</span>
      {indicator ? <span className="sb-button__indicator" aria-hidden /> : null}
      {typeof count === 'number' ? <span className="sb-button__count">{count}</span> : null}
      {rightIcon ? <span className="sb-button__icon-right" aria-hidden>{rightIcon}</span> : null}
    </button>
  );
};

Button.propTypes = {
  label: PropTypes.string.isRequired,
  variant: PropTypes.oneOf(['primary','secondary','ghost','link','destructive','success','warning']),
  size: PropTypes.oneOf(['xsmall','small','medium','large','xlarge']),
  radius: PropTypes.oneOf(['none','sm','md','lg','pill']),
  shadow: PropTypes.oneOf(['none','sm','md','lg']),
  fullWidth: PropTypes.bool,
  uppercase: PropTypes.bool,
  disabled: PropTypes.bool,
  loading: PropTypes.bool,
  leftIcon: PropTypes.node,
  rightIcon: PropTypes.node,
  indicator: PropTypes.bool,
  count: PropTypes.number,
};
