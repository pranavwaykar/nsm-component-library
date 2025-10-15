import React from 'react';
import '../stories/tokens.css';
import '../muamelat/styles/index.scss';
import UserControlsPopup from '../muamelat/UserControlsPopup/UserControlsPopup';

export default {
  id: 'user-controls-popup',
  title: 'Muamelat/UserControlsPopup',
  component: UserControlsPopup,
  tags: ['autodocs'],
  parameters: {
    layout: 'centered',
    docs: { source: { language: 'jsx', code: '<UserControlsPopup />' } },
  },
};

export const Default = {
  name: 'Default',
  render: () => React.createElement(UserControlsPopup),
};


