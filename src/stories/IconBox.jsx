import React from 'react';
import PropTypes from 'prop-types';
import './shared/tokens.css';
import './IconBox/iconbox.scss';

export const IconBox = ({
  icon,
  count,
  label,
  variant = 'neutral',
  size = 'md',
  indicator = false,
  onClick,
}) => {
  const classNames = [
    'sb-iconbox',
    `sb-iconbox--${variant}`,
    `sb-iconbox--${size}`,
    onClick ? 'is-clickable' : null,
  ]
    .filter(Boolean)
    .join(' ');

  return (
    <div className={classNames} role={onClick ? 'button' : undefined} tabIndex={onClick ? 0 : undefined} onClick={onClick} onKeyDown={(e) => {
      if (!onClick) return;
      if (e.key === 'Enter' || e.key === ' ') {
        e.preventDefault();
        onClick();
      }
    }}>
      <div className="sb-iconbox__icon" aria-hidden>
        {icon}
        {indicator ? <span className="sb-iconbox__dot" /> : null}
      </div>
      {typeof count === 'number' ? (
        <div className="sb-iconbox__count">{count}</div>
      ) : null}
      {label ? <div className="sb-iconbox__label">{label}</div> : null}
    </div>
  );
};

IconBox.propTypes = {
  icon: PropTypes.node,
  count: PropTypes.number,
  label: PropTypes.string,
  variant: PropTypes.oneOf(['neutral', 'primary', 'success', 'warning', 'error', 'info']),
  size: PropTypes.oneOf(['sm', 'md', 'lg']),
  indicator: PropTypes.bool,
  onClick: PropTypes.func,
};


