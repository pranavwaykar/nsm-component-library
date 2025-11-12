import React from 'react';
import './SideDrawer.scss';
import { expandStyleProps } from '../../utils/styleSystem';

const SideDrawer = ({ opened = false, onClose = () => {}, position = 'right', width = 360, title, children, shadow, loading = false, disabled = false, overlayColor, panelBgColor, headerBgColor, headerBorderColor, titleColor, closeButtonColor, className, style, hidden, ...rest }) => {
  const mergedStyle = { ...expandStyleProps(rest), ...(style || {}) };
  if (hidden === true && mergedStyle.display === undefined) mergedStyle.display = 'none';
  let panelStyle = { width };
  if (shadow) {
    const smap = { none: '0', sm: '1', md: '3', lg: '5' };
    const key = smap[String(shadow)] || null;
    panelStyle.boxShadow = shadow === 'none' ? 'var(--sb-shadow-0)' : (key ? `var(--sb-shadow-${key})` : panelStyle.boxShadow);
  }
  if (panelBgColor) panelStyle.background = panelBgColor;
  const headerStyle = {
    background: headerBgColor,
    borderBottomColor: headerBorderColor,
  };
  const titleStyle = { color: titleColor };
  const closeStyle = { color: closeButtonColor };
  return (
    <div className={`sd-root ${opened ? 'opened' : ''} ${loading ? 'is-loading' : ''} ${disabled ? 'is-disabled' : ''} ${className || ''}`.trim()} style={mergedStyle} {...rest}>
      <div className="sd-overlay" onClick={() => { if (!disabled) onClose(); }} style={overlayColor ? { background: overlayColor } : undefined} />
      <div className={`sd-panel ${position}`} style={panelStyle}>
        <div className="sd-header" style={headerStyle}>
          <div className="sd-title" style={titleStyle}>{title}</div>
          <button className="sd-close" onClick={() => { if (!disabled) onClose(); }} aria-label="Close" disabled={disabled} style={closeStyle}>
            ×
          </button>
        </div>
        <div className="sd-content">{children}</div>
      </div>
    </div>
  );
};

export default SideDrawer;


