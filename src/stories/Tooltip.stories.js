import React from 'react';
import '../index.scss';
import { Tooltip } from '../components/Tooltip/Tooltip';
import { universalArgTypes, styleSystemArgTypes } from './helpers/controls';

export default {
  id: 'tooltip',
  title: 'Tooltip',
  component: Tooltip,
  tags: ['autodocs'],
  parameters: {
    layout: 'padded',
    docs: {
      source: { language: 'jsx', code: '<Tooltip content="Tooltip info"><span>Hover on me</span></Tooltip>' },
      description: { component: 'Tooltip displays contextual help on hover or focus without breaking the layout. Provide `content` and wrap the trigger element as children. The surface follows theme tokens and the wrapper accepts universal/style props for placement containers.' },
    },
  },
  argTypes: { ...universalArgTypes, ...styleSystemArgTypes, content: { control: 'text' }, width: { control: 'text' }, open: { control: 'boolean' }, defaultOpen: { control: 'boolean' } },
};

export const Playground = {
  name: 'Playground',
  render: (args) => React.createElement('div', { style: { display:'flex', alignItems:'center', justifyContent:'center', height: 160 } },
    React.createElement(Tooltip, { ...args }, React.createElement('span', null, 'Hover on me'))
  ),
  args: { content: 'Tooltip info', width: 220, as: 'span', id: 'tooltip-1', 'data-testid': 'tooltip', m: '0' },
};


