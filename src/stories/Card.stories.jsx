import React from 'react';
import Card from '../components/Card/Card';
import { commonArgTypes } from './helpers/controls';

export default {
  title: 'Card Component',
  component: Card,
  parameters: { layout: 'centered' },
  args: { title: 'Card Title', padding: 16 },
  argTypes: {
    ...commonArgTypes,
    padding: { control: { type: 'range', min: 0, max: 40, step: 2 } },
    title: { control: 'text' },
  },
};

export const Basic = (args) => (
  <div style={{ width: 420 }}>
    <Card {...args}>
      <p>This is a generic container. Place any JSX inside.</p>
    </Card>
  </div>
);


