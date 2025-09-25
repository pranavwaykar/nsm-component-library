import { fn } from 'storybook/test';

import { Button } from './Button';

// More on how to set up stories at: https://storybook.js.org/docs/writing-stories#default-export
export default {
  title: 'Example/Button',
  component: Button,
  parameters: {
    // Optional parameter to center the component in the Canvas. More info: https://storybook.js.org/docs/configure/story-layout
    layout: 'centered',
    docs: {
      description: {
        component: 'Explain what Button is for, usage guidance, accessibility notes.'
      },
      source: {
        type: 'code',
        code: `
<Button
  label="Button"
  onClick={() => {}}
  variant="primary"
  backgroundColor="#555ab9"
  textColor="#ffffff"
  size="medium"
  radius="pill"
  shadow="none"
  disabled={false}
  loading={false}
  fullWidth={false}
  uppercase={false}
  leftIcon=""
  rightIcon=""
  type="button"
/>
        `
      }
    }
  },
  // This component will have an automatically generated Autodocs entry: https://storybook.js.org/docs/writing-docs/autodocs
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

// More on writing stories with args: https://storybook.js.org/docs/writing-stories/args
export const Primary = {
  args: {
    primary: true,
    label: 'Button',
    variant: 'primary',
  },
};

export const Secondary = {
  args: {
    label: 'Button',
    variant: 'secondary',
  },
};

export const Large = {
  args: {
    size: 'large',
    label: 'Button',
  },
};

export const Small = {
  args: {
    size: "small",
    label: 'Button',
  },
};

export const Outline = {
  args: {
    label: 'Button',
    variant: 'outline',
  },
};

export const WithIconAndLoading = {
  args: {
    label: 'Save',
    leftIcon: '💾',
    loading: true,
    variant: 'primary',
  },
};
