import React, { useState } from 'react';
import SideDrawer from '../components/SideDrawer/SideDrawer';
import Card from '../components/Card/Card';
import { commonArgTypes } from './helpers/controls';

export default {
  title: 'Side Drawer Component',
  component: SideDrawer,
  tags: ['autodocs'],
  parameters: { layout: 'centered' },
  argTypes: {
    ...commonArgTypes,
    opened: { control: 'boolean' },
    position: { control: 'select', options: ['left','right'] },
    title: { control: 'text' },
    overlayColor: { control: 'color' },
    overlayOpacity: { control: 'text' },
    overlayBlur: { control: 'text' },
    panelBgColor: { control: 'color' },
    panelRadius: { control: 'text' },
    panelMinWidth: { control: 'text' },
    headerBgColor: { control: 'color' },
    headerBorderColor: { control: 'color' },
    titleColor: { control: 'color' },
    closeButtonColor: { control: 'color' },
    headerPadding: { control: 'text' },
    contentPadding: { control: 'text' },
    titleFontSize: { control: 'text' },
    titleFontWeight: { control: 'text' },
    closeButtonSize: { control: 'text' },
    draggable: { table: { disable: true } },
    size: { table: { disable: true } },
    variant: { table: { disable: true } },
  },
};

export const Default = {
  name: 'Side Drawer',
  args: {
    opened: true,
    position: 'right',
    title: 'Details',
    shadow: 'none',
    loading: false,
    disabled: false,
    overlayColor: 'rgba(0,0,0,.35)',
    overlayOpacity: undefined,
    overlayBlur: undefined,
    panelBgColor: '#ffffff',
    panelRadius: undefined,
    panelMinWidth: '320px',
    headerBgColor: undefined,
    headerBorderColor: '#e6ebf2',
    titleColor: undefined,
    titleFontWeight: undefined,
    closeButtonColor: undefined,
    headerPadding: '12px 16px',
    contentPadding: '16px',
    titleFontSize: '14px',
    closeButtonSize: '22px',
    content: 'This is Drawer Content Which Is Replaceable',
  },
  render: (args) => (
    <div style={{ height: 400, width: 600, position: 'relative', border: '1px dashed #e6ebf2' }}>
      <SideDrawer {...args} />
    </div>
  ),
};


