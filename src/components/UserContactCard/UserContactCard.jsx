import React from 'react';
import '../../index.scss';
import './UserContactCard.scss';
import Avatar from '../../muamelat/common/Avatar';
import { openMail, openTeams } from '../../muamelat/common/utils';

const UserContactCard = ({ user = {} }) => {
  const fullName = `${user?.firstname ?? ''} ${user?.lastname ?? ''}`.trim();
  return (
    <div className="user-contact-card-comp">
      <Avatar type="mini2" img={user?.avatar} name={fullName} />
      <div className="uccc-name" title={fullName}>{fullName || 'Unknown User'}</div>
      <div className="uccc-icons">
        <button className="uccc-icon" aria-label="email" onClick={() => openMail(user?.email)}>
          <i className="fi fi-rr-envelope" />
        </button>
        <button className="uccc-icon teams" aria-label="teams" onClick={() => openTeams(user?.email)}>
          <i className="fi fi-rr-users" />
        </button>
      </div>
    </div>
  );
};

export default UserContactCard;


