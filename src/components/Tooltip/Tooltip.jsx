import React, { useState } from 'react';
import '../../index.scss';
import './Tooltip.scss';

export const Tooltip = ({ content, width, children }) => {
  const [open, setOpen] = useState(false);
  return (
    <span className="sb-tooltip" onMouseEnter={() => setOpen(true)} onMouseLeave={() => setOpen(false)}>
      {children}
      {open ? <span className="sb-tooltip__bubble" style={{ width }}>{content}</span> : null}
    </span>
  );
};

export default Tooltip;


