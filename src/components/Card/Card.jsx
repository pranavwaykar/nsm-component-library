import React from 'react';
import PropTypes from 'prop-types';
import './Card.scss';
import { expandStyleProps } from '../../utils/styleSystem';

const Card = ({ as, className, style, title, header, showHeader = true, children, padding = 16, hidden, ...rest }) => {
  const Container = as || 'div';
  const mergedStyle = { ...expandStyleProps(rest), ...(style || {}) };
  if (hidden === true && mergedStyle.display === undefined) mergedStyle.display = 'none';
  return (
    <Container className={`card ${className || ''}`} style={mergedStyle} {...rest}>
      {showHeader && (header || title) ? (
        <div className="card-header">{header || title}</div>
      ) : null}
      <div className="card-body" style={{ padding }}>{children}</div>
    </Container>
  );
};

export default Card;

Card.propTypes = {
  title: PropTypes.string,
  header: PropTypes.node,
  showHeader: PropTypes.bool,
  children: PropTypes.node,
};


