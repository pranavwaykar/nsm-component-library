import React from 'react';
import '../index.scss';
import SideMenuBar from '../components/SideMenuBar/SideMenuBar';
import { universalArgTypes, styleSystemArgTypes } from './helpers/controls';

export default {
  id: 'side-menubar',
  title: 'Side Menu Bar',
  component: SideMenuBar,
  tags: ['autodocs'],
  parameters: {
    layout: 'centered',
    docs: {
      source: { language: 'jsx', code: '<SideMenuBar />' },
      description: { component: 'SideMenuBar provides primary navigation with an active state, optional per‑item counters, and logo/profile affordances. The API exposes click handlers for logo/profile and `onMenuClick` for items. Universal/style props can be used to position the aside or adapt it inside layouts.' },
    },
  },
  argTypes: { ...universalArgTypes, ...styleSystemArgTypes },
};

export const Default = {
  name: 'Default',
  args: {
    activeIndex: 0,
    menus: [
      { label: 'Home', count: 0 },
      { label: 'Tasks', count: 12 },
      { label: 'Reports', count: 2 },
    ],
    notificationCount: '9+',
    as: 'aside', id: 'smb-1', 'data-testid': 'smb', m: '0'
  },
  parameters: {
    docs: {
      source: {
        language: 'jsx',
        code: `<SideMenuBar
  activeIndex={0}
  menus={[ { label: 'Home', count: 0 }, { label: 'Tasks', count: 12 }, { label: 'Reports', count: 2 } ]}
  notificationCount="9+"
  onLogoClick={() => {}}
  onProfileClick={() => {}}
  onMenuClick={(menu, index) => {}}
/>`,
      },
    },
  },
};


