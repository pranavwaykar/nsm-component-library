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
  if (hidden) mergedStyle.display = mergedStyle.display || 'none';
  return (
    <Root className={`sb-pnf ${className || ''}`.trim()} style={mergedStyle} {...rest}>
      <div className="sb-pnf__art">
        <div className="block a" />
        <div className="block b" />
        <div className="block c" />
      </div>
      <div className="sb-pnf__code">404</div>
      <div className="sb-pnf__title">{title}</div>
      <div className="sb-pnf__desc">{description}</div>
      <div className="sb-pnf__actions">
        <button type="button" className="sb-btn sb-btn--primary sb-btn--small storybook-button" onClick={primaryOnClick || onCtaClick}>{ctaLabel}</button>
        <button type="button" className="sb-btn sb-btn--secondary sb-btn--small storybook-button" onClick={secondaryOnClick || onSecondaryClick}>{secondaryLabel}</button>
      </div>
    </Root>
  );
};

export default PageNotFound;


