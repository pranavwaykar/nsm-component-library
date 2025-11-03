import React from 'react';
import '../index.scss';
import SideMenuBar from '../components/SideMenuBar/SideMenuBar';

export default {
  id: 'side-menubar',
  title: 'Side Menu Bar',
  component: SideMenuBar,
  tags: ['autodocs'],
  parameters: {
    layout: 'centered',
    docs: { source: { language: 'jsx', code: '<SideMenuBar />' } },
  },
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


