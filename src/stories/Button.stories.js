import { fn } from 'storybook/test';

import { Button as ButtonComponent } from './Button';

// More on how to set up stories at: https://storybook.js.org/docs/writing-stories#default-export
export default {
  id: 'example-button',
  title: 'Button Module',
  component: ButtonComponent,
  parameters: {
    // Optional parameter to center the component in the Canvas. More info: https://storybook.js.org/docs/configure/story-layout
    layout: 'centered',
    docs: {
      description: {
        component: 'Explain what Button is for, usage guidance, accessibility notes.'
      }
    }
  },
  // Autodocs enabled so you have a Docs page plus one story
  tags: ['autodocs'],
  // More on argTypes: https://storybook.js.org/docs/api/argtypes
  argTypes: {
    variant: {
      control: 'select',
      options: ['primary','secondary','outline','ghost','link','destructive','success','warning']
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
    type: { control: 'radio', options: ['button','submit','reset'] },
  },
  // Use `fn` to spy on the onClick arg, which will appear in the actions panel once invoked: https://storybook.js.org/docs/essentials/actions#action-args
  args: { onClick: fn() },
};

// Single playground story with all controls
export const Primary = {
  name: 'Button',
  args: {
    primary: true,
    label: 'Button',
    variant: 'primary',
    backgroundColor: "#029CFD"
  },
};
