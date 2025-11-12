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
  }
};

export const Bar = {
  name: 'Progress Bar',
  args: { value: 40, max: 100, indeterminate: false, label: 'Uploading', showLabel: true, labelPlacement: 'bottom', labelFontSize: '12px', id: 'pbar-1', 'data-testid': 'pbar', m: '0', barWidth: '240px', barHeight: '8px', barTrackColor: '#f3f4f6', barFillColor: '#3b82f6' },
  argTypes: {
    barTrackColor: { control: 'color' },
    barFillColor: { control: 'color' },
    barWidth: { control: 'text' },
    barHeight: { control: 'text' },
    showLabel: { control: 'boolean' },
    labelPlacement: { control: 'select', options: ['top','bottom'] },
    labelColor: { control: 'color' },
    labelFontFamily: { control: 'text' },
    labelFontSize: { control: 'text' },
    labelFontWeight: { control: 'text' },
    labelGap: { control: 'text' },
    variant: { table: { disable: true } },
    size: { table: { disable: true } },
    loading: { table: { disable: true } },
    color: { table: { disable: true } },
  },
  render: (args) => React.createElement(ProgressBar, { ...args }),
};

export const Ring = {
  name: 'Progress Ring',
  args: { value: 65, max: 100, size: 64, stroke: 6, indeterminate: false, label: 'Loading', showLabel: true, labelPlacement: 'bottom', labelFontSize: '12px', id: 'pring-1', 'data-testid': 'pring', m: '0', ringBgColor: '#e5e7eb', ringFgColor: '#10b981' },
  argTypes: {
    size: { control: 'number' },
    stroke: { control: 'number' },
    ringBgColor: { control: 'color' },
    ringFgColor: { control: 'color' },
    showLabel: { control: 'boolean' },
    labelPlacement: { control: 'select', options: ['top','bottom'] },
    labelColor: { control: 'color' },
    labelFontFamily: { control: 'text' },
    labelFontSize: { control: 'text' },
    labelFontWeight: { control: 'text' },
    labelGap: { control: 'text' },
    variant: { table: { disable: true } },
    size: { table: { disable: true } },
    loading: { table: { disable: true } },
    color: { table: { disable: true } },
  },
  render: (args) => React.createElement(ProgressRing, { ...args }),
};


