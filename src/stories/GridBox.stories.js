import React from 'react';
import { GridBox } from '../components/GridBox/GridBox';
import { commonArgTypes } from './helpers/controls';

export default {
  id: 'example-gridbox',
  title: 'GridBox Component',
  component: GridBox,
  parameters: { layout: 'centered', docs: { description: { component: 'GridBox exposes a minimal API for CSS Grid layouts (columns/rows/gap). Use it for cards, dashboards, and responsive compositions. Universal/style props let you control spacing and responsiveness without extra wrappers.' } } },
  tags: ['autodocs'],
  argTypes: { ...commonArgTypes, columns: { control: 'text' }, rows: { control: 'text' }, gap: { control: 'number' } },
};

export const Playground = {
  name: 'GridBox',
  render: (args) => {
    const items = Array.isArray(args.items) ? args.items : ['1','2','3'];
    const boxStyle = { background: '#e5e7eb', padding: args.itemPadding ?? 10, width: args.itemW, height: args.itemH, display: 'flex', alignItems: 'center', justifyContent: 'center' };
    return React.createElement(GridBox, { ...args },
      ...items.map((it, i) => React.createElement('div', { key: i, style: boxStyle }, it))
    );
  },
  args: { columns: 'repeat(3, 100px)', gap: 12, items: ['1','2','3'], itemPadding: 10, id: 'grid-1', 'data-testid': 'grid' },
  argTypes: { items: { control: 'object' }, itemPadding: { control: 'number' }, itemW: { control: 'text' }, itemH: { control: 'text' } },
};


