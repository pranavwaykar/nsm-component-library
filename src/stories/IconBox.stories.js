import React from 'react';
import { IconBox } from './IconBox';

export default {
  id: 'example-iconbox',
  title: 'Icon Box Component',
  component: IconBox,
  tags: ['autodocs'],
  parameters: { layout: 'centered' },
  argTypes: {
    variant: { control: 'select', options: ['neutral','primary','success','warning','error','info'] },
    size: { control: 'select', options: ['sm','md','lg'] },
    icon: { control: false },
  },
};

const bell = React.createElement('span', { 'aria-hidden': 'true' }, '🔔');

export const Primary = {
  name: 'Icon Box',
  args: {
    icon: bell,
    count: 12,
    label: 'Notifications',
    variant: 'primary',
    size: 'md',
    indicator: true,
  },
};


