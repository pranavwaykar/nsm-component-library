import React from 'react';
import '../../index.scss';
import './UserContactCard.scss';
import Avatar from '../../muamelat/common/Avatar';
import { openMail, openTeams } from '../../muamelat/common/utils';
import { expandStyleProps } from '../../utils/styleSystem';

const UserContactCard = ({ user = {}, shadow, loading = false, disabled = false, cardBgColor, cardBorderColor, nameColor, iconColor, teamsIconColor, as, className, style, hidden, ...rest }) => {
  const fullName = `${user?.firstname ?? ''} ${user?.lastname ?? ''}`.trim();
  const Component = as || 'div';
  const mergedStyle = { ...expandStyleProps(rest), ...(style || {}) };
  if (shadow) {
    const smap = { none: '0', sm: '1', md: '3', lg: '5' };
    const key = smap[String(shadow)] || null;
    if (key) mergedStyle.boxShadow = `var(--sb-shadow-${key})`;
    if (shadow === 'none') mergedStyle.boxShadow = 'var(--sb-shadow-0)';
  }
  if (cardBgColor) mergedStyle.background = cardBgColor;
  if (cardBorderColor) mergedStyle.borderColor = cardBorderColor;
  if (hidden === true && mergedStyle.display === undefined) mergedStyle.display = 'none';
  const classes = ['user-contact-card-comp', loading ? 'is-loading' : '', disabled ? 'is-disabled' : '', className].filter(Boolean).join(' ');
  return (
    <Component className={classes} style={mergedStyle} {...rest}>
      <Avatar type="mini2" img={user?.avatar} name={fullName} />
      <div className="uccc-name" title={fullName} style={nameColor ? { color: nameColor } : undefined}>{fullName || 'Unknown User'}</div>
      <div className="uccc-icons">
        <button className="uccc-icon" aria-label="email" onClick={() => openMail(user?.email)} style={iconColor ? { color: iconColor } : undefined}>
          <i className="fi fi-rr-envelope" />
        </button>
        <button className="uccc-icon teams" aria-label="teams" onClick={() => openTeams(user?.email)} style={{ ...(iconColor ? { color: iconColor } : {}), ...(teamsIconColor ? { color: teamsIconColor } : {}) }}>
          <i className="fi fi-rr-users" />
        </button>
      </div>
    </Component>
  );
};

export default UserContactCard;


