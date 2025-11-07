import React, { forwardRef } from 'react';
import PropTypes from 'prop-types';
import '../../index.scss';
import './skeleton.scss';
import { expandStyleProps } from '../../utils/styleSystem';

export const Skeleton = forwardRef(({ width = '100%', height = 16, circle = false, as, style, hidden, ...rest }, ref) => {
  const Component = as || 'span';
  const mergedStyle = { ...expandStyleProps({ width, height, ...rest }), ...(style || {}) };
  if (hidden === true && mergedStyle.display === undefined) mergedStyle.display = 'none';
  return (
    <Component ref={ref} className={`sb-skel ${circle ? 'sb-skel--circle' : ''}`} style={mergedStyle} {...rest} />
  );
});

Skeleton.propTypes = {
  width: PropTypes.oneOfType([PropTypes.string, PropTypes.number]),
  height: PropTypes.oneOfType([PropTypes.string, PropTypes.number]),
  circle: PropTypes.bool,
  as: PropTypes.elementType,
};


