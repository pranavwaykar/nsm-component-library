import React from 'react';
import './UserContactCard.scss';
import Avatar from '../common/Avatar';
import { openMail, openTeams } from '../common/utils';
import { expandStyleProps } from '../../utils/styleSystem';

const UserContactCard = ({ user = {}, as, className, style, hidden, ...rest }) => {
  const fullName = `${user?.firstname ?? ''} ${user?.lastname ?? ''}`.trim();
  const Component = as || 'div';
  const merged = { ...expandStyleProps(rest), ...(style || {}) };
  if (hidden === true && merged.display === undefined) merged.display = 'none';
  return (
    <Component className={`user-contact-card-comp ${className || ''}`.trim()} style={merged} {...rest}>
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
    </Component>
  );
};

export default UserContactCard;


