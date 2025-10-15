import React from 'react';
import '../stories/tokens.css';
import '../muamelat/styles/index.scss';
import SideMenuBar from '../muamelat/SideMenuBar/SideMenuBar';

export default {
  id: 'side-menubar',
  title: 'Muamelat/Side Menu Bar',
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
    menus: [{label:'Home'},{label:'Menu 2'},{label:'Menu 3'}],
    notificationCount: '9+',
  },
  parameters: {
    docs: {
      source: {
        language: 'jsx',
        code: `<SideMenuBar
  menus={[{ label: 'Home' }, { label: 'Menu 2' }, { label: 'Menu 3' }]}
  notificationCount="9+"
/>`,
      },
    },
  },
};


