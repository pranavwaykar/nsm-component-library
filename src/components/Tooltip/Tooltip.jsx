import React, { useState } from 'react';
import '../../index.scss';
import './Tooltip.scss';
import { expandStyleProps } from '../../utils/styleSystem';

export const Tooltip = ({ content, width, as, style, hidden, children, open: controlledOpen, defaultOpen = false, onOpenChange, ...rest }) => {
  const [internalOpen, setInternalOpen] = useState(defaultOpen);
  const open = controlledOpen !== undefined ? controlledOpen : internalOpen;
  const setOpen = (v) => { if (controlledOpen === undefined) setInternalOpen(v); onOpenChange?.(v); };
  const Component = as || 'span';
  const merged = { ...expandStyleProps(rest), ...(style || {}) };
  if (hidden === true && merged.display === undefined) merged.display = 'none';
  return (
    <Component className="sb-tooltip" onMouseEnter={() => setOpen(true)} onMouseLeave={() => setOpen(false)} style={merged} {...rest}>
      {children}
      {open ? <span className="sb-tooltip__bubble" style={{ width }}>{content}</span> : null}
    </Component>
  );
};

export default Tooltip;


