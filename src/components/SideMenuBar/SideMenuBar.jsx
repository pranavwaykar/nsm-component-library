import React from 'react';
import '../../index.scss';
import './SideMenuBar.scss';
import { expandStyleProps } from '../../utils/styleSystem';

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
  shadow,
  loading = false,
  disabled = false,
  // colors
  sideMenuBgColor,
  sideMenuTextColor,
  logoMarkBackground,
  menuItemBgColor,
  menuItemActiveBgColor,
  menuItemIconBgColor,
  menuItemLabelColor,
  menuItemCountBgColor,
  menuItemCountTextColor,
  notifyBgColor,
  notifyTextColor,
  avatarBgColor,
  avatarBorderColor,
  // dimensions
  sideMenuWidth,
  sideMenuHeight,
  logoSize,
  menuItemPaddingY,
  menuItemGap,
  menuIconSize,
  menuLabelFontSize,
  countBadgeHeight,
  countBadgeMinWidth,
  notifyFontSize,
  avatarSize,
  as,
  className,
  style = {},
  hidden,
  ...rest
}) => {
  const Component = as || 'aside';
  const mergedStyle = { ...expandStyleProps(rest), ...(style || {}) };
  if (sideMenuBgColor) mergedStyle.background = sideMenuBgColor;
  if (sideMenuTextColor) mergedStyle.color = sideMenuTextColor;
  if (sideMenuWidth) mergedStyle.width = sideMenuWidth;
  if (sideMenuHeight) mergedStyle.height = sideMenuHeight;
  if (shadow) {
    const smap = { none: '0', sm: '1', md: '3', lg: '5' };
    const key = smap[String(shadow)] || null;
    if (key) mergedStyle.boxShadow = `var(--sb-shadow-${key})`;
    if (shadow === 'none') mergedStyle.boxShadow = 'var(--sb-shadow-0)';
  }
  if (hidden === true && mergedStyle.display === undefined) mergedStyle.display = 'none';
  const classes = ['side-menubar', loading ? 'is-loading' : '', disabled ? 'is-disabled' : '', className].filter(Boolean).join(' ');
  return (
    <Component className={classes} style={mergedStyle} {...rest}>
      <button className="logo" type="button" onClick={onLogoClick} aria-label="App Home" style={logoSize ? { padding: 0 } : undefined}>
        {logo || <div className="logo-mark" style={{ ...(logoMarkBackground ? { background: logoMarkBackground } : {}), ...(logoSize ? { width: logoSize, height: logoSize } : {}) }} />}
      </button>
      <nav className="menu" aria-label="Main">
        {menus.map((m, i) => (
          <button
            key={i}
            type="button"
            className={`menu-item ${i === activeIndex ? 'is-active' : ''} ${m?.onClick ? 'is-clickable' : ''}`}
            onClick={() => onMenuClick(m, i)}
            aria-current={i === activeIndex ? 'page' : undefined}
            style={{ background: i === activeIndex ? menuItemActiveBgColor || menuItemBgColor : menuItemBgColor, ...(menuItemPaddingY ? { paddingTop: menuItemPaddingY, paddingBottom: menuItemPaddingY } : {}), ...(menuItemGap ? { gap: menuItemGap } : {}) }}
          >
            <div className="icon" style={{ ...(menuItemIconBgColor ? { background: menuItemIconBgColor } : {}), ...(menuIconSize ? { width: menuIconSize, height: menuIconSize } : {}) }}>{m.icon || null}</div>
            <div className="label" style={{ ...(menuItemLabelColor ? { color: menuItemLabelColor } : {}), ...(menuLabelFontSize ? { fontSize: menuLabelFontSize } : {}) }}>{m.label}</div>
            {typeof m.count === 'number' && m.count > 0 ? (
              <span className="count" aria-label={`${m.count} items`} style={{ background: menuItemCountBgColor, color: menuItemCountTextColor, ...(countBadgeHeight ? { height: countBadgeHeight } : {}), ...(countBadgeMinWidth ? { minWidth: countBadgeMinWidth } : {}) }}>{m.count > 99 ? '99+' : m.count}</span>
            ) : null}
          </button>
        ))}
      </nav>
      <div className="bottom">
        <div className="notify" aria-label="notifications" style={{ background: notifyBgColor, color: notifyTextColor, ...(notifyFontSize ? { fontSize: notifyFontSize } : {}) }}>{notificationCount}</div>
        {avatarSrc ? (
          <button type="button" className="avatar btn" onClick={onProfileClick} aria-label="Profile" style={{ background: avatarBgColor, borderColor: avatarBorderColor, ...(avatarSize ? { width: avatarSize, height: avatarSize } : {}) }}>
            <img src={avatarSrc} alt="profile" />
          </button>
        ) : (
          <button type="button" className="avatar" onClick={onProfileClick} aria-label="Profile" style={{ background: avatarBgColor, borderColor: avatarBorderColor, ...(avatarSize ? { width: avatarSize, height: avatarSize } : {}) }} />
        )}
      </div>
    </Component>
  );
};

export default SideMenuBar;


