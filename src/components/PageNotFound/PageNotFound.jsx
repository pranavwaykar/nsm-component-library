import React from 'react';
import '../../index.scss';
import './PageNotFound.scss';
import '../Button/Button.scss';
import { expandStyleProps } from '../../utils/styleSystem';

export const PageNotFound = ({
  title = 'Page not found',
  description = 'The page you are looking for doesn\'t exist or has been moved.',
  ctaLabel = 'Go Home',
  secondaryLabel = 'Contact support',
  code = '404',
  shadow,
  loading = false,
  disabled = false,
  // colors
  artBgStartColor,
  artBgEndColor,
  artBorderColor,
  artBlockAColor,
  artBlockBColor,
  artBlockCColor,
  primaryButtonTextColor,
  primaryButtonBgColor,
  primaryButtonBorderColor,
  secondaryButtonTextColor,
  secondaryButtonBgColor,
  secondaryButtonBorderColor,
  // dimensions
  artWidth,
  artHeight,
  artBlockAWidth,
  artBlockAHeight,
  artBlockBWidth,
  artBlockBHeight,
  artBlockCSize,
  actionsGap,
  primaryButtonWidth,
  primaryButtonHeight,
  secondaryButtonWidth,
  secondaryButtonHeight,
  // visibility toggles
  showArt = true,
  showCode = true,
  showTitle = true,
  showDescription = true,
  showPrimary = true,
  showSecondary = true,
  // section styles and classNames
  artStyle,
  artClassName,
  codeStyle,
  codeClassName,
  codeColor,
  codeFontFamily,
  codeFontSize,
  codeWidth,
  codeHeight,
  titleStyle,
  titleClassName,
  titleColor,
  titleFontFamily,
  titleFontSize,
  titleWidth,
  titleHeight,
  descriptionStyle,
  descriptionClassName,
  descriptionColor,
  descriptionFontFamily,
  descriptionFontSize,
  descriptionWidth,
  descriptionHeight,
  actionsStyle,
  actionsClassName,
  primaryButtonStyle,
  primaryButtonClassName,
  secondaryButtonStyle,
  secondaryButtonClassName,
  // click handlers
  primaryOnClick,
  secondaryOnClick,
  // back-compat (deprecated names)
  onCtaClick,
  onSecondaryClick,
  as,
  className,
  style,
  hidden,
  ...rest
}) => {
  const Root = as || 'div';
  const mergedStyle = { ...expandStyleProps(rest), ...(style || {}) };
  if (shadow) {
    const smap = { none: '0', sm: '1', md: '3', lg: '5' };
    const key = smap[String(shadow)] || null;
    if (key) mergedStyle.boxShadow = `var(--sb-shadow-${key})`;
    if (shadow === 'none') mergedStyle.boxShadow = 'var(--sb-shadow-0)';
  }
  if (hidden) mergedStyle.display = mergedStyle.display || 'none';
  const merge = (base, extra) => ({ ...(base || {}), ...(extra || {}) });
  const codeInline = merge(codeStyle, {
    color: codeColor,
    fontFamily: codeFontFamily,
    fontSize: codeFontSize,
    width: codeWidth,
    height: codeHeight,
  });
  const titleInline = merge(titleStyle, {
    color: titleColor,
    fontFamily: titleFontFamily,
    fontSize: titleFontSize,
    width: titleWidth,
    height: titleHeight,
  });
  const descriptionInline = merge(descriptionStyle, {
    color: descriptionColor,
    fontFamily: descriptionFontFamily,
    fontSize: descriptionFontSize,
    width: descriptionWidth,
    height: descriptionHeight,
  });
  const artInline = merge(artStyle, {
    background: (artBgStartColor || artBgEndColor)
      ? `linear-gradient(180deg, ${artBgStartColor || '#f7fafc'}, ${artBgEndColor || '#eef3f8'})`
      : undefined,
    boxShadow: artBorderColor ? `inset 0 0 0 1px ${artBorderColor}` : undefined,
    width: artWidth,
    height: artHeight,
  });
  const blockAStyle = {
    ...(artBlockAColor ? { background: artBlockAColor } : {}),
    ...(artBlockAWidth ? { width: artBlockAWidth } : {}),
    ...(artBlockAHeight ? { height: artBlockAHeight } : {}),
  };
  const blockBStyle = {
    ...(artBlockBColor ? { background: artBlockBColor } : {}),
    ...(artBlockBWidth ? { width: artBlockBWidth } : {}),
    ...(artBlockBHeight ? { height: artBlockBHeight } : {}),
  };
  const blockCStyle = {
    ...(artBlockCColor ? { background: artBlockCColor } : {}),
    ...(artBlockCSize ? { width: artBlockCSize, height: artBlockCSize } : {}),
  };
  const primaryBtnInline = merge(primaryButtonStyle, {
    color: primaryButtonTextColor,
    background: primaryButtonBgColor,
    borderColor: primaryButtonBorderColor,
    width: primaryButtonWidth,
    height: primaryButtonHeight,
  });
  const secondaryBtnInline = merge(secondaryButtonStyle, {
    color: secondaryButtonTextColor,
    background: secondaryButtonBgColor,
    borderColor: secondaryButtonBorderColor,
    width: secondaryButtonWidth,
    height: secondaryButtonHeight,
  });
  return (
    <Root className={`sb-pnf ${loading ? 'is-loading' : ''} ${disabled ? 'is-disabled' : ''} ${className || ''}`.trim()} style={mergedStyle} {...rest}>
      {showArt && (
        <div className={`sb-pnf__art ${artClassName || ''}`.trim()} style={artInline}>
          <div className="block a" style={blockAStyle} />
          <div className="block b" style={blockBStyle} />
          <div className="block c" style={blockCStyle} />
        </div>
      )}
      {showCode && (
        <div className={`sb-pnf__code ${codeClassName || ''}`.trim()} style={codeInline}>{code}</div>
      )}
      {showTitle && (
        <div className={`sb-pnf__title ${titleClassName || ''}`.trim()} style={titleInline}>{title}</div>
      )}
      {showDescription && (
        <div className={`sb-pnf__desc ${descriptionClassName || ''}`.trim()} style={descriptionInline}>{description}</div>
      )}
      {(showPrimary || showSecondary) && (
        <div className={`sb-pnf__actions ${actionsClassName || ''}`.trim()} style={merge(actionsStyle, actionsGap ? { gap: actionsGap } : undefined)}>
          {showPrimary && (
            <button
              type="button"
              className={`sb-btn sb-btn--primary sb-btn--small storybook-button ${primaryButtonClassName || ''}`.trim()}
              style={primaryBtnInline}
              onClick={primaryOnClick || onCtaClick}
              disabled={disabled}
            >
              {ctaLabel}
            </button>
          )}
          {showSecondary && (
            <button
              type="button"
              className={`sb-btn sb-btn--secondary sb-btn--small storybook-button ${secondaryButtonClassName || ''}`.trim()}
              style={secondaryBtnInline}
              onClick={secondaryOnClick || onSecondaryClick}
              disabled={disabled}
            >
              {secondaryLabel}
            </button>
          )}
        </div>
      )}
    </Root>
  );
};

export default PageNotFound;


