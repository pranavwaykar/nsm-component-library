import React from 'react';
import './SideDrawer.scss';

const SideDrawer = ({ opened = false, onClose = () => {}, position = 'right', width = 360, title, children }) => {
  return (
    <div className={`sd-root ${opened ? 'opened' : ''}`}>
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


