import React, { forwardRef } from 'react';
import PropTypes from 'prop-types';
import '../../index.scss';
import './IconBox.scss';
import { expandStyleProps } from '../../utils/styleSystem';

export const IconBox = forwardRef(({ icon, count, label, variant = 'neutral', size = 'md', indicator = false, onClick, as, className, style, hidden, radius, elevation, shadow, ...rest }, ref) => {
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
  const mergedStyle = { ...expandStyleProps(rest), ...(style || {}) };
  if (typeof radius === 'number') mergedStyle.borderRadius = radius;
  if (hidden === true && mergedStyle.display === undefined) mergedStyle.display = 'none';
  return (
    <Component ref={ref} className={classNames} role={onClick ? 'button' : undefined} tabIndex={onClick ? 0 : undefined} onClick={onClick} onKeyDown={(e) => {
      if (!onClick) return;
      if (e.key === 'Enter' || e.key === ' ') {
        e.preventDefault();
        onClick();
      }
    }} style={mergedStyle} {...rest}>
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


