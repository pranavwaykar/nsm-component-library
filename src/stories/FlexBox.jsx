import React from 'react';
import PropTypes from 'prop-types';

export const FlexBox = ({ direction = 'row', align = 'center', justify = 'flex-start', gap = 8, wrap = false, style, children }) => {
  const merged = {
    display: 'flex',
    flexDirection: direction,
    alignItems: align,
    justifyContent: justify,
    gap,
    flexWrap: wrap ? 'wrap' : 'nowrap',
    ...style,
  };
  return <div style={merged}>{children}</div>;
};

FlexBox.propTypes = {
  direction: PropTypes.oneOf(['row','row-reverse','column','column-reverse']),
  align: PropTypes.oneOf(['stretch','flex-start','center','flex-end','baseline']),
  justify: PropTypes.oneOf(['flex-start','center','flex-end','space-between','space-around','space-evenly']),
  gap: PropTypes.oneOfType([PropTypes.number, PropTypes.string]),
  wrap: PropTypes.bool,
  style: PropTypes.object,
  children: PropTypes.node,
};


