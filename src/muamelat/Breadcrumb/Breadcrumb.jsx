import React from 'react';
import './Breadcrumb.scss';

const Breadcrumb = ({ items = [] }) => {
  return (
    <nav className="breadcrumb">
      {items.map((item, idx) => (
        <span key={idx} className="crumb">
          {item}
          {idx < items.length - 1 && <span className="sep">›</span>}
        </span>
      ))}
    </nav>
  );
};

export default Breadcrumb;


