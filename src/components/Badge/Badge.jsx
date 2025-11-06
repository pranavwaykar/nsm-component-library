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
      tone,
      style,
      tabIndex,
      title,
      draggable,
      contentEditable,
      dir,
      lang,
      role,
      hidden,
      m, mx, my, mt, mr, mb, ml,
      p, px, py, pt, pr, pb, pl,
      w, h, minW, maxW, minH, maxH,
      display, boxSizing, overflow, overflowX, overflowY,
      flex, flexDir, flexWrap, justify, align, alignSelf, alignContent, gap, rowGap, columnGap, flexGrow, flexShrink, flexBasis, order,
      gridCols, gridRows, gridAreas, gridCol, gridRow, gridAutoFlow, gridAutoCols, gridAutoRows, placeItems, placeContent,
      position, top, right, bottom, left, inset, zIndex,
      fontFamily, fontSize, fontWeight, lineHeight, letterSpacing, fontStyle, textAlign, textTransform, textDecoration, textOverflow, whiteSpace, wordBreak, overflowWrap,
      opacity, bg, bgColor, bgImage, bgGradient, bgClip, bgPos, bgSize, bgRepeat, bgAttachment, mixBlendMode,
      border, borderTop, borderRight, borderBottom, borderLeft, borderColor, borderWidth, borderStyle, rounded, borderRadius, outline, outlineOffset,
      boxShadow, filter, backdropFilter, backdropBlur,
      transform, transformOrigin, translateX, translateY, scale, rotate, skew,
      cursor, pointerEvents, userSelect, touchAction,
      objectFit, objectPosition, aspectRatio,
      visibility, isolation, contain, contentVisibility,
      scrollBehavior, scrollSnapType, scrollSnapAlign,
      scrollMargin, scrollMarginTop, scrollMarginRight, scrollMarginBottom, scrollMarginLeft,
      scrollPadding, scrollPaddingTop, scrollPaddingRight, scrollPaddingBottom, scrollPaddingLeft,
      ...rest
    },
    ref
  ) => {
    function expandShorthand() {
      const s = {};
      const set = (k, v) => { if (v !== undefined) s[k] = v; };
      set('margin', m); set('marginTop', mt ?? my); set('marginRight', mr ?? mx); set('marginBottom', mb ?? my); set('marginLeft', ml ?? mx);
      set('padding', p); set('paddingTop', pt ?? py); set('paddingRight', pr ?? px); set('paddingBottom', pb ?? py); set('paddingLeft', pl ?? px);
      set('width', w); set('height', h); set('minWidth', minW); set('maxWidth', maxW); set('minHeight', minH); set('maxHeight', maxH);
      set('display', display); set('boxSizing', boxSizing); set('overflow', overflow); set('overflowX', overflowX); set('overflowY', overflowY);
      set('flex', flex); set('flexDirection', flexDir); set('flexWrap', flexWrap);
      set('justifyContent', justify); set('alignItems', align); set('alignSelf', alignSelf); set('alignContent', alignContent);
      set('gap', gap); set('rowGap', rowGap); set('columnGap', columnGap);
      set('flexGrow', flexGrow); set('flexShrink', flexShrink); set('flexBasis', flexBasis); set('order', order);
      if (typeof gridCols === 'number') set('gridTemplateColumns', `repeat(${gridCols}, minmax(0,1fr))`); else set('gridTemplateColumns', gridCols);
      if (typeof gridRows === 'number') set('gridTemplateRows', `repeat(${gridRows}, auto)`); else set('gridTemplateRows', gridRows);
      set('gridTemplateAreas', gridAreas);
      set('gridColumn', gridCol); set('gridRow', gridRow);
      set('gridAutoFlow', gridAutoFlow); set('gridAutoColumns', gridAutoCols); set('gridAutoRows', gridAutoRows);
      set('placeItems', placeItems); set('placeContent', placeContent);
      set('position', position); set('top', top); set('right', right); set('bottom', bottom); set('left', left); set('inset', inset); set('zIndex', zIndex);
      set('fontFamily', fontFamily); set('fontSize', fontSize); set('fontWeight', fontWeight); set('lineHeight', lineHeight);
      set('letterSpacing', letterSpacing); set('fontStyle', fontStyle); set('textAlign', textAlign); set('textTransform', textTransform);
      set('textDecoration', textDecoration); set('textOverflow', textOverflow); set('whiteSpace', whiteSpace); set('wordBreak', wordBreak); set('overflowWrap', overflowWrap);
      set('opacity', opacity); set('background', bg ?? bgColor);
      set('backgroundImage', bgImage ?? bgGradient); set('backgroundClip', bgClip);
      set('backgroundPosition', bgPos); set('backgroundSize', bgSize); set('backgroundRepeat', bgRepeat); set('backgroundAttachment', bgAttachment);
      set('mixBlendMode', mixBlendMode);
      set('border', border); set('borderTop', borderTop); set('borderRight', borderRight); set('borderBottom', borderBottom); set('borderLeft', borderLeft);
      set('borderColor', borderColor); set('borderWidth', borderWidth); set('borderStyle', borderStyle);
      set('borderRadius', borderRadius ?? rounded);
      set('outline', outline); set('outlineOffset', outlineOffset);
      set('boxShadow', boxShadow); set('filter', filter); set('backdropFilter', backdropFilter);
      if (backdropBlur !== undefined) set('backdropFilter', `blur(${backdropBlur})`);
      set('transform', transform); set('transformOrigin', transformOrigin);
      if (translateX !== undefined || translateY !== undefined || scale !== undefined || rotate !== undefined || skew !== undefined) {
        const parts = [];
        if (translateX !== undefined) parts.push(`translateX(${translateX})`);
        if (translateY !== undefined) parts.push(`translateY(${translateY})`);
        if (scale !== undefined) parts.push(`scale(${scale})`);
        if (rotate !== undefined) parts.push(`rotate(${rotate})`);
        if (skew !== undefined) parts.push(`skew(${skew})`);
        s.transform = [s.transform, parts.join(' ')].filter(Boolean).join(' ');
      }
      set('cursor', cursor); set('pointerEvents', pointerEvents); set('userSelect', userSelect); set('touchAction', touchAction);
      set('objectFit', objectFit); set('objectPosition', objectPosition); set('aspectRatio', aspectRatio);
      set('visibility', visibility); set('isolation', isolation); set('contain', contain); set('contentVisibility', contentVisibility);
      set('scrollBehavior', scrollBehavior); set('scrollSnapType', scrollSnapType); set('scrollSnapAlign', scrollSnapAlign);
      set('scrollMargin', scrollMargin); set('scrollMarginTop', scrollMarginTop); set('scrollMarginRight', scrollMarginRight); set('scrollMarginBottom', scrollMarginBottom); set('scrollMarginLeft', scrollMarginLeft);
      set('scrollPadding', scrollPadding); set('scrollPaddingTop', scrollPaddingTop); set('scrollPaddingRight', scrollPaddingRight); set('scrollPaddingBottom', scrollPaddingBottom); set('scrollPaddingLeft', scrollPaddingLeft);
      return s;
    }

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
    ].filter(Boolean).join(" ");

    const mergedStyle = { ...expandShorthand(), ...(style || {}) };
    if (typeof radius === "number") mergedStyle.borderRadius = radius;
    if (hidden === true && mergedStyle.display === undefined) mergedStyle.display = 'none';

    return (
      <Component
        ref={ref}
        className={classes}
        style={mergedStyle}
        role={role}
        tabIndex={tabIndex}
        title={title}
        draggable={draggable}
        contentEditable={contentEditable}
        dir={dir}
        lang={lang}
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
  tone: PropTypes.oneOf(["default","subtle","strong"]),
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


