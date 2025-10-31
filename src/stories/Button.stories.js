import React from "react";
import { fn } from "storybook/test";

import { Button as ButtonComponent } from "../components/Button/Button";

export default {
  id: "example-button",
  title: "Button Component",
  component: ButtonComponent,
  parameters: {
    layout: "centered",
    docs: {
      description: {
        component:
          "Explain what Button is for, usage guidance, accessibility notes.",
      },
    },
  },

  tags: ["autodocs"],
  argTypes: {
    as: { control: "text" },
    id: { control: "text" },
    tabIndex: { control: "number" },
    title: { control: "text" },
    hidden: { control: "boolean" },
    draggable: { control: "boolean" },
    dir: { control: "text" },
    lang: { control: "text" },
    "aria-label": { control: "text", name: "aria-label" },
    className: { control: "text" },
    style: { control: "object" },
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
    id: "btn-1",
    tabIndex: 0,
    draggable: false,
    hidden: false,
    "aria-label": "Button",
    dir: "ltr",
    lang: "en",
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
