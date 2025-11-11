import React from "react";
import { IconBox } from "../components/IconBox/IconBox";
import { commonArgTypes } from "./helpers/controls";

export default {
  id: "example-iconbox",
  title: "Icon Box Component",
  component: IconBox,
  tags: ["autodocs"],
  parameters: {
    layout: "centered",
    docs: {
      description: {
        component:
          "IconBox pairs an icon with an optional label, count badge, and attention indicator. Useful for navigation shortcuts, metrics, and notifications. Variants control visual emphasis; size adjusts tap targets. Fully clickable (keyboard accessible) and supports universal props and the shorthand style-system for layout and spacing.",
      },
    },
  },
  argTypes: {
    ...commonArgTypes,
    variant: {
      control: "select",
      options: ["neutral", "primary", "success", "warning", "error", "info"],
    },
    size: { control: "select", options: ["sm", "md", "lg"] },
    iconText: {
      control: "text",
      description: "Replace the icon with text (or leave empty to use default)",
    },
    radius: { table: { disable: true } },
    rounded: { table: { disable: true } },
    tone: { table: { disable: true } },
  },
};

const bell = React.createElement("span", { "aria-hidden": "true" }, "🔔");

export const Primary = {
  name: "Icon Box",
  args: {
    as: "div",
    id: "iconbox-1",
    "data-testid": "iconbox",
    tabIndex: 0,
    dir: "ltr",
    hidden: false,
    icon: bell,
    iconText: "",
    count: 12,
    label: "Notifications",
    variant: "primary",
    size: "md",
    indicator: true,
    m: "0",
    px: "10px",
    py: "8px",
  },
  render: (args) => {
    const icon = args.iconText
      ? React.createElement("span", { "aria-hidden": "true" }, args.iconText)
      : args.icon;
    return React.createElement(IconBox, { ...args, icon });
  },
};
