import React from 'react';
import PropTypes from 'prop-types';
import './skeleton.scss';

export const Skeleton = ({ variant = 'rect', width = '100%', height = 16, circle = false, lines = 3 }) => {
  if (variant === 'text') {
    return (
      <div className="sb-skel-text">
        {Array.from({ length: lines }).map((_, i) => (
          <span key={i} className="sb-skel sb-skel--line" />
        ))}
      </div>
    );
  }
  return (
    <span
      className={`sb-skel ${circle ? 'sb-skel--circle' : ''}`}
      style={{ width, height }}
    />
  );
};

Skeleton.propTypes = {
  variant: PropTypes.oneOf(['rect', 'text']),
  width: PropTypes.oneOfType([PropTypes.string, PropTypes.number]),
  height: PropTypes.oneOfType([PropTypes.string, PropTypes.number]),
  circle: PropTypes.bool,
  lines: PropTypes.number,
};


