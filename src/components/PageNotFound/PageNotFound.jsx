import React from 'react';
import '../../index.scss';
import './PageNotFound.scss';

export const PageNotFound = ({
  title = 'Page not found',
  description = 'The page you are looking for doesn\'t exist or has been moved.',
  ctaLabel = 'Go Home',
  onCtaClick,
  secondaryLabel = 'Contact support',
  onSecondaryClick,
}) => (
  <div className="sb-pnf">
    <div className="sb-pnf__art">
      <div className="block a" />
      <div className="block b" />
      <div className="block c" />
    </div>
    <div className="sb-pnf__code">404</div>
    <div className="sb-pnf__title">{title}</div>
    <div className="sb-pnf__desc">{description}</div>
    <div className="sb-pnf__actions">
      <button type="button" className="sb-btn sb-btn--primary storybook-button--small" onClick={onCtaClick}>{ctaLabel}</button>
      <button type="button" className="sb-btn storybook-button--small" onClick={onSecondaryClick}>{secondaryLabel}</button>
    </div>
  </div>
);

export default PageNotFound;


