import React from 'react';
import { ProgressBar, ProgressRing } from './Progress';

export default {
  id: 'example-progress',
  title: 'Progress Component',
  component: ProgressBar,
  tags: ['autodocs'],
  parameters: { layout: 'centered' },
};

export const Bar = {
  name: 'Progress Bar',
  args: { value: 40, max: 100, indeterminate: false, label: 'Uploading' },
  render: (args) => React.createElement(ProgressBar, { ...args }),
};

export const Ring = {
  name: 'Progress Ring',
  args: { value: 65, max: 100, size: 64, stroke: 6, indeterminate: false, label: 'Loading' },
  render: (args) => React.createElement(ProgressRing, { ...args }),
};


