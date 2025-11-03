import React from 'react';
import '../../index.scss';
import './SideMenuBar.scss';

const defaultMenus = [
  { label: 'Home', count: 0 },
  { label: 'Menu 2', count: 2 },
  { label: 'Menu 3', count: 0 },
];

const SideMenuBar = ({
  menus = defaultMenus,
  activeIndex = 0,
  onMenuClick = () => {},
  onLogoClick = () => {},
  onProfileClick = () => {},
  notificationCount = '99+',
  avatarSrc = '',
  logo = null,
  style = {},
}) => {
  return (
    <aside className="side-menubar" style={style}>
      <button className="logo" type="button" onClick={onLogoClick} aria-label="App Home">
        {logo || <div className="logo-mark" />}
      </button>
      <nav className="menu" aria-label="Main">
        {menus.map((m, i) => (
          <button
            key={i}
            type="button"
            className={`menu-item ${i === activeIndex ? 'is-active' : ''} ${m?.onClick ? 'is-clickable' : ''}`}
            onClick={() => onMenuClick(m, i)}
            aria-current={i === activeIndex ? 'page' : undefined}
          >
            <div className="icon">{m.icon || null}</div>
            <div className="label">{m.label}</div>
            {typeof m.count === 'number' && m.count > 0 ? (
              <span className="count" aria-label={`${m.count} items`}>{m.count > 99 ? '99+' : m.count}</span>
            ) : null}
          </button>
        ))}
      </nav>
      <div className="bottom">
        <div className="notify" aria-label="notifications">{notificationCount}</div>
        {avatarSrc ? (
          <button type="button" className="avatar btn" onClick={onProfileClick} aria-label="Profile">
            <img src={avatarSrc} alt="profile" />
          </button>
        ) : (
          <button type="button" className="avatar" onClick={onProfileClick} aria-label="Profile" />
        )}
      </div>
    </aside>
  );
};

export default SideMenuBar;


