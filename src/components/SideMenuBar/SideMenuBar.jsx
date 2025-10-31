import React from 'react';
import '../../index.scss';
import './SideMenuBar.scss';

const defaultMenus = [ { label: 'Menu 1' }, { label: 'Menu 2' }, { label: 'Menu 3' } ];

const SideMenuBar = ({
  menus = defaultMenus,
  onMenuClick = () => {},
  notificationCount = '99+',
  avatarSrc = '',
  logo = null,
  style = {},
}) => {
  return (
    <aside className="side-menubar" style={style}>
      <div className="logo">{logo || <div className="logo-mark" />}</div>
      <div className="menu">
        {menus.map((m, i) => (
          <div key={i} className="menu-item" onClick={() => onMenuClick(m, i)}>
            <div className="icon" />
            <div className="label">{m.label}</div>
          </div>
        ))}
      </div>
      <div className="bottom">
        <div className="notify">{notificationCount}</div>
        {avatarSrc ? <img className="avatar" src={avatarSrc} alt="profile" /> : <div className="avatar" />}
      </div>
    </aside>
  );
};

export default SideMenuBar;


