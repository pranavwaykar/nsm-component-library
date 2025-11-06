import React from 'react';
import { ProgressBar, ProgressRing } from '../components/Progress/Progress';
import { universalArgTypes, styleSystemArgTypes } from './helpers/controls';

export default {
  id: 'example-progress',
  title: 'Progress Component',
  component: ProgressBar,
  tags: ['autodocs'],
  parameters: {
    layout: 'centered',
    docs: { description: { component: 'Progress conveys the status of ongoing operations. Use the linear ProgressBar for horizontal flows and the ProgressRing for compact, radial feedback. Both support an indeterminate state, a11y roles/aria, and full container styling via the universal props and shorthand style-system.' } },
  },
  argTypes: { ...universalArgTypes, ...styleSystemArgTypes, value: { control: 'number' }, max: { control: 'number' }, indeterminate: { control: 'boolean' } }
};

export const Bar = {
  name: 'Progress Bar',
  args: { value: 40, max: 100, indeterminate: false, label: 'Uploading', id: 'pbar-1', 'data-testid': 'pbar', m: '0', w: 240, h: 8 },
  render: (args) => React.createElement(ProgressBar, { ...args }),
};

export const Ring = {
  name: 'Progress Ring',
  args: { value: 65, max: 100, size: 64, stroke: 6, indeterminate: false, label: 'Loading', id: 'pring-1', 'data-testid': 'pring', m: '0' },
  render: (args) => React.createElement(ProgressRing, { ...args }),
};


