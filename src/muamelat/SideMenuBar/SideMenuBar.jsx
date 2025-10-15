import React from 'react';
import './SideMenuBar.scss';

const items = [ { label: 'Menu 1' }, { label: 'Menu 2' }, { label: 'Menu 3' } ];

const SideMenuBar = ({ onClick = () => {} }) => {
  return (
    <aside className="side-menubar">
      <div className="logo"><div className="logo-mark" /></div>
      <div className="menu">
        {items.map((m, i) => (
          <div key={i} className="menu-item" onClick={() => onClick(m)}>
            <div className="icon" />
            <div className="label">{m.label}</div>
          </div>
        ))}
      </div>
      <div className="bottom">
        <div className="notify">99+</div>
        <div className="avatar" />
      </div>
    </aside>
  );
};

export default SideMenuBar;


