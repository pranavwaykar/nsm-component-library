import React, { useState } from 'react';
import SideDrawer from '../components/SideDrawer/SideDrawer';
import Card from '../components/Card/Card';
import { commonArgTypes } from './helpers/controls';

export default {
  title: 'Side Drawer Component',
  component: SideDrawer,
  parameters: { layout: 'centered' },
  argTypes: {
    ...commonArgTypes,
    opened: { control: 'boolean' },
    position: { control: 'select', options: ['left','right'] },
    width: { control: 'number' },
    title: { control: 'text' },
    overlayColor: { control: 'color' },
    panelBgColor: { control: 'color' },
    headerBgColor: { control: 'color' },
    headerBorderColor: { control: 'color' },
    titleColor: { control: 'color' },
    closeButtonColor: { control: 'color' },
  },
};

export const Basic = () => {
  const [opened, setOpened] = useState(true);
  return (
    <div style={{ height: 400, width: 600, position: 'relative', border: '1px dashed #e6ebf2' }}>
      <button onClick={() => setOpened(true)}>Open Drawer</button>
      <SideDrawer opened={opened} onClose={() => setOpened(false)} title="Details">
        <Card title="Section" padding={12}>
          <div>Any content can go here. Use this as a shell for detail panels.</div>
        </Card>
      </SideDrawer>
    </div>
  );
};

export const WithControls = {
  name: 'With Controls',
  args: {
    opened: true,
    position: 'right',
    width: 360,
    title: 'Details',
    shadow: 'none',
    loading: false,
    disabled: false,
    overlayColor: 'rgba(0,0,0,.35)',
    panelBgColor: '#ffffff',
    headerBgColor: undefined,
    headerBorderColor: '#e6ebf2',
    titleColor: undefined,
    closeButtonColor: undefined,
  },
  render: (args) => (
    <div style={{ height: 400, width: 600, position: 'relative', border: '1px dashed #e6ebf2' }}>
      <SideDrawer {...args}>
        <Card title="Section" padding={12}>
          <div>Any content can go here. Use this as a shell for detail panels.</div>
        </Card>
      </SideDrawer>
    </div>
  ),
};


