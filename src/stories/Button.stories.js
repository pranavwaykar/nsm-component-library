import React from "react";
import { fn } from "storybook/test";

import { Button as ButtonComponent } from "../components/Button/Button";
import { commonArgTypes } from './helpers/controls';

export default {
  id: "example-button",
  title: "Button Component",
  component: ButtonComponent,
  parameters: {
    layout: "centered",
    docs: {
      description: {
        component:
          "Button triggers an action or workflow. Variants cover common intents (primary, secondary, ghost, link, destructive, success, warning) with a consistent size scale (xsmall–xlarge). Supports loading/disabled states, count/indicator badges, and optional left/right icons. Buttons are polymorphic via `as` and expose full universal props (id, data-/aria-*, a11y events). Styling entry points: tokens for radius/elevation/shadow, and a rich shorthand style-system for spacing/layout/background/borders/effects/typography.",
      },
    },
  },

  tags: ["autodocs"],
  argTypes: {
    ...commonArgTypes,
    sx: { control: "object" },
    primary: { control: false, table: { disable: true } },
    variant: {
      control: "select",
      options: [
        "primary",
        "secondary",
        "ghost",
        "link",
        "destructive",
        "success",
        "warning",
      ],
    },
    backgroundColor: { control: "color" },
    textColor: { control: "color" },
    size: {
      control: "select",
      options: ["xsmall", "small", "medium", "large", "xlarge"],
    },
    radius: {
      control: "select",
      options: ["none", "sm", "md", "lg", "pill"],
    },
    shadow: {
      control: "select",
      options: ["none", "sm", "md", "lg"],
    },
    fullWidth: { control: "boolean" },
    uppercase: { control: "boolean" },
    disabled: { control: "boolean" },
    loading: { control: "boolean" },
    leftIcon: { control: "text" },
    rightIcon: { control: "text" },
    indicator: { control: "boolean" },
    count: { control: "number" },
    type: { control: "radio", options: ["button", "submit", "reset"] },
  },
  args: {
    onClick: fn(),
    as: 'button',
    id: "btn-1",
    tabIndex: 0,
    draggable: false,
    hidden: false,
    "aria-label": "Button",
    dir: "ltr",
    m: '0', w: 'auto',
  },
};

export const Primary = {
  name: "Button",
  render: (args) => React.createElement(ButtonComponent, { ...args }),
  args: {
    label: "Button",
    variant: "primary",
    indicator: false,
    count: undefined,
    id: "button-1",
    tabIndex: 0,
    "data-testid": "button",
  },
};
