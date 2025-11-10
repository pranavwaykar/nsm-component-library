import React from 'react';
import './SideDrawer.scss';
import { expandStyleProps } from '../../utils/styleSystem';

const SideDrawer = ({ opened = false, onClose = () => {}, position = 'right', width = 360, title, children, className, style, hidden, ...rest }) => {
  const mergedStyle = { ...expandStyleProps(rest), ...(style || {}) };
  if (hidden === true && mergedStyle.display === undefined) mergedStyle.display = 'none';
  return (
    <div className={`sd-root ${opened ? 'opened' : ''} ${className || ''}`.trim()} style={mergedStyle} {...rest}>
      <div className="sd-overlay" onClick={onClose} />
      <div className={`sd-panel ${position}`} style={{ width }}>
        <div className="sd-header">
          <div className="sd-title">{title}</div>
          <button className="sd-close" onClick={onClose} aria-label="Close">
            ×
          </button>
        </div>
        <div className="sd-content">{children}</div>
      </div>
    </div>
  );
};

export default SideDrawer;


