import React from 'react';
import '../index.scss';
import UserContactCard from '../components/UserContactCard/UserContactCard';

export default {
  id: 'user-contact-card',
  title: 'User Contact Card',
  component: UserContactCard,
  tags: ['autodocs'],
  parameters: {
    layout: 'centered',
    docs: { source: { language: 'jsx', code: '<UserContactCard user={{ firstname: "Pranav", lastname: "Waykar", email: "test@example.com" }} />' } },
  },
};

export const Default = {
  name: 'Default',
  render: () => React.createElement('div', { style: { width: 380 } },
    React.createElement(UserContactCard, { user: { firstname: 'Pranav', lastname: 'Waykar', email: 'test@example.com' } })
  ),
};


