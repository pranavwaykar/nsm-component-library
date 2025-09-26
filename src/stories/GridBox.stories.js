import React from 'react';
import { GridBox } from './GridBox';

export default {
  id: 'example-gridbox',
  title: 'GridBox Component',
  component: GridBox,
  parameters: { layout: 'centered' },
  tags: ['autodocs'],
};

export const Playground = {
  name: 'GridBox',
  render: (args) => React.createElement(GridBox, { ...args },
    React.createElement('div', { style: { background: '#e5e7eb', padding: 10 } }, '1'),
    React.createElement('div', { style: { background: '#e5e7eb', padding: 10 } }, '2'),
    React.createElement('div', { style: { background: '#e5e7eb', padding: 10 } }, '3'),
    React.createElement('div', { style: { background: '#e5e7eb', padding: 10 } }, '4'),
    React.createElement('div', { style: { background: '#e5e7eb', padding: 10 } }, '5'),
    React.createElement('div', { style: { background: '#e5e7eb', padding: 10 } }, '6'),
  ),
  args: { columns: 'repeat(3, minmax(0, 1fr))', gap: 12 },
};


