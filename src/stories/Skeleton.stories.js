import React from 'react';
import { Skeleton } from '../components/Skeleton/Skeleton';
import { commonArgTypes } from './helpers/controls';

export default {
  id: 'example-skeleton',
  title: 'Skeleton Component',
  component: Skeleton,
  tags: ['autodocs'],
  parameters: { layout: 'centered', docs: { description: { component: 'Skeleton provides lightweight placeholders while content loads. Use rect or circle styles with width/height to match final layout. All universal/style props are supported to control spacing and layout without extra wrappers.' } } },
  argTypes: { ...commonArgTypes, width: { control: 'text' }, height: { control: 'text' }, circle: { control: 'boolean' } }
};

export const Rect = {
  name: 'Rect',
  args: { width: 240, height: 20, id: 'skel-1', 'data-testid': 'skel', m: '0' },
  render: (args) => React.createElement(Skeleton, { ...args }),
};

export const Circle = {
  name: 'Circle',
  args: { circle: true, width: 64, height: 64 },
  render: (args) => React.createElement(Skeleton, { ...args }),
};
