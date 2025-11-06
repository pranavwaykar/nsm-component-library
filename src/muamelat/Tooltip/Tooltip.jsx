import React, { useState } from 'react';
import './Tooltip.scss';

const Tooltip = ({ children, content = '', width = 160 }) => {
  const [open, setOpen] = useState(false);
  return (
    <span
      className="tooltip-wrap"
      onMouseEnter={() => setOpen(true)}
      onMouseLeave={() => setOpen(false)}
    >
      <span style={{ border: '1px solid #cbd5e1', padding: '4px 8px', borderRadius: 6 }}>{children}</span>
      {open && (
        <span className="tooltip-pop" style={{ maxWidth: width }}>
          {content}
        </span>
      )}
    </span>
  );
};

export default Tooltip;


