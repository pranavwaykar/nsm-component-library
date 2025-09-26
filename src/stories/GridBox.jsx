import React from 'react';
import PropTypes from 'prop-types';

export const GridBox = ({ columns = 'repeat(3, minmax(0, 1fr))', rows, gap = 12, style, children }) => {
  const merged = {
    display: 'grid',
    gridTemplateColumns: columns,
    gridTemplateRows: rows,
    gap,
    ...style,
  };
  return <div style={merged}>{children}</div>;
};

GridBox.propTypes = {
  columns: PropTypes.string,
  rows: PropTypes.string,
  gap: PropTypes.oneOfType([PropTypes.number, PropTypes.string]),
  style: PropTypes.object,
  children: PropTypes.node,
};


