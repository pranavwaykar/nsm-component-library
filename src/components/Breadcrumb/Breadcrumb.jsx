import React from 'react';
import '../../index.scss';
import './Breadcrumb.scss';
import { expandStyleProps } from '../../utils/styleSystem';

const Breadcrumb = ({ items = [], separator = '›', customProps, as, className, style, hidden, role = 'navigation', ...rest }) => {
  const Component = as || 'nav';
  const mergedStyle = { ...expandStyleProps(rest), ...(style || {}) };
  if (hidden === true && mergedStyle.display === undefined) mergedStyle.display = 'none';
  return (
    <Component className={`breadcrumb ${className || ''}`.trim()} style={mergedStyle} role={role} {...rest} {...(customProps || {})}>
      {items.map((item, idx) => (
        <span key={idx} className="crumb">
          {item}
          {idx < items.length - 1 && <span className="sep">{separator}</span>}
        </span>
      ))}
    </Component>
  );
};

export default Breadcrumb;


