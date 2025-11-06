import React, { forwardRef } from 'react';
import PropTypes from 'prop-types';
import '../../index.scss';
import './skeleton.scss';
import { expandStyleProps } from '../../utils/styleSystem';

export const Skeleton = forwardRef(({ variant = 'rect', width = '100%', height = 16, circle = false, lines = 3, as, style, hidden, ...rest }, ref) => {
  if (variant === 'text') {
    return (
      <div className="sb-skel-text" ref={ref} style={{ ...expandStyleProps(rest), ...(style || {}) }} {...rest}>
        {Array.from({ length: lines }).map((_, i) => (
          <span key={i} className="sb-skel sb-skel--line" />
        ))}
      </div>
    );
  }
  const Component = as || 'span';
  const mergedStyle = { ...expandStyleProps(rest), ...(style || {}), width, height };
  if (hidden === true && mergedStyle.display === undefined) mergedStyle.display = 'none';
  return (
    <Component ref={ref} className={`sb-skel ${circle ? 'sb-skel--circle' : ''}`} style={mergedStyle} {...rest} />
  );
});

Skeleton.propTypes = {
  variant: PropTypes.oneOf(['rect', 'text']),
  width: PropTypes.oneOfType([PropTypes.string, PropTypes.number]),
  height: PropTypes.oneOfType([PropTypes.string, PropTypes.number]),
  circle: PropTypes.bool,
  lines: PropTypes.number,
  as: PropTypes.elementType,
};


