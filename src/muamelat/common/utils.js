export const openMail = (email) => {
  if (!email) return;
  window.location.href = `mailto:${email}`;
};

export const openTeams = (email, message = '') => {
  if (!email) return;
  const url = `https://teams.microsoft.com/l/chat/0/0?users=${encodeURIComponent(email)}&message=${encodeURIComponent(message)}`;
  window.open(url, '_blank');
};

export const classNames = (...args) => args.filter(Boolean).join(' ');


