import React, { forwardRef } from 'react';
import PropTypes from 'prop-types';
import '../../index.scss';
import './IconBox.scss';

export const IconBox = forwardRef(({ icon, count, label, variant = 'neutral', size = 'md', indicator = false, onClick, as, className, style, sx, ...rest }, ref) => {
  const classNames = [
    'sb-iconbox',
    `sb-iconbox--${variant}`,
    `sb-iconbox--${size}`,
    onClick ? 'is-clickable' : null,
    className,
  ]
    .filter(Boolean)
    .join(' ');

  const Component = as || 'div';
  return (
    <Component ref={ref} className={classNames} role={onClick ? 'button' : undefined} tabIndex={onClick ? 0 : undefined} onClick={onClick} onKeyDown={(e) => {
      if (!onClick) return;
      if (e.key === 'Enter' || e.key === ' ') {
        e.preventDefault();
        onClick();
      }
    }} style={{ ...(style || {}), ...(sx || {}) }} {...rest}>
      <div className="sb-iconbox__icon" aria-hidden>
        {icon}
        {indicator ? <span className="sb-iconbox__dot" /> : null}
      </div>
      {typeof count === 'number' ? (
        <div className="sb-iconbox__count">{count}</div>
      ) : null}
      {label ? <div className="sb-iconbox__label">{label}</div> : null}
    </Component>
  );
});

IconBox.propTypes = {
  icon: PropTypes.node,
  count: PropTypes.number,
  label: PropTypes.string,
  variant: PropTypes.oneOf(['neutral', 'primary', 'success', 'warning', 'error', 'info']),
  size: PropTypes.oneOf(['sm', 'md', 'lg']),
  indicator: PropTypes.bool,
  onClick: PropTypes.func,
  as: PropTypes.elementType,
};

export default IconBox;


