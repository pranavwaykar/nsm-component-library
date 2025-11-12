import React from 'react';
import '../index.scss';
import SideMenuBar from '../components/SideMenuBar/SideMenuBar';
import { commonArgTypes } from './helpers/controls';

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
  argTypes: {
    ...commonArgTypes,
    sideMenuBgColor: { control: 'color' },
    sideMenuTextColor: { control: 'color' },
    logoMarkBackground: { control: 'text' },
    sideMenuWidth: { control: 'text' },
    sideMenuHeight: { control: 'text' },
    logoSize: { control: 'text' },
    menuItemBgColor: { control: 'color' },
    menuItemActiveBgColor: { control: 'color' },
    menuItemIconBgColor: { control: 'color' },
    menuItemLabelColor: { control: 'color' },
    menuItemCountBgColor: { control: 'color' },
    menuItemCountTextColor: { control: 'color' },
    menuItemPaddingY: { control: 'text' },
    menuItemGap: { control: 'text' },
    menuIconSize: { control: 'text' },
    menuLabelFontSize: { control: 'text' },
    countBadgeHeight: { control: 'text' },
    countBadgeMinWidth: { control: 'text' },
    notifyBgColor: { control: 'color' },
    notifyTextColor: { control: 'color' },
    avatarBgColor: { control: 'color' },
    avatarBorderColor: { control: 'color' },
    notifyFontSize: { control: 'text' },
    avatarSize: { control: 'text' },
    draggable: { table: { disable: true } },
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
    sideMenuBgColor: '#032a77',
    sideMenuTextColor: '#ffffff',
    logoMarkBackground: 'linear-gradient(180deg,#1d4ed8,#0f172a)',
    sideMenuWidth: '92px',
    sideMenuHeight: '560px',
    logoSize: '48px',
    menuItemBgColor: 'transparent',
    menuItemActiveBgColor: 'rgba(31,148,255,.14)',
    menuItemIconBgColor: '#0e1a34',
    menuItemLabelColor: '#ffffff',
    menuItemCountBgColor: '#1f94ff',
    menuItemCountTextColor: '#ffffff',
    menuItemPaddingY: '10px',
    menuItemGap: '6px',
    menuIconSize: '22px',
    menuLabelFontSize: '11px',
    countBadgeHeight: '16px',
    countBadgeMinWidth: '16px',
    notifyBgColor: '#1f94ff',
    notifyTextColor: '#ffffff',
    avatarBgColor: '#0e1a34',
    avatarBorderColor: '#1f94ff',
    notifyFontSize: '12px',
    avatarSize: '44px',
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


