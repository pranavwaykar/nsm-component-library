import React from 'react';
import './Card.scss';
import { expandStyleProps } from '../../utils/styleSystem';

const Card = ({ as, className, style, title, children, padding = 16, hidden, ...rest }) => {
  const Container = as || 'div';
  const mergedStyle = { ...expandStyleProps(rest), ...(style || {}) };
  if (hidden === true && mergedStyle.display === undefined) mergedStyle.display = 'none';
  return (
    <Container className={`card ${className || ''}`} style={mergedStyle} {...rest}>
      {title && <div className="card-header">{title}</div>}
      <div className="card-body" style={{ padding }}>{children}</div>
    </Container>
  );
};

export default Card;


