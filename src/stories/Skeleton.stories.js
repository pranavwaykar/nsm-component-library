import React from 'react';
import { Skeleton } from './Skeleton';

export default {
  id: 'example-skeleton',
  title: 'Skeleton Component',
  component: Skeleton,
  parameters: { layout: 'centered' },
  tags: ['autodocs'],
};

export const Rect = {
  name: 'Rect',
  render: (args) => React.createElement(Skeleton, { ...args }),
  args: { variant: 'rect', width: 240, height: 120 },
};

export const Text = {
  name: 'Text',
  render: (args) => React.createElement(Skeleton, { ...args }),
  args: { variant: 'text', lines: 4 },
};

export const Circle = {
  name: 'Circle',
  render: (args) => React.createElement(Skeleton, { ...args }),
  args: { variant: 'rect', circle: true, width: 64, height: 64 },
};


