import React from "react";
import { Badge } from "../components/Badge/Badge";
import { commonArgTypes } from "./helpers/controls";

export default {
  id: "example-badge",
  title: "Badge Component",
  component: Badge,
  parameters: {
    layout: "centered",
    docs: {
      description: {
        component:
          "Badge is a compact label used to annotate UI elements with status or metadata. It supports semantic color tokens, variants (solid, outline, ghost, link), size scale (xs–xl), tone (mapped to opacity), and design tokens for radius and elevation. Badges are polymorphic via `as` and accept the full universal prop set (a11y, events, data-/aria-*). Styling entry points include `className`, `style`, and a comprehensive shorthand style-system for spacing/layout/typography/background/borders/effects/transforms.",
      },
    },
  },
  tags: ["autodocs"],
  argTypes: {
    ...commonArgTypes,
    variant: { control: "select", options: ["solid", "outline", "ghost", "link"] },
    size: { control: "select", options: ["xs", "sm", "md", "lg", "xl"] },
    color: { control: "select", options: ["neutral", "primary", "success", "warning", "error", "info"] },
    tone: { control: "select", options: ["default", "subtle", "strong"] },
    elevation: { control: "select", options: [0, 1, 2, 3, 4, 5] },
    shadow: { control: "select", options: ["none", "sm", "md", "lg"] },
    pill: { control: "boolean" },
    dot: { control: "boolean" },
    indicator: { control: "boolean" },
    icon: { control: "text" },
    label: { control: "text" },
    as: { control: "select", options: ["span", "a", "button", "div"] },
  },
};

export const Primary = {
  name: "Badge",
  render: (args) => React.createElement(Badge, { ...args }),
  args: {
    id: "badge-1",
    className: "badge-story",
    label: "Active",
    variant: "solid",
    color: "success",
    size: "sm",
    tone: "default",
    elevation: 0,
    shadow: "none",
    indicator: true,
    icon: undefined,
    pill: true,
    tabIndex: 0,
    draggable: false,
    hidden: false,
    dir: "ltr",
    "data-testid": "badge",
    title: "Active",
    children: "Active",
    style: { fontWeight: "bold" },
    m: "0",
    px: "8px",
    py: "2px",
    w: "auto",
    h: "auto",
    as: "span",
    bgColor: undefined,
    borderColor: undefined,
  },
};
