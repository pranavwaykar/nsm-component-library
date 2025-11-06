import React from 'react';
import './SideMenu.scss';
import Carousel from './Carousal';
import { expandStyleProps } from '../../utils/styleSystem';

const items = [
  { label: 'Panorama', icon: 'icon-panorama' },
  { label: 'Transaction', icon: 'icon-transaction' },
  { label: 'Documents', icon: 'icon-docs' },
  { label: 'Emails', icon: 'icon-email' },
  { label: 'Reports', icon: 'icon-report' },
];

const SideMenu = ({ onNavigate = () => {}, as, className, style, hidden, ...rest }) => {
  const Component = as || 'div';
  const merged = { ...expandStyleProps(rest), ...(style || {}) };
  if (hidden === true && merged.display === undefined) merged.display = 'none';
  return (
    <Component className={`side-menu ${className || ''}`.trim()} style={merged} {...rest}>
      <div className="sm-logo">
        <div className="sml-thumb">
          <div className="sml-light" />
          <div className="sml-thumb-svg" />
        </div>
        <div className="sm-logo-content">Muamelat</div>
      </div>

      <div className="sm-menus">
        {items.map((m, idx) => (
          <div key={idx} className="menu-comp" title={m.label} onClick={() => onNavigate(m)}>
            <div className="mc-icon"><i className={m.icon} /></div>
            <div className="mc-content">{m.label}</div>
          </div>
        ))}

        <div style={{ width: '100%', marginTop: 8, overflow: 'hidden' }}>
          <Carousel>
            <div className="docsss">
              <div className="header"><h3>Privacy Policy</h3></div>
              <div className="content-body" style={{ padding: 16 }}>
                <p>Preview content slide 1</p>
              </div>
            </div>
            <div className="docsss">
              <div className="header"><h3>Clarification Text</h3></div>
              <div className="content-body" style={{ padding: 16 }}>
                <p>Preview content slide 2</p>
              </div>
            </div>
          </Carousel>
        </div>
      </div>

      <div className="sm-profile">
        <div className="smp-img" />
      </div>
    </Component>
  );
};

export default SideMenu;


