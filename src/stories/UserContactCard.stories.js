import React from 'react';
import '../index.scss';
import UserContactCard from '../components/UserContactCard/UserContactCard';
import { commonArgTypes } from './helpers/controls';

export default {
  id: 'user-contact-card',
  title: 'User Contact Card',
  component: UserContactCard,
  tags: ['autodocs'],
  parameters: {
    layout: 'centered',
    docs: { source: { language: 'jsx', code: '<UserContactCard user={{ firstname: "Pranav", lastname: "Waykar", email: "test@example.com" }} />' } },
  },
  argTypes: {
    ...commonArgTypes,
    cardBgColor: { control: 'color' },
    cardBorderColor: { control: 'color' },
    nameColor: { control: 'color' },
    nameFontSize: { control: 'text' },
    iconColor: { control: 'color' },
    teamsIconColor: { control: 'color' },
    iconsFontSize: { control: 'text' },
    cardPadding: { control: 'text' },
    cardMaxWidth: { control: 'text' },
    avatarSize: { control: 'text' },
    size: { table: { disable: true } },
  },
};

export const Default = {
  name: 'Default',
  args: {
    data: { firstname: 'Pranav', lastname: 'Waykar', email: 'test@example.com' },
    value: '-',
    shadow: 'none',
    loading: false,
    disabled: false,
    cardBgColor: '#ffffff',
    cardBorderColor: '#e5e7eb',
    nameColor: '#0f172a',
    nameFontSize: '13px',
    iconColor: '#0f172a',
    teamsIconColor: '#5b5fc7',
    iconsFontSize: '18px',
    cardPadding: '8px 10px',
    // cardMaxWidth: '280px',
    avatarSize: '24px',
    as: 'div', id: 'ucc-1', 'data-testid': 'ucc', m: '0'
  },
  render: (args) => React.createElement('div', { style: { width: 380 } },
    React.createElement(UserContactCard, { ...args })
  ),
};


