import React from 'react';
import { GridBox } from '../components/GridBox/GridBox';

export default {
  id: 'example-gridbox',
  title: 'GridBox Component',
  component: GridBox,
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
  name: 'GridBox',
  render: (args) => React.createElement(GridBox, { ...args },
    React.createElement('div', { style: { background: '#e5e7eb', padding: 10 } }, '1'),
    React.createElement('div', { style: { background: '#e5e7eb', padding: 10 } }, '2'),
    React.createElement('div', { style: { background: '#e5e7eb', padding: 10 } }, '3'),
  ),
  args: { columns: 'repeat(3, 100px)', gap: 12, id: 'grid-1', 'data-testid': 'grid' },
};


