import React from 'react';
import '../stories/tokens.css';
import '../muamelat/styles/index.scss';
import SideMenuBar from '../muamelat/SideMenuBar/SideMenuBar';

export default {
  id: 'side-menubar',
  title: 'Muamelat/SideMenuBar',
  component: SideMenuBar,
  tags: ['autodocs'],
  parameters: {
    layout: 'centered',
    docs: { source: { language: 'jsx', code: '<SideMenuBar />' } },
  },
};

export const Default = { name: 'Default', args: {} };


