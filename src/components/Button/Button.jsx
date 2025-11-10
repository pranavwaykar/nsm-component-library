import React from "react";
import PropTypes from "prop-types";
import "../../index.scss";
import "./Button.scss";
import { expandStyleProps } from "../../utils/styleSystem";

export const Button = ({
  primary = false,
  variant,
  backgroundColor = null,
  textColor = null,
  size = "medium",
  radius = "pill",
  shadow = "none",
  disabled = false,
  loading = false,
  fullWidth = false,
  uppercase = false,
  leftIcon = "",
  rightIcon = "",
  type = "button",
  indicator = false,
  count,
  label,
  className,
  as,
  style,

  tabIndex,
  title,
  draggable,
  hidden,
  dir,
  lang,
  tone,
  elevation,
  ...props
}) => {
  const effectiveVariant = variant || (primary ? "primary" : "secondary");
  const classNames = [
    "storybook-button",
    `storybook-button--${size}`,
    `storybook-button--${effectiveVariant}`,
    typeof radius === "string" ? `storybook-button--radius-${radius}` : null,
    `storybook-button--shadow-${shadow}`,
    fullWidth ? "storybook-button--fullwidth" : null,
    uppercase ? "storybook-button--uppercase" : null,
    disabled ? "is-disabled" : null,
    loading ? "is-loading" : null,
    typeof elevation === "number" ? `storybook-button--elev-${Math.max(0, Math.min(5, elevation))}` : null,
    tone && tone !== 'default' ? `storybook-button--tone-${tone}` : null,
    className,
  ]
    .filter(Boolean)
    .join(" ");

  const inlineStyle = { ...expandStyleProps(props), ...(style || {}) };
  if (backgroundColor) inlineStyle.backgroundColor = backgroundColor;
  if (textColor) inlineStyle.color = textColor;
  if (typeof radius === 'number') inlineStyle.borderRadius = radius;
  if (draggable && inlineStyle.cursor === undefined && !disabled && !loading) inlineStyle.cursor = 'grab';
  if (inlineStyle.opacity === undefined && inlineStyle['--sb-opacity']) {
    inlineStyle.opacity = inlineStyle['--sb-opacity'];
  }
  if (hidden === true && inlineStyle.display === undefined) inlineStyle.display = 'none';

  const Component = as || "button";
  return (
    <Component
      type={type}
      className={classNames}
      style={inlineStyle}
      disabled={disabled || loading}
      aria-busy={loading ? "true" : undefined}
      tabIndex={tabIndex}
      title={title}
      draggable={draggable}
      hidden={hidden}
      dir={dir}
      lang={lang}
      {...props}
    >
      {loading && (
        <span className="storybook-button__spinner" role="progressbar" aria-label="loading" />
      )}
      {leftIcon ? (
        <span className="storybook-button__icon storybook-button__icon--left" aria-hidden="true">{leftIcon}</span>
      ) : null}
      {label && <span className="storybook-button__label">{label}</span>}
      {rightIcon ? (
        <span className="storybook-button__icon storybook-button__icon--right" aria-hidden="true">{rightIcon}</span>
      ) : null}
      {typeof count === "number" ? (
        <span className="storybook-button__badge" aria-label={`count ${count}`}>{count}</span>
      ) : indicator ? (
        <span className="storybook-button__indicator" aria-hidden="true" />
      ) : null}
    </Component>
  );
};

Button.propTypes = {
  primary: PropTypes.bool,
  variant: PropTypes.oneOf(["primary","secondary","ghost","link","destructive","success","warning"]),
  backgroundColor: PropTypes.string,
  textColor: PropTypes.string,
  size: PropTypes.oneOf(["xsmall","small","medium","large","xlarge"]),
  radius: PropTypes.oneOf(["none","sm","md","lg","pill"]),
  shadow: PropTypes.oneOf(["none","sm","md","lg"]),
  label: PropTypes.string.isRequired,
  onClick: PropTypes.func,
  disabled: PropTypes.bool,
  loading: PropTypes.bool,
  fullWidth: PropTypes.bool,
  uppercase: PropTypes.bool,
  leftIcon: PropTypes.node,
  rightIcon: PropTypes.node,
  type: PropTypes.oneOf(["button","submit","reset"]),
  indicator: PropTypes.bool,
  count: PropTypes.number,
  as: PropTypes.elementType,
  style: PropTypes.object,
};

export default Button;


