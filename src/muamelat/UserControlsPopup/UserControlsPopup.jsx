import React, { useState } from 'react';
import './UserControlsPopup.scss';

const UserControlsPopup = () => {
  const [langOpen, setLangOpen] = useState(false);
  const [editMode, setEditMode] = useState(false);
  return (
    <div className="user-controls">
      <div className="uc-user">
        <div className="avatar" />
        <div className="info">
          <div className="name">Pranav Waykar</div>
          <div className="mail">paykar@nextsmartmove.ai</div>
        </div>
      </div>
      <div className="uc-row" onClick={() => setLangOpen(!langOpen)}>
        <div className="label"><i className="fi fi-rr-language" style={{marginRight:8}}/>Language</div>
        <div className="chev">›</div>
      </div>
      {langOpen && (
        <div className="uc-sub">
          <div className="uc-sub-row">Turkish</div>
          <div className="uc-sub-row">English</div>
        </div>
      )}
      <div className="uc-row">
        <div className="label">Edit Mode</div>
        <label className="switch">
          <input type="checkbox" checked={editMode} onChange={() => setEditMode(!editMode)} />
          <span className="slider" />
        </label>
      </div>
      <div className="uc-row">
        <div className="label">Consent Text</div>
      </div>
      <div className="uc-row">
        <div className="label"><i className="fi fi-rr-exit" style={{marginRight:8}}/>Logout</div>
      </div>
    </div>
  );
};

export default UserControlsPopup;


