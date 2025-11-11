import React from 'react';
import { FlexBox } from '../components/FlexBox/FlexBox';
import { commonArgTypes } from './helpers/controls';

export default {
  id: 'example-flexbox',
  title: 'FlexBox Component',
  component: FlexBox,
  parameters: { layout: 'centered', docs: { description: { component: 'FlexBox is a light wrapper over CSS Flexbox with a simplified API (direction, align, justify, gap, wrap). Use it to compose layouts quickly. Universal/style props allow full control of spacing and dimensions.' } } },
  tags: ['autodocs'],
  argTypes: { ...commonArgTypes, direction: { control: 'select', options: ['row','row-reverse','column','column-reverse'] }, align: { control: 'select', options: ['stretch','flex-start','center','flex-end','baseline'] }, justify: { control: 'select', options: ['flex-start','center','flex-end','space-between','space-around','space-evenly'] }, gap: { control: 'number' }, wrap: { control: 'boolean' } },
};

export const Playground = {
  name: 'FlexBox',
  render: (args) => {
    const items = Array.isArray(args.items) ? args.items : ['A', 'B', 'C'];
    const boxStyle = { background: '#e5e7eb', padding: args.itemPadding ?? 10, width: args.itemW, height: args.itemH, display: 'flex', alignItems: 'center', justifyContent: 'center' };
    return React.createElement(FlexBox, { ...args },
      ...items.map((it, i) => React.createElement('div', { key: i, style: boxStyle }, it))
    );
  },
  args: { direction: 'row', align: 'center', justify: 'flex-start', gap: 8, wrap: false, items: ['A','B','C'], itemPadding: 10, id: 'flex-1', 'data-testid': 'flex' },
  argTypes: { items: { control: 'object' }, itemPadding: { control: 'number' }, itemW: { control: 'text' }, itemH: { control: 'text' } },
};


