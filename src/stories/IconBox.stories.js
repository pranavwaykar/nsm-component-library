import React from 'react';
import { IconBox } from '../components/IconBox/IconBox';

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
    as: { control: 'text' },
    id: { control: 'text' },
    tabIndex: { control: 'number' },
    role: { control: 'text' },
    title: { control: 'text' },
    hidden: { control: 'boolean' },
    draggable: { control: 'boolean' },
    'data-testid': { control: 'text', name: 'data-testid' },
    onClick: { action: 'clicked' },
    onFocus: { action: 'focus' },
    onBlur: { action: 'blur' },
    onKeyDown: { action: 'keydown' },
    onKeyUp: { action: 'keyup' },
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
    id: 'iconbox-1',
    tabIndex: 0,
    'data-testid': 'iconbox',
  },
};


