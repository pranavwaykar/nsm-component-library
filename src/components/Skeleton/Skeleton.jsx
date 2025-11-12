import React, { forwardRef } from 'react';
import PropTypes from 'prop-types';
import '../../index.scss';
import './skeleton.scss';
import { expandStyleProps } from '../../utils/styleSystem';

export const Skeleton = forwardRef(({ circle = false, shadow, loading = false, disabled = false, skeletonStartColor, skeletonMidColor, skeletonEndColor, skeletonRadius, as, style, hidden, onClick, ...rest }, ref) => {
  const Component = as || 'span';
  const mergedStyle = { ...expandStyleProps(rest), ...(style || {}) };
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
    <Component ref={ref} onClick={onClick} className={`sb-skel ${circle ? 'sb-skel--circle' : ''} ${loading ? 'is-loading' : ''} ${disabled ? 'is-disabled' : ''}`.trim()} style={{ ...mergedStyle, ...(gradient || {}), ...(skeletonRadius ? { borderRadius: skeletonRadius } : {}) }} {...rest} />
  );
});

Skeleton.propTypes = {
  circle: PropTypes.bool,
  as: PropTypes.elementType,
};


