import React from 'react';
import '../stories/tokens.css';
import '../muamelat/styles/index.scss';
import UserControlsPopup from '../muamelat/UserControlsPopup/UserControlsPopup';

export default {
  id: 'user-controls-popup',
  title: 'Muamelat/User Controls Popup',
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


