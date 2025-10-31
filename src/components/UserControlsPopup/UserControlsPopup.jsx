import React, { useState } from 'react';
import '../../index.scss';
import './UserControlsPopup.scss';

const UserControlsPopup = ({
  name = 'Pranav Waykar',
  email = 'paykar@nextsmartmove.ai',
  languages = ['Turkish', 'English'],
  onLanguageSelect = () => {},
  onLogout = () => {},
  onConsent = () => {},
  onToggleEditMode = () => {},
}) => {
  const [langOpen, setLangOpen] = useState(false);
  const [editMode, setEditMode] = useState(false);
  return (
    <div className="user-controls">
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
          <input type="checkbox" checked={editMode} onChange={() => { setEditMode(!editMode); onToggleEditMode(!editMode); }} />
          <span className="slider" />
        </label>
      </div>
      <div className="uc-row" onClick={onConsent}>
        <div className="label">Consent Text</div>
      </div>
      <div className="uc-row" onClick={onLogout}>
        <div className="label"><i className="fi fi-rr-exit" style={{marginRight:8}}/>Logout</div>
      </div>
    </div>
  );
};

export default UserControlsPopup;


