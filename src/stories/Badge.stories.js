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
  }
};

export const Primary = {
  name: 'Badge',
  render: (args) => React.createElement(Badge, { ...args }),
  args: { label: 'Active', variant: 'success', dot: true, pill: true },
};


