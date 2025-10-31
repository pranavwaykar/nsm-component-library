import React, { forwardRef } from "react";
import PropTypes from "prop-types";
import "../../index.scss";
import "./Badge.scss";

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
      style,
      tabIndex,
      title,
      draggable,
      hidden,
      // style-system shorthand (optional)
      m, mx, my, mt, mr, mb, ml,
      p, px, py, pt, pr, pb, pl,
      w, h, minW, maxW, minH, maxH,
      display, boxSizing, overflow, overflowX, overflowY,
      rounded,
      bg, bgColor,
      cursor, pointerEvents, userSelect, touchAction,
      position, top, right, bottom, left, inset, zIndex,
      fontFamily, fontSize, fontWeight, lineHeight, letterSpacing, fontStyle, textAlign, textTransform, textDecoration, textOverflow, whiteSpace, wordBreak, overflowWrap,
      ...rest
    },
    ref
  ) => {
    function expandShorthand() {
      const s = {};
      const set = (k, v) => { if (v !== undefined) s[k] = v; };
      // spacing
      set('margin', m); set('marginTop', mt ?? my); set('marginRight', mr ?? mx); set('marginBottom', mb ?? my); set('marginLeft', ml ?? mx);
      set('padding', p); set('paddingTop', pt ?? py); set('paddingRight', pr ?? px); set('paddingBottom', pb ?? py); set('paddingLeft', pl ?? px);
      // sizing
      set('width', w); set('height', h); set('minWidth', minW); set('maxWidth', maxW); set('minHeight', minH); set('maxHeight', maxH);
      // layout
      set('display', display); set('boxSizing', boxSizing); set('overflow', overflow); set('overflowX', overflowX); set('overflowY', overflowY);
      // position
      set('position', position); set('top', top); set('right', right); set('bottom', bottom); set('left', left); set('inset', inset); set('zIndex', zIndex);
      // typography
      set('fontFamily', fontFamily); set('fontSize', fontSize); set('fontWeight', fontWeight); set('lineHeight', lineHeight);
      set('letterSpacing', letterSpacing); set('fontStyle', fontStyle); set('textAlign', textAlign); set('textTransform', textTransform);
      set('textDecoration', textDecoration); set('textOverflow', textOverflow); set('whiteSpace', whiteSpace); set('wordBreak', wordBreak); set('overflowWrap', overflowWrap);
      // color/background
      set('background', bg ?? bgColor); set('cursor', cursor); set('pointerEvents', pointerEvents); set('userSelect', userSelect); set('touchAction', touchAction);
      // borders radius
      set('borderRadius', rounded);
      return s;
    }

    const Component = as || "span";
    const safeVariant = ["solid", "outline", "ghost", "link"].includes(variant) ? variant : "solid";
    const radiusClass = typeof radius === "number" ? null : `sb-badge--radius-${radius}`;
    const elevClass = typeof elevation === "number" ? `sb-badge--elev-${Math.max(0, Math.min(5, elevation))}` : null;
    const classes = [
      "sb-badge",
      pill ? "sb-badge--pill" : null,
      `sb-badge--variant-${safeVariant}`,
      `sb-badge--size-${size}`,
      `sb-badge--color-${color}`,
      radiusClass,
      elevClass,
      shadow ? `sb-shadow-${shadow}` : null,
      className,
    ].filter(Boolean).join(" ");

    const mergedStyle = { ...expandShorthand(), ...(style || {}) };
    if (typeof radius === "number") mergedStyle.borderRadius = radius;
    if (hidden === true && mergedStyle.display === undefined) mergedStyle.display = 'none';

    return (
      <Component
        ref={ref}
        className={classes}
        style={mergedStyle}
        tabIndex={tabIndex}
        title={title}
        draggable={draggable}
        hidden={hidden}
        {...rest}
      >
        {dot ? <span className="sb-badge__dot" /> : null}
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
  dot: PropTypes.bool,
  pill: PropTypes.bool,
  className: PropTypes.string,
  style: PropTypes.object,
  tabIndex: PropTypes.number,
  title: PropTypes.string,
  draggable: PropTypes.bool,
  hidden: PropTypes.bool,
};

export default Badge;


