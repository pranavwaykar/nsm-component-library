import React from 'react';
import '../../index.scss';
import './Breadcrumb.scss';
import { expandStyleProps } from '../../utils/styleSystem';

const Breadcrumb = ({
  items = [],
  separator = '›',
  customProps,
  variant = 'solid',
  size = 'md',
  elevation = 0,
  shadow,
  disabled = false,
  loading = false,
  color,
  colorScheme,
  as,
  className,
  style,
  hidden,
  role = 'navigation',
  draggable,
  ...rest
}) => {
  const Component = as || 'nav';
  const mergedStyle = { ...expandStyleProps(rest), ...(style || {}) };
  if (typeof elevation === 'number') mergedStyle.boxShadow = `var(--sb-shadow-${Math.max(0, Math.min(5, elevation))})`;
  if (shadow) {
    const map = { none: '0', sm: '1', md: '3', lg: '5' };
    const key = map[String(shadow)] || null;
    if (key) mergedStyle.boxShadow = `var(--sb-shadow-${key})`;
  }
  // Ensure borderStyle updates the existing border instead of being ignored
  if (mergedStyle.borderStyle && mergedStyle.border === undefined) {
    if (mergedStyle.borderWidth === undefined) mergedStyle.borderWidth = '1px';
    if (mergedStyle.borderColor === undefined) mergedStyle.borderColor = '#e5e7eb';
  }
  if (draggable && mergedStyle.cursor === undefined && !disabled && !loading) mergedStyle.cursor = 'grab';
  if (hidden === true && mergedStyle.display === undefined) mergedStyle.display = 'none';
  return (
    <Component
      className={[
        'breadcrumb',
        `breadcrumb--variant-${variant}`,
        `breadcrumb--size-${size}`,
        disabled ? 'is-disabled' : null,
        loading ? 'is-loading' : null,
        color ? `breadcrumb--color-${color}` : null,
        className,
      ].filter(Boolean).join(' ')}
      style={mergedStyle}
      role={role}
      draggable={draggable}
      aria-disabled={disabled || undefined}
      aria-busy={loading || undefined}
      {...rest}
      {...(customProps || {})}
    >
      {items.map((item, idx) => {
        const isLast = idx === items.length - 1;
        const clickable = typeof rest.onItemClick === 'function' && !isLast && !disabled && !loading;
        const handleClick = (e) => clickable && rest.onItemClick?.(item, idx, e);
        const handleKey = (e) => {
          if (!clickable) return;
          if (e.key === 'Enter' || e.key === ' ') {
            e.preventDefault();
            rest.onItemClick?.(item, idx, e);
          }
        };
        return (
          <span
            key={idx}
            className={`crumb ${clickable ? 'is-clickable' : ''}`.trim()}
            onClick={handleClick}
            onKeyDown={handleKey}
            role={clickable ? 'button' : undefined}
            tabIndex={clickable ? 0 : undefined}
          >
            {item}
            {!isLast && <span className="sep">{separator}</span>}
          </span>
        );
      })}
    </Component>
  );
};

export default Breadcrumb;


