import React from 'react';
import { FlexBox } from '../components/FlexBox/FlexBox';
import { universalArgTypes, styleSystemArgTypes } from './helpers/controls';

export default {
  id: 'example-flexbox',
  title: 'FlexBox Component',
  component: FlexBox,
  parameters: { layout: 'centered', docs: { description: { component: 'FlexBox is a light wrapper over CSS Flexbox with a simplified API (direction, align, justify, gap, wrap). Use it to compose layouts quickly. Universal/style props allow full control of spacing and dimensions.' } } },
  tags: ['autodocs'],
  argTypes: { ...universalArgTypes, ...styleSystemArgTypes, direction: { control: 'select', options: ['row','row-reverse','column','column-reverse'] }, align: { control: 'select', options: ['stretch','flex-start','center','flex-end','baseline'] }, justify: { control: 'select', options: ['flex-start','center','flex-end','space-between','space-around','space-evenly'] }, gap: { control: 'text' }, wrap: { control: 'boolean' } },
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


