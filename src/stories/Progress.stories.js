import React from 'react';
import { Progress } from './Progress';

export default {
  id: 'example-progress',
  title: 'Progress Component',
  component: Progress,
  tags: ['autodocs'],
  parameters: { layout: 'centered' },
};

export const Bar = {
  name: 'Progress Bar',
  args: { value: 40, color: '#3B82F6' },
  render: (args) => React.createElement(Progress, { ...args }),
};


