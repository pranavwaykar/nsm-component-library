import React, { useState, useMemo } from 'react';
import '../../index.scss';
import './SideMenuBar.scss';
import { expandStyleProps } from '../../utils/styleSystem';

const defaultMenus = [
  { label: 'Home', count: 0 },
  { label: 'Menu 2', count: 2 },
  { label: 'Menu 3', count: 0 },
];

const SideMenuBar = ({
  data,
  // legacy props (kept for compat; prefer `data`)
  menus = defaultMenus,
  activeIndex,
  onMenuClick = () => {},
  onLogoClick = () => {},
  onProfileClick = () => {},
  onNotificationClick = () => {},
  notificationCount = '99+',
  avatarSrc = '',
  avatar, // optional node override for avatar
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
  logoPadding,
  logoRadius,
  menuItemPaddingY,
  menuItemPaddingX,
  menuItemGap,
  menuItemRadius,
  menuIconSize,
  menuLabelFontSize,
  menuLabelFontWeight,
  countBadgeHeight,
  countBadgeMinWidth,
  countBadgeFontSize,
  notifyFontSize,
  notifyPaddingX,
  notifyPaddingY,
  avatarSize,
  as,
  className,
  style = {},
  hidden,
  ...rest
}) => {
  // Structured data support
  const {
    logo: dataLogo,
    items: dataItems,
    bottom: dataBottom,
  } = (data && typeof data === 'object') ? data : {};
  const resolvedLogo = dataLogo !== undefined ? dataLogo : logo;
  const resolvedMenus = useMemo(() => (Array.isArray(dataItems) ? dataItems : menus) || [], [dataItems, menus]);
  const resolvedNotify = (dataBottom && dataBottom.notificationCount !== undefined) ? dataBottom.notificationCount : notificationCount;
  const resolvedAvatar = (dataBottom && dataBottom.avatarSrc !== undefined) ? dataBottom.avatarSrc : (avatarSrc || null);
  const avatarNode = avatar || null;

  // Active item handling (controlled or uncontrolled)
  const [internalActive, setInternalActive] = useState(0);
  const currentActive = activeIndex !== undefined ? activeIndex : internalActive;

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
    <Component className={classes} style={mergedStyle} role="navigation" aria-label="Side menu" {...rest}>
      <button className="logo" type="button" onClick={onLogoClick} aria-label="App Home" style={{ ...(logoPadding ? { padding: logoPadding } : {}) }}>
        {(() => {
          const fallback = <div className="logo-mark" style={{ ...(logoMarkBackground ? { background: logoMarkBackground } : {}), ...(logoSize ? { width: logoSize, height: logoSize } : {}), ...(logoRadius ? { borderRadius: logoRadius } : {}) }} />;
        // render node if valid, string if string, else fallback
          if (React.isValidElement(resolvedLogo)) return resolvedLogo;
          if (typeof resolvedLogo === 'string' || typeof resolvedLogo === 'number') return <span>{resolvedLogo}</span>;
          return fallback;
        })()}
      </button>
      <nav className="menu" aria-label="Main">
        {resolvedMenus.map((m, i) => (
          <button
            key={i}
            type="button"
            className={`menu-item ${i === currentActive ? 'is-active' : ''} ${m?.onClick ? 'is-clickable' : ''}`}
            onClick={(e) => {
              if (disabled) return;
              // Update active when uncontrolled
              if (activeIndex === undefined) setInternalActive(i);
              if (typeof m.onClick === 'function') m.onClick(m, i, e);
              onMenuClick(m, i, e);
            }}
            aria-current={i === currentActive ? 'page' : undefined}
            style={{
              background: i === activeIndex ? (menuItemActiveBgColor || menuItemBgColor) : menuItemBgColor,
              ...(menuItemPaddingY ? { paddingTop: menuItemPaddingY, paddingBottom: menuItemPaddingY } : {}),
              ...(menuItemPaddingX ? { paddingLeft: menuItemPaddingX, paddingRight: menuItemPaddingX } : {}),
              ...(menuItemGap ? { gap: menuItemGap } : {}),
              ...(menuItemRadius ? { borderRadius: menuItemRadius } : {}),
            }}
          >
            <div className="icon" style={{ ...(menuItemIconBgColor ? { background: menuItemIconBgColor } : {}), ...(menuIconSize ? { width: menuIconSize, height: menuIconSize } : {}) }}>{m.icon || null}</div>
            <div className="label" style={{ ...(menuItemLabelColor ? { color: menuItemLabelColor } : {}), ...(menuLabelFontSize ? { fontSize: menuLabelFontSize } : {}), ...(menuLabelFontWeight ? { fontWeight: menuLabelFontWeight } : {}) }}>{m.label}</div>
            {/* per design: no per-item counts; reserved for notify */}
          </button>
        ))}
      </nav>
      <div className="bottom">
        <button type="button" className="notify" aria-label="notifications" onClick={onNotificationClick} style={{ background: notifyBgColor, color: notifyTextColor, ...(notifyFontSize ? { fontSize: notifyFontSize } : {}), ...(notifyPaddingX ? { paddingLeft: notifyPaddingX, paddingRight: notifyPaddingX } : {}), ...(notifyPaddingY ? { paddingTop: notifyPaddingY, paddingBottom: notifyPaddingY } : {}), display: 'inline-flex', alignItems: 'center', gap: 6 }}>
          <svg width="18" height="18" viewBox="0 0 24 24" fill="currentColor" aria-hidden><path d="M12 22a2 2 0 0 0 2-2h-4a2 2 0 0 0 2 2Zm6-6V11a6 6 0 1 0-12 0v5l-2 2v1h16v-1l-2-2Z"/></svg>
          <span>{(Number(resolvedNotify) || resolvedNotify) ?? ''}</span>
        </button>
        {avatarNode ? (
          <div className="avatar btn" onClick={onProfileClick} role="button" aria-label="Profile" style={{ ...(avatarSize ? { width: avatarSize, height: avatarSize } : {}) }}>
            {avatarNode}
          </div>
        ) : resolvedAvatar ? (
          <button type="button" className="avatar btn" onClick={onProfileClick} aria-label="Profile" style={{ background: avatarBgColor, borderColor: avatarBorderColor, ...(avatarSize ? { width: avatarSize, height: avatarSize } : {}) }}>
            <img src={resolvedAvatar} alt="profile" />
          </button>
        ) : (
          <button type="button" className="avatar" onClick={onProfileClick} aria-label="Profile" style={{ background: avatarBgColor, borderColor: avatarBorderColor, ...(avatarSize ? { width: avatarSize, height: avatarSize } : {}) }} />
        )}
      </div>
    </Component>
  );
};

export default SideMenuBar;


