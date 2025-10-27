import React, { forwardRef } from 'react';
import PropTypes from 'prop-types';
import './skeleton.scss';

export const Skeleton = forwardRef(({ variant = 'rect', width = '100%', height = 16, circle = false, lines = 3, as, ...rest }, ref) => {
  if (variant === 'text') {
    return (
      <div className="sb-skel-text" ref={ref} {...rest}>
        {Array.from({ length: lines }).map((_, i) => (
          <span key={i} className="sb-skel sb-skel--line" />
        ))}
      </div>
    );
  }
  const Component = as || 'span';
  return (
    <Component
      ref={ref}
      className={`sb-skel ${circle ? 'sb-skel--circle' : ''}`}
      style={{ width, height }}
      {...rest}
    />
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


