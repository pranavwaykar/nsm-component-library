import React from 'react';
import { ProgressBar, ProgressRing } from '../components/Progress/Progress';
import { commonArgTypes } from './helpers/controls';

export default {
  id: 'example-progress',
  title: 'Progress Component',
  component: ProgressBar,
  tags: ['autodocs'],
  parameters: {
    layout: 'centered',
    docs: { description: { component: 'Progress conveys the status of ongoing operations. Use the linear ProgressBar for horizontal flows and the ProgressRing for compact, radial feedback. Both support an indeterminate state, a11y roles/aria, and full container styling via the universal props and shorthand style-system.' } },
  },
  argTypes: {
    ...commonArgTypes,
    value: { control: 'number' },
    max: { control: 'number' },
    indeterminate: { control: 'boolean' },
    barTrackColor: { control: 'color' },
    barFillColor: { control: 'color' },
    barWidth: { control: 'text' },
    barHeight: { control: 'text' },
    ringBgColor: { control: 'color' },
    ringFgColor: { control: 'color' },
  }
};

export const Bar = {
  name: 'Progress Bar',
  args: { value: 40, max: 100, indeterminate: false, label: 'Uploading', id: 'pbar-1', 'data-testid': 'pbar', m: '0', barWidth: '240px', barHeight: '8px', barTrackColor: '#f3f4f6', barFillColor: '#3b82f6' },
  render: (args) => React.createElement(ProgressBar, { ...args }),
};

export const Ring = {
  name: 'Progress Ring',
  args: { value: 65, max: 100, size: 64, stroke: 6, indeterminate: false, label: 'Loading', id: 'pring-1', 'data-testid': 'pring', m: '0', ringBgColor: '#e5e7eb', ringFgColor: '#10b981' },
  render: (args) => React.createElement(ProgressRing, { ...args }),
};


