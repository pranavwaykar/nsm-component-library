import React from 'react';
import { Badge } from './Badge';

export default {
  id: 'example-badge',
  title: 'Badge Component',
  component: Badge,
  parameters: { layout: 'centered' },
  tags: ['autodocs'],
  argTypes: {
    variant: { control: 'select', options: ['neutral','primary','success','warning','error','info'] },
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
  }
};

export const Primary = {
  name: 'Badge',
  render: (args) => React.createElement(Badge, { ...args }),
  args: { label: 'Active', variant: 'success', dot: true, pill: true, id: 'badge-1', tabIndex: 0, 'data-testid': 'badge' },
};


