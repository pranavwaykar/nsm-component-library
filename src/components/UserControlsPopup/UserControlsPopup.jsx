import React, { useMemo, useState } from 'react';
import '../../index.scss';
import './UserControlsPopup.scss';
import { expandStyleProps } from '../../utils/styleSystem';

const UserControlsPopup = ({
  data,
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
  avatarSize,
  nameFontSize,
  mailFontSize,
  rowHeight,
  subWidth,
  switchWidth,
  switchHeight,
  switchThumbSize,
  onAvatarClick,
  onLanguageRowClick,
  as,
  className,
  style,
  hidden,
  ...rest
}) => {
  // Structured data support
  const {
    user: dataUser,
    languages: dataLanguages,
    editMode: dataEdit,
    labels: dataLabels,
  } = (data && typeof data === 'object') ? data : {};

  const resolvedName = dataUser?.name ?? name;
  const resolvedEmail = dataUser?.email ?? email;
  const resolvedAvatar = dataUser?.avatarSrc ?? null;

  const resolvedLanguages = useMemo(() => {
    const opts = (dataLanguages && (dataLanguages.options || dataLanguages.list)) || languages || [];
    return (opts || []).map((l) => {
      if (typeof l === 'string') return { name: l, code: l, disabled: false };
      const { name: n, code, disabled } = l || {};
      return { name: n || code || '', code: code || n || '', disabled: Boolean(disabled) };
    });
  }, [dataLanguages, languages]);

  const labelLanguage = dataLabels?.language ?? 'Language';
  const labelEditMode = dataLabels?.editMode ?? 'Edit Mode';
  const labelConsent = dataLabels?.consent ?? 'Consent Text';
  const labelLogout = dataLabels?.logout ?? 'Logout';

  const [langOpen, setLangOpen] = useState(false);
  // Edit mode controlled/uncontrolled
  const [internalEdit, setInternalEdit] = useState(Boolean(dataEdit?.value));
  const editValue = (dataEdit && typeof dataEdit.value === 'boolean') ? dataEdit.value : internalEdit;
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
  if (hidden === true && mergedStyle.display === undefined) mergedStyle.display = 'none';
  const classes = ['user-controls', loading ? 'is-loading' : '', disabled ? 'is-disabled' : '', className].filter(Boolean).join(' ');
  const sliderStyle = {
    background: editValue ? (switchCheckedColor || switchTrackColor) : switchTrackColor,
    ...(switchWidth ? { width: switchWidth } : {}),
    ...(switchHeight ? { height: switchHeight } : {}),
  };
  return (
    <Component className={classes} style={mergedStyle} {...rest}>
      <div className="uc-user" style={headerBorderColor ? { borderBottomColor: headerBorderColor } : undefined}>
        <div className="avatar" onClick={onAvatarClick} style={{ ...(avatarBgColor ? { background: avatarBgColor } : {}), ...(avatarSize ? { width: avatarSize, height: avatarSize } : {}) }}>
          {resolvedAvatar ? <img src={resolvedAvatar} alt="user" style={{ width: '100%', height: '100%', objectFit: 'cover', borderRadius: '50%' }} /> : null}
        </div>
        <div className="info">
          <div className="name" style={{ ...(nameColor ? { color: nameColor } : {}), ...(nameFontSize ? { fontSize: nameFontSize } : {}) }}>{resolvedName}</div>
          <div className="mail" style={{ ...(mailColor ? { color: mailColor } : {}), ...(mailFontSize ? { fontSize: mailFontSize } : {}) }}>{resolvedEmail}</div>
        </div>
      </div>
      <div className="uc-row" onClick={(e) => { setLangOpen(!langOpen); onLanguageRowClick?.(e); }} style={{ ...(rowBorderColor ? { borderBottomColor: rowBorderColor } : {}), ...(rowHeight ? { height: rowHeight } : {}) }}>
        <div className="label"><i className="fi fi-rr-language" style={{marginRight:8}}/>{labelLanguage}</div>
        <div className="chev">›</div>
      </div>
      {langOpen && (
        <div className="uc-sub" style={{ ...(subBgColor ? { background: subBgColor } : {}), ...(subBorderColor ? { borderColor: subBorderColor } : {}), ...(subWidth ? { width: subWidth } : {}) }}>
          {resolvedLanguages.map((l, idx) => (
            <div key={idx} className="uc-sub-row" onClick={() => { if (l.disabled) return; setLangOpen(false); onLanguageSelect(l.code || l.name || l); }} style={{ ...(rowBorderColor ? { borderBottomColor: rowBorderColor } : {}), ...(rowHeight ? { height: rowHeight } : {}), ...(l.disabled ? { opacity: .5, pointerEvents: 'none' } : {}) }}>{l.name || l}</div>
          ))}
        </div>
      )}
      <div className="uc-row" style={{ ...(rowBorderColor ? { borderBottomColor: rowBorderColor } : {}), ...(rowHeight ? { height: rowHeight } : {}) }}>
        <div className="label">{labelEditMode}</div>
        <label className="switch">
          <input
            type="checkbox"
            checked={editValue}
            onChange={() => {
              if (dataEdit && typeof dataEdit.value === 'boolean') {
                onToggleEditMode(!editValue);
              } else {
                setInternalEdit(!editValue);
                onToggleEditMode(!editValue);
              }
            }}
            disabled={disabled || Boolean(dataEdit?.loading)}
          />
          <span className="slider" style={sliderStyle} />
        </label>
      </div>
      <div className="uc-row" onClick={onConsent} style={{ ...(rowBorderColor ? { borderBottomColor: rowBorderColor } : {}), ...(rowHeight ? { height: rowHeight } : {}) }}>
        <div className="label">{labelConsent}</div>
      </div>
      <div className="uc-row" onClick={onLogout} style={{ ...(rowBorderColor ? { borderBottomColor: rowBorderColor } : {}), ...(rowHeight ? { height: rowHeight } : {}) }}>
        <div className="label"><i className="fi fi-rr-exit" style={{marginRight:8}}/>{labelLogout}</div>
      </div>
    </Component>
  );
};

export default UserControlsPopup;


