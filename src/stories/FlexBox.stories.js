import React from 'react';
import { FlexBox } from './FlexBox';

export default {
  id: 'example-flexbox',
  title: 'FlexBox Component',
  component: FlexBox,
  parameters: { layout: 'centered' },
  tags: ['autodocs'],
};

export const Playground = {
  name: 'FlexBox',
  render: (args) => React.createElement(FlexBox, { ...args },
    React.createElement('div', { style: { background: '#e5e7eb', padding: 10 } }, 'A'),
    React.createElement('div', { style: { background: '#e5e7eb', padding: 10 } }, 'B'),
    React.createElement('div', { style: { background: '#e5e7eb', padding: 10 } }, 'C'),
  ),
  args: { direction: 'row', align: 'center', justify: 'flex-start', gap: 8, wrap: false },
};


