import React from 'react';
import './Card.scss';

const Card = ({ as, className, style, title, children, padding = 16 }) => {
  const Container = as || 'div';
  return (
    <Container className={`card ${className || ''}`} style={style}>
      {title && <div className="card-header">{title}</div>}
      <div className="card-body" style={{ padding }}>{children}</div>
    </Container>
  );
};

export default Card;


