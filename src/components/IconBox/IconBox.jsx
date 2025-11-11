import React, { forwardRef } from 'react';
import PropTypes from 'prop-types';
import '../../index.scss';
import './IconBox.scss';
import { expandStyleProps } from '../../utils/styleSystem';

export const IconBox = forwardRef(({
  icon,
  count,
  label,
  variant = 'neutral',
  size = 'md',
  indicator = false,
  showIcon = true,
  showCount = true,
  showLabel = true,
  disabled = false,
  loading = false,
  onClick,
  as,
  className,
  style,
  hidden,
  shadow,
  ...rest
}, ref) => {
  const classNames = [
    'sb-iconbox',
    `sb-iconbox--${variant}`,
    `sb-iconbox--${size}`,
    onClick ? 'is-clickable' : null,
    disabled ? 'is-disabled' : null,
    loading ? 'is-loading' : null,
    className,
  ]
    .filter(Boolean)
    .join(' ');

  const Component = as || 'div';
  const mergedStyle = { ...expandStyleProps(rest), ...(style || {}) };
  if (shadow) {
    const map = { none: '0', sm: '1', md: '3', lg: '5' };
    const key = map[String(shadow)];
    if (key && !mergedStyle.boxShadow) mergedStyle.boxShadow = `var(--sb-shadow-${key})`;
  }
  if (hidden === true && mergedStyle.display === undefined) mergedStyle.display = 'none';
  return (
    <Component ref={ref} className={classNames} role={onClick ? 'button' : undefined} tabIndex={onClick ? 0 : undefined} onClick={onClick} onKeyDown={(e) => {
      if (!onClick) return;
      if (e.key === 'Enter' || e.key === ' ') {
        e.preventDefault();
        onClick();
      }
    }} style={mergedStyle} {...rest}>
      {showIcon ? (
        <div className="sb-iconbox__icon" aria-hidden>
          {icon}
          {indicator ? <span className="sb-iconbox__dot" /> : null}
        </div>
      ) : null}
      {showCount && typeof count === 'number' ? (
        <div className="sb-iconbox__count">{count}</div>
      ) : null}
      {showLabel && label ? <div className="sb-iconbox__label">{label}</div> : null}
    </Component>
  );
});

IconBox.propTypes = {
  icon: PropTypes.node,
  count: PropTypes.number,
  label: PropTypes.oneOfType([PropTypes.string, PropTypes.node]),
  variant: PropTypes.oneOf(['neutral', 'primary', 'success', 'warning', 'error', 'info']),
  size: PropTypes.oneOf(['sm', 'md', 'lg']),
  indicator: PropTypes.bool,
  showIcon: PropTypes.bool,
  showCount: PropTypes.bool,
  showLabel: PropTypes.bool,
  disabled: PropTypes.bool,
  loading: PropTypes.bool,
  onClick: PropTypes.func,
  as: PropTypes.elementType,
};

export default IconBox;


