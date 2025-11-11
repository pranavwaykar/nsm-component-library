import React from "react";
import Card from "../components/Card/Card";
import { commonArgTypes } from "./helpers/controls";

export default {
  title: "Card Component",
  component: Card,
  parameters: {
    layout: "centered",
    docs: {
      source: {
        language: "jsx",
        code:
          `<Card title="Card Title">
            <p>This is a generic container. Place any JSX inside.</p>
          </Card>`,
      },
      description: {
        component:
          "Card is a container component used to display content. It accepts the full set of universal/style props so you can control spacing, layout and theming consistently across the library.",
      },
    },
  },
  args: { title: "Card Title", showHeader: true, padding: 16 },
  argTypes: {
    ...commonArgTypes,
    padding: { table: { disable: true } },
    showHeader: { control: "boolean" },
    header: { control: "text" },
    title: { control: "text" },
  },
};

export const Basic = (args) => (
  <div style={{ width: 420 }}>
    <Card {...args}>
      <p>This is a generic container. Place any JSX inside.</p>
    </Card>
  </div>
);
