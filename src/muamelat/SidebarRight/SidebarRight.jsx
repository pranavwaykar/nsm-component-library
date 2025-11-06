import React from 'react';
import './SidebarRight.scss';

const menus = [
  { label: 'Transaction', icon: 'icon-transaction' },
  { label: 'Stages', icon: 'icon-stages' },
  { label: 'Tasks', icon: 'icon-tasks' },
  { label: 'Phases', icon: 'icon-phases' },
  { label: 'Sign Tracking', icon: 'icon-sign' },
  { label: 'Analysis Phase', icon: 'icon-analysis', openPopupMenu: true },
  { label: 'Matter Phase', icon: 'icon-critical' },
];

const SidebarRight = ({ onNavigate = () => {} }) => {
  return (
    <div className="sidebar-right-comp">
      <div className="src-top">
        {menus.map((m, idx) => (
          <div key={idx} className="src-menu-comp" onClick={() => onNavigate(m)}>
            <div className="src-menu-icon"><i className={m.icon} /></div>
            {m.label && <div className="src-menu-content">{m.label}</div>}
          </div>
        ))}
      </div>
    </div>
  );
};

export default SidebarRight;


