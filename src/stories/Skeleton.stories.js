import React from 'react';
import { Skeleton } from '../components/Skeleton/Skeleton';
import { universalArgTypes, styleSystemArgTypes } from './helpers/controls';

export default {
  id: 'example-skeleton',
  title: 'Skeleton Component',
  component: Skeleton,
  tags: ['autodocs'],
  parameters: { layout: 'centered', docs: { description: { component: 'Skeleton provides lightweight placeholders while content loads. Use the rect, text, or circle styles with width/height/lines to match final layout. All universal/style props are supported to control spacing and layout without extra wrappers.' } } },
  argTypes: { ...universalArgTypes, ...styleSystemArgTypes, variant: { control: 'select', options: ['rect','text'] }, width: { control: 'text' }, height: { control: 'text' }, lines: { control: 'number' }, circle: { control: 'boolean' } }
};

export const Rect = {
  name: 'Rect',
  args: { variant: 'rect', width: 240, height: 20, id: 'skel-1', 'data-testid': 'skel', m: '0' },
  render: (args) => React.createElement(Skeleton, { ...args }),
};

export const Text = {
  name: 'Text',
  args: { variant: 'text', lines: 4 },
  render: (args) => React.createElement(Skeleton, { ...args }),
};

export const Circle = {
  name: 'Circle',
  args: { variant: 'rect', circle: true, width: 64, height: 64 },
  render: (args) => React.createElement(Skeleton, { ...args }),
};
