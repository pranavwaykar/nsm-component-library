import { fn } from 'storybook/test';

import { Button as ButtonComponent } from './Button';

export default {
  id: 'example-button',
  title: 'Button Component',
  component: ButtonComponent,
  parameters: {
    layout: 'centered',
    docs: {
      description: {
        component: 'Explain what Button is for, usage guidance, accessibility notes.'
      }
    }
  },
  
  tags: ['autodocs'],
  argTypes: {
    primary: { control: false, table: { disable: true } },
    variant: {
      control: 'select',
      options: ['primary','secondary','ghost','link','destructive','success','warning']
    },
    backgroundColor: { control: 'color' },
    textColor: { control: 'color' },
    size: {
      control: 'select',
      options: ['xsmall','small','medium','large','xlarge']
    },
    radius: {
      control: 'select',
      options: ['none','sm','md','lg','pill']
    },
    shadow: {
      control: 'select',
      options: ['none','sm','md','lg']
    },
    fullWidth: { control: 'boolean' },
    uppercase: { control: 'boolean' },
    disabled: { control: 'boolean' },
    loading: { control: 'boolean' },
    leftIcon: { control: 'text' },
    rightIcon: { control: 'text' },
    indicator: { control: 'boolean' },
    count: { control: 'number' },
    type: { control: 'radio', options: ['button','submit','reset'] },
  },
  args: { onClick: fn() },
};

export const Primary = {
  name: 'Button',
  args: {
    label: 'Button',
    variant: 'primary',
    indicator: false,
    count: undefined,
  },
};