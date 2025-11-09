import React from 'react';
import { GridBox } from '../components/GridBox/GridBox';
import { commonArgTypes } from './helpers/controls';

export default {
  id: 'example-gridbox',
  title: 'GridBox Component',
  component: GridBox,
  parameters: { layout: 'centered', docs: { description: { component: 'GridBox exposes a minimal API for CSS Grid layouts (columns/rows/gap). Use it for cards, dashboards, and responsive compositions. Universal/style props let you control spacing and responsiveness without extra wrappers.' } } },
  tags: ['autodocs'],
  argTypes: { ...commonArgTypes, columns: { control: 'text' }, rows: { control: 'text' }, gap: { control: 'text' } },
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


