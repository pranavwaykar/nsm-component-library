import React from 'react';
import { Skeleton } from '../components/Skeleton/Skeleton';

export default {
  id: 'example-skeleton',
  title: 'Skeleton Component',
  component: Skeleton,
  tags: ['autodocs'],
  parameters: { layout: 'centered' },
  argTypes: {
    as: { control: 'text' }, id: { control: 'text' }, 'data-testid': { control: 'text', name: 'data-testid' },
    role: { control: 'text' }, tabIndex: { control: 'number' }, title: { control: 'text' }, hidden: { control: 'boolean' }, draggable: { control: 'boolean' },
    onClick: { action: 'clicked' }, onFocus: { action: 'focus' }, onBlur: { action: 'blur' }, onKeyDown: { action: 'keydown' }, onKeyUp: { action: 'keyup' },
    style: { control: 'object' }, className: { control: 'text' },
  }
};

export const Rect = {
  name: 'Rect',
  args: { variant: 'rect', width: 240, height: 20, id: 'skel-1', 'data-testid': 'skel' },
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
