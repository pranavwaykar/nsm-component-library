import React, { forwardRef } from "react";
import PropTypes from "prop-types";
import "../../index.scss";
import "./Badge.scss";
import { expandStyleProps } from "../../utils/styleSystem";

export const Badge = forwardRef(
  (
    {
      as,
      label,
      children,
      variant = "neutral",
      dot = false,
      pill = true,
      className,
      size = "sm",
      color = "neutral",
      radius = "md",
      elevation = 0,
      shadow,
      tone,
      disabled = false,
      loading = false,
      indicator,
      icon,
      onClick,
      onKeyDown,
      style,
      tabIndex,
      title,
      draggable,
      contentEditable,
      dir,
      lang,
      role,
      hidden,
      ...rest
    },
    ref
  ) => {
    const Component = as || "span";
    const safeVariant = ["solid", "outline", "ghost", "link"].includes(variant) ? variant : "solid";
    const radiusClass = typeof radius === "number" ? null : `sb-badge--radius-${radius}`;
    const elevClass = typeof elevation === "number" ? `sb-badge--elev-${Math.max(0, Math.min(5, elevation))}` : null;
    const toneClass = tone && tone !== 'default' ? `sb-badge--tone-${tone}` : null;
    const classes = [
      "sb-badge",
      pill ? "sb-badge--pill" : null,
      `sb-badge--variant-${safeVariant}`,
      `sb-badge--size-${size}`,
      `sb-badge--color-${color}`,
      radiusClass,
      elevClass,
      toneClass,
      shadow ? `sb-shadow-${shadow}` : null,
      className,
      disabled ? 'is-disabled' : null,
      loading ? 'is-loading' : null,
    ].filter(Boolean).join(" ");

    const mergedStyle = { ...expandStyleProps(rest), ...(style || {}) };
    if (draggable && mergedStyle.cursor === undefined && !disabled && !loading) mergedStyle.cursor = 'grab';
    if (typeof radius === "number") mergedStyle.borderRadius = radius;
    if (hidden === true && mergedStyle.display === undefined) mergedStyle.display = 'none';

    const showIndicator = (indicator ?? dot) === true;
    const isInteractive = typeof onClick === 'function' && !disabled;
    const computedRole = role || (isInteractive ? 'button' : undefined);
    const computedTabIndex = tabIndex ?? (isInteractive ? 0 : undefined);
    const isNativeButton = (Component === 'button');
    const isLoading = !!loading;
    const handleKeyDown = (e) => {
      if (typeof onKeyDown === 'function') onKeyDown(e);
      if (e.defaultPrevented) return;
      if (isInteractive && (e.key === 'Enter' || e.key === ' ')) {
        e.preventDefault();
        onClick?.(e);
      }
    };

    return (
      <Component
        ref={ref}
        className={classes}
        style={mergedStyle}
        role={computedRole}
        tabIndex={computedTabIndex}
        aria-disabled={disabled || undefined}
        aria-busy={isLoading || undefined}
        disabled={isNativeButton && disabled ? true : undefined}
        title={title}
        draggable={draggable}
        contentEditable={contentEditable}
        dir={dir}
        lang={lang}
        hidden={hidden}
        onClick={disabled ? undefined : onClick}
        onKeyDown={handleKeyDown}
        {...rest}
      >
        {isLoading ? (
          <span className="sb-badge__spinner" aria-hidden />
        ) : icon ? (
          <span className="sb-badge__icon" aria-hidden>{icon}</span>
        ) : (
          showIndicator ? <span className="sb-badge__dot" /> : null
        )}
        {children ?? label}
      </Component>
    );
  }
);

Badge.propTypes = {
  as: PropTypes.elementType,
  label: PropTypes.string,
  children: PropTypes.node,
  variant: PropTypes.oneOf(["solid", "outline", "ghost", "link"]),
  size: PropTypes.oneOf(["xs", "sm", "md", "lg", "xl"]),
  color: PropTypes.oneOf(["neutral","primary","success","warning","error","info"]),
  radius: PropTypes.oneOfType([PropTypes.oneOf(["none","sm","md","lg","full"]), PropTypes.number]),
  elevation: PropTypes.oneOf([0,1,2,3,4,5]),
  shadow: PropTypes.string,
  tone: PropTypes.oneOf(["default","subtle","strong"]),
  dot: PropTypes.bool,
  pill: PropTypes.bool,
  disabled: PropTypes.bool,
  loading: PropTypes.bool,
  indicator: PropTypes.bool,
  icon: PropTypes.node,
  onClick: PropTypes.func,
  onKeyDown: PropTypes.func,
  className: PropTypes.string,
  style: PropTypes.object,
  tabIndex: PropTypes.number,
  title: PropTypes.string,
  draggable: PropTypes.bool,
  hidden: PropTypes.bool,
};

export default Badge;


