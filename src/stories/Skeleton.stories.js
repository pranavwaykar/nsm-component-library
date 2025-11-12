import React from 'react';
import { Skeleton } from '../components/Skeleton/Skeleton';
import { commonArgTypes } from './helpers/controls';

export default {
  id: 'example-skeleton',
  title: 'Skeleton Component',
  component: Skeleton,
  tags: ['autodocs'],
  parameters: { layout: 'centered', docs: { description: { component: 'Skeleton provides lightweight placeholders while content loads. Use rect or circle styles with w/h to match final layout. All universal/style props are supported to control spacing and layout without extra wrappers.' } } },
  argTypes: {
    ...commonArgTypes,
    w: { control: 'text' },
    h: { control: 'text' },
    circle: { control: 'boolean' },
    skeletonStartColor: { control: 'color' },
    skeletonMidColor: { control: 'color' },
    skeletonEndColor: { control: 'color' },
    skeletonRadius: { control: 'text' },
  }
};

export const Rect = {
  name: 'Rect',
  args: { w: 240, h: 20, id: 'skel-1', 'data-testid': 'skel', m: '0', skeletonStartColor: '#f3f4f6', skeletonMidColor: '#e5e7eb', skeletonEndColor: '#f3f4f6' },
  argTypes: {
    variant: {table: {disable: true}},
    size: {table: {disable: true}}
  },
  render: (args) => React.createElement(Skeleton, { ...args }),
};

export const Circle = {
  name: 'Circle',
  args: { circle: true, w: 64, h: 64, skeletonStartColor: '#f3f4f6', skeletonMidColor: '#e5e7eb', skeletonEndColor: '#f3f4f6' },
  render: (args) => React.createElement(Skeleton, { ...args }),
};
