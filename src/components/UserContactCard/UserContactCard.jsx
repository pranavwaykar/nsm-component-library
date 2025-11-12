import React from 'react';
import '../../index.scss';
import './UserContactCard.scss';
import Avatar from '../../muamelat/common/Avatar';
import { openMail, openTeams } from '../../muamelat/common/utils';
import { expandStyleProps } from '../../utils/styleSystem';

const UserContactCard = ({ user = {}, shadow, loading = false, disabled = false, cardBgColor, cardBorderColor, cardPadding, cardMaxWidth, nameColor, nameFontSize, nameFontWeight, iconColor, teamsIconColor, iconsFontSize, iconsGap, avatarSize, onCardClick, onEmailClick, onTeamsClick, as, className, style, hidden, ...rest }) => {
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
  if (cardPadding) mergedStyle.padding = cardPadding;
  if (cardMaxWidth) mergedStyle.maxWidth = cardMaxWidth;
  if (hidden === true && mergedStyle.display === undefined) mergedStyle.display = 'none';
  const classes = ['user-contact-card-comp', loading ? 'is-loading' : '', disabled ? 'is-disabled' : '', className].filter(Boolean).join(' ');
  return (
    <Component className={classes} style={mergedStyle} onClick={onCardClick} {...rest}>
      <Avatar type="mini2" img={user?.avatar} name={fullName} style={avatarSize ? { width: avatarSize, height: avatarSize, fontSize: Number.parseFloat(avatarSize) / 2 || undefined } : undefined} />
      <div className="uccc-name" title={fullName} style={{ ...(nameColor ? { color: nameColor } : {}), ...(nameFontSize ? { fontSize: nameFontSize } : {}), ...(nameFontWeight ? { fontWeight: nameFontWeight } : {}) }}>{fullName || 'Unknown User'}</div>
      <div className="uccc-icons" style={iconsGap ? { gap: iconsGap } : undefined}>
        <button className="uccc-icon" aria-label="email" onClick={() => { if (onEmailClick) onEmailClick(user); else openMail(user?.email); }} style={iconColor ? { color: iconColor } : undefined}>
          <i className="fi fi-rr-envelope" style={iconsFontSize ? { fontSize: iconsFontSize } : undefined} />
        </button>
        <button className="uccc-icon teams" aria-label="teams" onClick={() => { if (onTeamsClick) onTeamsClick(user); else openTeams(user?.email); }} style={{ ...(iconColor ? { color: iconColor } : {}), ...(teamsIconColor ? { color: teamsIconColor } : {}) }}>
          <i className="fi fi-rr-users" style={iconsFontSize ? { fontSize: iconsFontSize } : undefined} />
        </button>
      </div>
    </Component>
  );
};

export default UserContactCard;


