import React, { forwardRef } from 'react';
import PropTypes from 'prop-types';
import './tokens.css';
import './badge.scss';

export const Badge = forwardRef(({ as, label, children, variant = 'neutral', dot = false, pill = true, ...rest }, ref) => {
  const Component = as || 'span';
  const classNames = ['sb-badge', `sb-badge--${variant}`, pill ? 'sb-badge--pill' : null].filter(Boolean).join(' ');
  return (
    <Component ref={ref} className={classNames} {...rest}>
      {dot ? <span className="sb-badge__dot" /> : null}
      {children ?? label}
    </Component>
  );
});

Badge.propTypes = {
  as: PropTypes.elementType,
  label: PropTypes.string,
  children: PropTypes.node,
  variant: PropTypes.oneOf(['neutral','primary','success','warning','error','info']),
  dot: PropTypes.bool,
  pill: PropTypes.bool,
};


