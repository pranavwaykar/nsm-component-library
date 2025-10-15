import React from 'react';
import '../stories/tokens.css';
import '../muamelat/styles/index.scss';
import { Tooltip } from '../muamelat';

export default {
  id: 'tooltip',
  title: 'Muamelat/Tooltip',
  component: Tooltip,
  tags: ['autodocs'],
  parameters: {
    layout: 'padded',
    docs: { source: { language: 'jsx', code: '<Tooltip content="Tooltip info"><span>Hover on me</span></Tooltip>' } },
  },
};

export const Playground = {
  name: 'Playground',
  render: () => React.createElement('div', { style: { display:'flex', alignItems:'center', justifyContent:'center', height: 160 } },
    React.createElement(Tooltip, { content: 'Tooltip info', width: 220 }, React.createElement('span', null, 'Hover on me'))
  ),
};


