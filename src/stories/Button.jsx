import React from 'react';

import PropTypes from 'prop-types';

import './shared/tokens.css';
import './Button/button.scss';

/** Primary UI component for user interaction */
export const Button = ({
  primary = false,
  variant,
  backgroundColor = null,
  textColor = null,
  size = 'medium',
  radius = 'pill',
  shadow = 'none',
  disabled = false,
  loading = false,
  fullWidth = false,
  uppercase = false,
  leftIcon = '',
  rightIcon = '',
  type = 'button',
  indicator = false,
  count,
  label,
  ...props
}) => {
  const effectiveVariant = variant || (primary ? 'primary' : 'secondary');
  const classNames = [
    'storybook-button',
    `storybook-button--${size}`,
    `storybook-button--${effectiveVariant}`,
    `storybook-button--radius-${radius}`,
    `storybook-button--shadow-${shadow}`,
    fullWidth ? 'storybook-button--fullwidth' : null,
    uppercase ? 'storybook-button--uppercase' : null,
    disabled ? 'is-disabled' : null,
    loading ? 'is-loading' : null,
  ]
    .filter(Boolean)
    .join(' ');

  const inlineStyle = {};
  if (backgroundColor) inlineStyle.backgroundColor = backgroundColor;
  if (textColor) inlineStyle.color = textColor;

  return (
    <button
      type={type}
      className={classNames}
      style={inlineStyle}
      disabled={disabled || loading}
      aria-busy={loading ? 'true' : undefined}
      {...props}
    >
      {loading && <span className="storybook-button__spinner" role="progressbar" aria-label="loading" />}
      {leftIcon ? (
        <span className="storybook-button__icon storybook-button__icon--left" aria-hidden="true">{leftIcon}</span>
      ) : null}
      {label && <span className="storybook-button__label">{label}</span>}
      {rightIcon ? (
        <span className="storybook-button__icon storybook-button__icon--right" aria-hidden="true">{rightIcon}</span>
      ) : null}
      {typeof count === 'number' ? (
        <span className="storybook-button__badge" aria-label={`count ${count}`}>{count}</span>
      ) : indicator ? (
        <span className="storybook-button__indicator" aria-hidden="true" />
      ) : null}
    </button>
  );
};

Button.propTypes = {
  /** Is this the principal call to action on the page? */
  primary: PropTypes.bool,
  /** Visual variant. If provided, overrides `primary`. */
  variant: PropTypes.oneOf([
    'primary',
    'secondary',
    'ghost',
    'link',
    'destructive',
    'success',
    'warning',
  ]),
  /** Background color override */
  backgroundColor: PropTypes.string,
  /** Text color override */
  textColor: PropTypes.string,
  /** Size */
  size: PropTypes.oneOf(['xsmall', 'small', 'medium', 'large', 'xlarge']),
  /** Border radius scale */
  radius: PropTypes.oneOf(['none', 'sm', 'md', 'lg', 'pill']),
  /** Shadow depth */
  shadow: PropTypes.oneOf(['none', 'sm', 'md', 'lg']),
  /** Button contents */
  label: PropTypes.string.isRequired,
  /** Optional click handler */
  onClick: PropTypes.func,
  /** Disabled state */
  disabled: PropTypes.bool,
  /** Loading state (shows spinner, disables button) */
  loading: PropTypes.bool,
  /** Full width button */
  fullWidth: PropTypes.bool,
  /** Uppercase label */
  uppercase: PropTypes.bool,
  /** Optional left icon (string/emoji) */
  leftIcon: PropTypes.node,
  /** Optional right icon (string/emoji) */
  rightIcon: PropTypes.node,
  /** Button type */
  type: PropTypes.oneOf(['button', 'submit', 'reset']),
  /** Show a small notification dot when true (ignored if count is set) */
  indicator: PropTypes.bool,
  /** Small numeric badge shown to the right side */
  count: PropTypes.number,
};
