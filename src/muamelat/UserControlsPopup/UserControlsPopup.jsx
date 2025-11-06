import React, { useState } from 'react';
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
  as,
  className,
  style,
  hidden,
  ...rest
}) => {
  const [langOpen, setLangOpen] = useState(false);
  const [editMode, setEditMode] = useState(false);
  const Component = as || 'div';
  const merged = { ...expandStyleProps(rest), ...(style || {}) };
  if (hidden === true && merged.display === undefined) merged.display = 'none';
  return (
    <Component className={`user-controls ${className || ''}`.trim()} style={merged} {...rest}>
      <div className="uc-user">
        <div className="avatar" />
        <div className="info">
          <div className="name">{name}</div>
          <div className="mail">{email}</div>
        </div>
      </div>
      <div className="uc-row" onClick={() => setLangOpen(!langOpen)}>
        <div className="label"><i className="fi fi-rr-language" style={{marginRight:8}}/>Language</div>
        <div className="chev">›</div>
      </div>
      {langOpen && (
        <div className="uc-sub">
          {languages.map((l, idx) => (
            <div key={idx} className="uc-sub-row" onClick={() => { setLangOpen(false); onLanguageSelect(l); }}>{l}</div>
          ))}
        </div>
      )}
      <div className="uc-row">
        <div className="label">Edit Mode</div>
        <label className="switch">
          <input type="checkbox" checked={editMode} onChange={() => setEditMode(!editMode)} />
          <span className="slider" />
        </label>
      </div>
      <div className="uc-row" onClick={onConsent}>
        <div className="label">Consent Text</div>
      </div>
      <div className="uc-row" onClick={onLogout}>
        <div className="label"><i className="fi fi-rr-exit" style={{marginRight:8}}/>Logout</div>
      </div>
    </Component>
  );
};

export default UserControlsPopup;


