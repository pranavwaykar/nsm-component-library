import React from 'react';
import './SideDrawer.scss';
import { expandStyleProps } from '../../utils/styleSystem';

const SideDrawer = ({ opened = false, onClose = () => {}, position = 'right', title, content = 'Drawer Content Here NowThis is Drawer Content Which Is Replaceable', children, shadow = 'none', loading = false, disabled = false, overlayColor, overlayOpacity, overlayBlur, panelBgColor, panelRadius, panelMinWidth, headerBgColor, headerBorderColor, titleColor, titleFontSize, titleFontWeight, closeButtonColor, closeButtonSize, headerPadding, contentPadding, className, style, hidden, ...rest }) => {
  // Style-system props should apply to the panel, not the root
  const panelSystemStyle = expandStyleProps(rest);
  const rootStyle = { ...(style || {}) };
  if (hidden === true && rootStyle.display === undefined) rootStyle.display = 'none';
  // accept width via style-system prop 'w' or standard 'width' (from rest)
  const desiredPanelWidth = rest?.w || rest?.width;
  let panelStyle = { ...panelSystemStyle };
  if (desiredPanelWidth) panelStyle.width = desiredPanelWidth;
  if (shadow) {
    const smap = { none: '0', sm: '1', md: '3', lg: '5' };
    const key = smap[String(shadow)] || null;
    panelStyle.boxShadow = shadow === 'none' ? 'var(--sb-shadow-0)' : (key ? `var(--sb-shadow-${key})` : panelStyle.boxShadow);
  }
  if (panelBgColor) panelStyle.background = panelBgColor;
  if (panelRadius) panelStyle.borderRadius = panelRadius;
  if (panelMinWidth) panelStyle.minWidth = panelMinWidth;
  const headerStyle = {
    background: headerBgColor,
    borderBottomColor: headerBorderColor,
    ...(headerPadding ? { padding: headerPadding } : {}),
  };
  const titleStyle = { color: titleColor, ...(titleFontSize ? { fontSize: titleFontSize } : {}), ...(titleFontWeight ? { fontWeight: titleFontWeight } : {}) };
  const closeStyle = { color: closeButtonColor, ...(closeButtonSize ? { fontSize: closeButtonSize } : {}) };
  const contentStyle = contentPadding ? { padding: contentPadding } : undefined;
  return (
    <div className={`sd-root ${opened ? 'opened' : ''} ${disabled ? 'is-disabled' : ''} ${className || ''}`.trim()} style={rootStyle} {...rest}>
      <div
        className="sd-overlay"
        onClick={() => { if (!disabled) onClose(); }}
        style={{
          ...(overlayColor ? { background: overlayColor } : {}),
          ...(overlayOpacity != null ? { opacity: overlayOpacity } : {}),
          ...(overlayBlur ? { backdropFilter: `blur(${overlayBlur})` } : {}),
        }}
      />
      <div className={`sd-panel ${position} ${loading ? 'is-loading' : ''}`.trim()} style={panelStyle}>
        <div className="sd-header" style={headerStyle}>
          <div className="sd-title" style={titleStyle}>{title}</div>
          <button className="sd-close" onClick={() => { if (!disabled) onClose(); }} aria-label="Close" disabled={disabled} style={closeStyle}>
            ×
          </button>
        </div>
        <div className="sd-content" style={contentStyle}>{content != null ? content : children}</div>
      </div>
    </div>
  );
};

export default SideDrawer;


