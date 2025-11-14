import React from 'react';
import '../index.scss';
import SideMenu from '../components/SideMenu/SideMenu';
import { commonArgTypes } from './helpers/controls';

export default {
  id: 'ml-sidebar',
  title: 'Side Menu',
  component: SideMenu,
  tags: ['autodocs'],
  parameters: {
    layout: 'centered',
    docs: {
      source: { language: 'jsx', code: '<SideMenu />' },
      description: {
        component:
          'ML Sidebar replicates the Muamelat sidebar: logo header, vertical menu with active state and per-item counts, bottom notification and profile avatar, and an inline edit-mode toggle. No popovers are rendered—click handlers are exposed so apps can wire their own popups/modals.',
      },
    },
  },
  argTypes: {
    ...commonArgTypes,
    data: { control: 'object' },
    activeIndex: { control: 'number' },
    sideBgColor: { control: 'text' },
    sideTextColor: { control: 'color' },
    sideWidth: { control: 'text' },
    sideHeight: { control: 'text' },
    sideRadius: { control: 'text' },
    sideShadow: { control: 'text' },
    sidePaddingX: { control: 'text' },
    sidePaddingY: { control: 'text' },
    logoSize: { control: 'text' },
    logoRadius: { control: 'text' },
    logoBackground: { control: 'color' },
    itemHeight: { control: 'text' },
    itemGap: { control: 'text' },
    itemRadius: { control: 'text' },
    itemHoverBgColor: { control: 'color' },
    itemActiveBgColor: { control: 'color' },
    itemActiveOutline: { control: 'text' },
    activeStripeWidth: { control: 'text' },
    activeStripeColor: { control: 'color' },
    iconSize: { control: 'text' },
    iconBgColor: { control: 'color' },
    labelFontSize: { control: 'text' },
    labelFontWeight: { control: 'text' },
    labelColor: { control: 'color' },
    countBgColor: { control: 'color' },
    countTextColor: { control: 'color' },
    countMinWidth: { control: 'text' },
    countHeight: { control: 'text' },
    countFontSize: { control: 'text' },
    notifyBgColor: { control: 'color' },
    notifyTextColor: { control: 'color' },
    notifyFontSize: { control: 'text' },
    notifyPaddingX: { control: 'text' },
    notifyPaddingY: { control: 'text' },
    avatarSize: { control: 'text' },
    avatarBgColor: { control: 'color' },
    avatarBorderColor: { control: 'color' },
    editLabelFontSize: { control: 'text' },
    editSwitchWidth: { control: 'text' },
    editSwitchHeight: { control: 'text' },
    editSwitchTrackColor: { control: 'color' },
    editSwitchOnColor: { control: 'color' },
  },
};

const demoMenus = [
  { label: 'Panorama', icon: 'fi fi-rr-panorama' },
  { label: 'Documents', icon: 'fi fi-rr-folder' },
  { label: 'Emails', icon: 'fi fi-rr-envelope' },
  { label: 'Reports', icon: 'fi fi-rr-chart-histogram' },
  { label: 'Calendar', icon: 'fi fi-rr-calendar' },
  { label: 'Management', icon: 'fi fi-rr-settings' },
];

export const Default = {
  name: 'Default',
  args: {
    data: {
      logo: 'Muamelat',
      items: demoMenus,
      bottom: { notificationCount: '9+', avatarSrc: 'https://via.placeholder.com/150' },
      editMode: { value: false, loading: false },
    },
    activeIndex: 0,
    as: 'aside',
    id: 'ml-sb',
    'data-testid': 'ml-sidebar',
    m: '0',
    // style defaults to match Muamelat
    sideBgColor: '#032a77',
    sideTextColor: '#ffffff',
    sideWidth: '96px',
    sideHeight: '100vh',
    sideRadius: '12px',
    sideShadow: 'var(--sb-shadow-4)',
    sidePaddingX: '8px',
    sidePaddingY: '10px',
    logoSize: '56px',
    logoRadius: '10px',
    logoBackground: '#0e1a34',
    itemHeight: '60px',
    itemPaddingY: '10px',
    itemPaddingX: '6px',
    itemGap: '8px',
    itemRadius: '10px',
    itemHoverBgColor: 'rgba(31,148,255,.08)',
    itemActiveBgColor: 'rgba(31,148,255,.16)',
    itemActiveOutline: 'rgba(31,148,255,.45)',
    activeStripeWidth: '4px',
    activeStripeColor: '#1f94ff',
    iconSize: '24px',
    iconBgColor: '#0e1a34',
    labelFontSize: '13px',
    labelFontWeight: '700',
    labelColor: '#ffffff',
    countBgColor: '#1f94ff',
    countTextColor: '#ffffff',
    countMinWidth: '18px',
    countHeight: '18px',
    countFontSize: '11px',
    notifyBgColor: '#1f94ff',
    notifyTextColor: '#ffffff',
    notifyFontSize: '13px',
    notifyPaddingX: '14px',
    notifyPaddingY: '8px',
    avatarSize: '48px',
    avatarBgColor: '#0e1a34',
    avatarBorderColor: '#1f94ff',
    editLabelFontSize: '12px',
    editSwitchWidth: '40px',
    editSwitchHeight: '22px',
    editSwitchTrackColor: '#e2e8f0',
    editSwitchOnColor: '#1f94ff',
  },
  parameters: {
    docs: {
      source: {
        language: 'jsx',
        code: `<SideMenu
  data={{
    logo: 'Muamelat',
    items: [
      { label: 'Panorama', icon: 'fi fi-rr-panorama' },
      { label: 'Transaction', icon: 'fi fi-rr-analytics' },
      { label: 'Documents', icon: 'fi fi-rr-folder', count: 7 },
      { label: 'Emails', icon: 'fi fi-rr-envelope', count: 2 },
      { label: 'Reports', icon: 'fi fi-rr-chart-histogram' },
      { label: 'Calendar', icon: 'fi fi-rr-calendar' },
      { label: 'Management', icon: 'fi fi-rr-settings' },
      { label: 'Teams', icon: 'fi fi-brands-microsoft' },
      { label: 'Settings', icon: 'fi fi-rr-cog' },
    ],
    bottom: { notificationCount: '9+', avatarSrc: 'https://via.placeholder.com/150' },
    editMode: { value: false, loading: false }
  }}
  activeIndex={0}
  onLogoClick={() => {}}
  onNotificationClick={() => {}}
  onProfileClick={() => {}}
  onMenuClick={(menu, index) => {}}
  onEditModeChange={(next) => {}}
/>`,
      },
    },
  },
}; 


