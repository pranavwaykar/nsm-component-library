import React from 'react';
import { FlexBox } from './FlexBox';

export default {
  id: 'example-flexbox',
  title: 'FlexBox Component',
  component: FlexBox,
  parameters: { layout: 'centered' },
  tags: ['autodocs'],
  argTypes: {
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
  },
};

export const Playground = {
  name: 'FlexBox',
  render: (args) => React.createElement(FlexBox, { ...args },
    React.createElement('div', { style: { background: '#e5e7eb', padding: 10 } }, 'A'),
    React.createElement('div', { style: { background: '#e5e7eb', padding: 10 } }, 'B'),
    React.createElement('div', { style: { background: '#e5e7eb', padding: 10 } }, 'C'),
  ),
  args: { direction: 'row', align: 'center', justify: 'flex-start', gap: 8, wrap: false, id: 'flex-1', 'data-testid': 'flex' },
};


