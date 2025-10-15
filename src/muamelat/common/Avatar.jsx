import React from 'react';

const Avatar = ({ img, name = '', type = 'default', style = {} }) => {
  const size = type === 'mini2' ? 24 : type === 'sidebar' ? 40 : type === 'profile' ? 48 : 32;
  const baseStyle = {
    width: size,
    height: size,
    borderRadius: '50%',
    objectFit: 'cover',
    background: '#e5e7eb',
    display: 'inline-flex',
    alignItems: 'center',
    justifyContent: 'center',
    color: '#475569',
    fontSize: size / 2,
  };

  if (typeof img === 'string' && img) {
    return <img src={img} alt="" style={{ ...baseStyle, ...style }} />;
  }

  const initials = name
    .split(' ')
    .filter(Boolean)
    .slice(0, 2)
    .map((s) => s[0]?.toUpperCase())
    .join('') || '•';
  return <div style={{ ...baseStyle, ...style, fontWeight: 700 }}>{initials}</div>;
};

export default Avatar;


