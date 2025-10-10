import React from 'react';
import PropTypes from 'prop-types';
import './iconbox.scss';

export const IconBox = ({
  icon = '⭐',
  color = 'currentColor',
  bg = 'transparent',
  size = 20,
  radius = 'md',
}) => {
  const classNames = ['sb-iconbox', `sb-iconbox--radius-${radius}`].join(' ');
  return (
    <span
      className={classNames}
      style={{
        display: 'inline-flex', alignItems: 'center', justifyContent: 'center',
        color,
        background: bg,
        width: size + 12,
        height: size + 12,
        lineHeight: 1,
        fontSize: size,
      }}
      aria-hidden
    >
      {icon}
    </span>
  );
};

IconBox.propTypes = {
  icon: PropTypes.node,
  color: PropTypes.string,
  bg: PropTypes.string,
  size: PropTypes.number,
  radius: PropTypes.oneOf(['none','sm','md','lg','pill']),
};


