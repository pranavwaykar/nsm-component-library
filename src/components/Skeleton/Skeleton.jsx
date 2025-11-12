import React, { forwardRef } from 'react';
import PropTypes from 'prop-types';
import '../../index.scss';
import './skeleton.scss';
import { expandStyleProps } from '../../utils/styleSystem';

export const Skeleton = forwardRef(({ width = '100%', height = 16, circle = false, shadow, loading = false, disabled = false, skeletonStartColor, skeletonMidColor, skeletonEndColor, as, style, hidden, ...rest }, ref) => {
  const Component = as || 'span';
  const mergedStyle = { ...expandStyleProps({ width, height, ...rest }), ...(style || {}) };
  if (shadow) {
    const smap = { none: '0', sm: '1', md: '3', lg: '5' };
    const key = smap[String(shadow)] || null;
    if (key) mergedStyle.boxShadow = `var(--sb-shadow-${key})`;
    if (shadow === 'none') mergedStyle.boxShadow = 'var(--sb-shadow-0)';
  }
  if (hidden === true && mergedStyle.display === undefined) mergedStyle.display = 'none';
  const gradient = (skeletonStartColor || skeletonMidColor || skeletonEndColor)
    ? { background: `linear-gradient(90deg, ${skeletonStartColor || '#f3f4f6'} 25%, ${skeletonMidColor || '#e5e7eb'} 37%, ${skeletonEndColor || '#f3f4f6'} 63%)`, backgroundSize: '400% 100%' }
    : undefined;
  return (
    <Component ref={ref} className={`sb-skel ${circle ? 'sb-skel--circle' : ''} ${loading ? 'is-loading' : ''} ${disabled ? 'is-disabled' : ''}`.trim()} style={{ ...mergedStyle, ...(gradient || {}) }} {...rest} />
  );
});

Skeleton.propTypes = {
  width: PropTypes.oneOfType([PropTypes.string, PropTypes.number]),
  height: PropTypes.oneOfType([PropTypes.string, PropTypes.number]),
  circle: PropTypes.bool,
  as: PropTypes.elementType,
};


