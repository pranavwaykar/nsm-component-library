import React from 'react';
import '../index.scss';
import UserControlsPopup from '../components/UserControlsPopup/UserControlsPopup';
import { commonArgTypes } from './helpers/controls';

export default {
  id: 'user-controls-popup',
  title: 'User Controls Popup',
  component: UserControlsPopup,
  tags: ['autodocs'],
  parameters: {
    layout: 'centered',
    docs: { source: { language: 'jsx', code: '<UserControlsPopup />' } },
  },
  argTypes: {
    ...commonArgTypes,
    data: { control: 'object' },
    popupBgColor: { control: 'color' },
    popupBorderColor: { control: 'color' },
    popupTextColor: { control: 'color' },
    headerBorderColor: { control: 'color' },
    avatarBgColor: { control: 'color' },
    nameColor: { control: 'color' },
    mailColor: { control: 'color' },
    rowBorderColor: { control: 'color' },
    subBgColor: { control: 'color' },
    subBorderColor: { control: 'color' },
    switchTrackColor: { control: 'color' },
    switchCheckedColor: { control: 'color' },
    popupWidth: { control: 'text' },
    avatarSize: { control: 'text' },
    nameFontSize: { control: 'text' },
    mailFontSize: { control: 'text' },
    rowHeight: { control: 'text' },
    subWidth: { control: 'text' },
    switchWidth: { control: 'text' },
    switchHeight: { control: 'text' },
    size: { table: { disable: true } },
    variant: { table: { disable: true } },
  },
};

export const Default = {
  name: 'Default',
  args: {
    data: {
      user: { name: 'John Doe', email: 'john@example.com', avatarSrc: undefined },
      languages: { options: ['Turkish','English'] },
      editMode: { value: false, loading: false },
      labels: { language: 'Language', editMode: 'Edit Mode', consent: 'Consent Text', logout: 'Logout' },
    },
    popupBgColor: '#ffffff',
    popupBorderColor: '#e5e7eb',
    popupTextColor: undefined,
    headerBorderColor: '#e5e7eb',
    avatarBgColor: '#f1f5f9',
    nameColor: undefined,
    mailColor: undefined,
    rowBorderColor: '#e5e7eb',
    subBgColor: '#ffffff',
    subBorderColor: '#e5e7eb',
    switchTrackColor: '#e2e8f0',
    switchCheckedColor: '#1f94ff',
    w: '260px',
    avatarSize: '40px',
    nameFontSize: '14px',
    mailFontSize: '12px',
    rowHeight: '44px',
    subWidth: '220px',
    switchWidth: '36px',
    switchHeight: '20px',
  },
  parameters: {
    docs: {
      source: {
        language: 'jsx',
        code: `<UserControlsPopup
  data={{
    user: { name: 'John Doe', email: 'john@example.com', avatarSrc: undefined },
    languages: { options: ['Turkish','English'] },
    editMode: { value: false, loading: false },
    labels: { language: 'Language', editMode: 'Edit Mode', consent: 'Consent Text', logout: 'Logout' }
  }}
/>`,
      },
    },
  },
};


