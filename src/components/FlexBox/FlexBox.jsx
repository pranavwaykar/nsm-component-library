import React, { forwardRef } from 'react';
import PropTypes from 'prop-types';
import '../../index.scss';
import { expandStyleProps } from '../../utils/styleSystem';

export const FlexBox = forwardRef(({ direction = 'row', align = 'center', justify = 'flex-start', gap = 8, wrap = false, style, hidden, children, as, ...rest }, ref) => {
  const merged = {
    display: 'flex',
    flexDirection: direction,
    alignItems: align,
    justifyContent: justify,
    gap,
    flexWrap: wrap ? 'wrap' : 'nowrap',
    ...expandStyleProps(rest),
    ...style,
  };
  if (hidden === true && merged.display === undefined) merged.display = 'none';
  const Component = as || 'div';
  return <Component ref={ref} style={merged} {...rest}>{children}</Component>;
});

FlexBox.propTypes = {
  direction: PropTypes.oneOf(['row','row-reverse','column','column-reverse']),
  align: PropTypes.oneOf(['stretch','flex-start','center','flex-end','baseline']),
  justify: PropTypes.oneOf(['flex-start','center','flex-end','space-between','space-around','space-evenly']),
  gap: PropTypes.oneOfType([PropTypes.number, PropTypes.string]),
  wrap: PropTypes.bool,
  style: PropTypes.object,
  children: PropTypes.node,
  as: PropTypes.elementType,
};


