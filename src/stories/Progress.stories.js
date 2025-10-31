import React from 'react';
import { ProgressBar, ProgressRing } from '../components/Progress/Progress';

export default {
  id: 'example-progress',
  title: 'Progress Component',
  component: ProgressBar,
  tags: ['autodocs'],
  parameters: { layout: 'centered' },
  argTypes: {
    as: { control: 'text' }, id: { control: 'text' }, 'data-testid': { control: 'text', name: 'data-testid' },
    role: { control: 'text' }, tabIndex: { control: 'number' }, title: { control: 'text' }, hidden: { control: 'boolean' }, draggable: { control: 'boolean' },
    onClick: { action: 'clicked' }, onFocus: { action: 'focus' }, onBlur: { action: 'blur' }, onKeyDown: { action: 'keydown' }, onKeyUp: { action: 'keyup' },
    style: { control: 'object' }, className: { control: 'text' },
  }
};

export const Bar = {
  name: 'Progress Bar',
  args: { value: 40, max: 100, indeterminate: false, label: 'Uploading', id: 'pbar-1', 'data-testid': 'pbar' },
  render: (args) => React.createElement(ProgressBar, { ...args }),
};

export const Ring = {
  name: 'Progress Ring',
  args: { value: 65, max: 100, size: 64, stroke: 6, indeterminate: false, label: 'Loading', id: 'pring-1', 'data-testid': 'pring' },
  render: (args) => React.createElement(ProgressRing, { ...args }),
};


