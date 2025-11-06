import React, { forwardRef } from 'react';
import PropTypes from 'prop-types';
import '../../index.scss';
import { expandStyleProps } from '../../utils/styleSystem';

export const GridBox = forwardRef(({ columns = 'repeat(3, minmax(0, 1fr))', rows, gap = 12, style, hidden, children, as, ...rest }, ref) => {
  const merged = {
    display: 'grid',
    gridTemplateColumns: columns,
    gridTemplateRows: rows,
    gap,
    ...expandStyleProps(rest),
    ...style,
  };
  if (hidden === true && merged.display === undefined) merged.display = 'none';
  const Component = as || 'div';
  return <Component ref={ref} style={merged} {...rest}>{children}</Component>;
});

GridBox.propTypes = {
  columns: PropTypes.string,
  rows: PropTypes.string,
  gap: PropTypes.oneOfType([PropTypes.number, PropTypes.string]),
  style: PropTypes.object,
  children: PropTypes.node,
  as: PropTypes.elementType,
};


