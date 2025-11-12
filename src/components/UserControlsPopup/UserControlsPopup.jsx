import React, { useState } from 'react';
import '../../index.scss';
import './UserControlsPopup.scss';
import { expandStyleProps } from '../../utils/styleSystem';

const UserControlsPopup = ({
  name = 'Pranav Waykar',
  email = 'paykar@nextsmartmove.ai',
  languages = ['Turkish', 'English'],
  onLanguageSelect = () => {},
  onLogout = () => {},
  onConsent = () => {},
  onToggleEditMode = () => {},
  shadow,
  loading = false,
  disabled = false,
  // colors
  popupBgColor,
  popupBorderColor,
  popupTextColor,
  headerBorderColor,
  avatarBgColor,
  nameColor,
  mailColor,
  rowBorderColor,
  subBgColor,
  subBorderColor,
  switchTrackColor,
  switchCheckedColor,
  // dimensions
  popupWidth,
  avatarSize,
  nameFontSize,
  mailFontSize,
  rowHeight,
  subWidth,
  switchWidth,
  switchHeight,
  switchThumbSize,
  as,
  className,
  style,
  hidden,
  ...rest
}) => {
  const [langOpen, setLangOpen] = useState(false);
  const [editMode, setEditMode] = useState(false);
  const Component = as || 'div';
  const mergedStyle = { ...expandStyleProps(rest), ...(style || {}) };
  if (shadow) {
    const smap = { none: '0', sm: '1', md: '3', lg: '5' };
    const key = smap[String(shadow)] || null;
    if (key) mergedStyle.boxShadow = `var(--sb-shadow-${key})`;
    if (shadow === 'none') mergedStyle.boxShadow = 'var(--sb-shadow-0)';
  }
  if (popupBgColor) mergedStyle.background = popupBgColor;
  if (popupBorderColor) mergedStyle.borderColor = popupBorderColor;
  if (popupTextColor) mergedStyle.color = popupTextColor;
  if (popupWidth) mergedStyle.width = popupWidth;
  if (hidden === true && mergedStyle.display === undefined) mergedStyle.display = 'none';
  const classes = ['user-controls', loading ? 'is-loading' : '', disabled ? 'is-disabled' : '', className].filter(Boolean).join(' ');
  const sliderStyle = {
    background: editMode ? (switchCheckedColor || switchTrackColor) : switchTrackColor,
    ...(switchWidth ? { width: switchWidth } : {}),
    ...(switchHeight ? { height: switchHeight } : {}),
  };
  return (
    <Component className={classes} style={mergedStyle} {...rest}>
      <div className="uc-user" style={headerBorderColor ? { borderBottomColor: headerBorderColor } : undefined}>
        <div className="avatar" style={{ ...(avatarBgColor ? { background: avatarBgColor } : {}), ...(avatarSize ? { width: avatarSize, height: avatarSize } : {}) }} />
        <div className="info">
          <div className="name" style={{ ...(nameColor ? { color: nameColor } : {}), ...(nameFontSize ? { fontSize: nameFontSize } : {}) }}>{name}</div>
          <div className="mail" style={{ ...(mailColor ? { color: mailColor } : {}), ...(mailFontSize ? { fontSize: mailFontSize } : {}) }}>{email}</div>
        </div>
      </div>
      <div className="uc-row" onClick={() => setLangOpen(!langOpen)} style={{ ...(rowBorderColor ? { borderBottomColor: rowBorderColor } : {}), ...(rowHeight ? { height: rowHeight } : {}) }}>
        <div className="label"><i className="fi fi-rr-language" style={{marginRight:8}}/>Language</div>
        <div className="chev">›</div>
      </div>
      {langOpen && (
        <div className="uc-sub" style={{ ...(subBgColor ? { background: subBgColor } : {}), ...(subBorderColor ? { borderColor: subBorderColor } : {}), ...(subWidth ? { width: subWidth } : {}) }}>
          {languages.map((l, idx) => (
            <div key={idx} className="uc-sub-row" onClick={() => { setLangOpen(false); onLanguageSelect(l); }} style={{ ...(rowBorderColor ? { borderBottomColor: rowBorderColor } : {}), ...(rowHeight ? { height: rowHeight } : {}) }}>{l}</div>
          ))}
        </div>
      )}
      <div className="uc-row" style={{ ...(rowBorderColor ? { borderBottomColor: rowBorderColor } : {}), ...(rowHeight ? { height: rowHeight } : {}) }}>
        <div className="label">Edit Mode</div>
        <label className="switch">
          <input type="checkbox" checked={editMode} onChange={() => { setEditMode(!editMode); onToggleEditMode(!editMode); }} disabled={disabled} />
          <span className="slider" style={sliderStyle} />
        </label>
      </div>
      <div className="uc-row" onClick={onConsent} style={{ ...(rowBorderColor ? { borderBottomColor: rowBorderColor } : {}), ...(rowHeight ? { height: rowHeight } : {}) }}>
        <div className="label">Consent Text</div>
      </div>
      <div className="uc-row" onClick={onLogout} style={{ ...(rowBorderColor ? { borderBottomColor: rowBorderColor } : {}), ...(rowHeight ? { height: rowHeight } : {}) }}>
        <div className="label"><i className="fi fi-rr-exit" style={{marginRight:8}}/>Logout</div>
      </div>
    </Component>
  );
};

export default UserControlsPopup;


