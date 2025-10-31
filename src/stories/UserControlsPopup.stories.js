import React from 'react';
import '../index.scss';
import UserControlsPopup from '../components/UserControlsPopup/UserControlsPopup';

export default {
  id: 'user-controls-popup',
  title: 'User Controls Popup',
  component: UserControlsPopup,
  tags: ['autodocs'],
  parameters: {
    layout: 'centered',
    docs: { source: { language: 'jsx', code: '<UserControlsPopup />' } },
  },
};

export const Default = {
  name: 'Default',
  args: { name: 'John Doe', email: 'john@example.com', languages: ['Turkish','English'] },
  parameters: {
    docs: {
      source: {
        language: 'jsx',
        code: `<UserControlsPopup
  name="John Doe"
  email="john@example.com"
  languages={[ 'Turkish', 'English' ]}
/>`,
      },
    },
  },
};


