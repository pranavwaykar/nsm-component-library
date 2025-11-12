import React, { useEffect, useState } from "react";
import { Modal } from "../components/Modal/Modal";
import { Button } from "../components/Button/Button";
import { commonArgTypes } from "./helpers/controls";

export default {
  id: "example-modal",
  title: "Modal Component",
  component: Modal,
  parameters: { layout: "centered" },
  tags: ["autodocs"],
  argTypes: {
    ...commonArgTypes,
    open: { control: "boolean" },
    width: { control: "number" },
    closeOnEsc: { control: "boolean" },
    closeOnOutside: { control: "boolean" },
    showClose: { control: "boolean" },
    showHeaderBorder: { control: "boolean" },
    showFooterBorder: { control: "boolean" },
    overlayBg: { control: "color" },
    contentBg: { control: "color" },
    contentTextColor: { control: "color" },
    headerBg: { control: "color" },
    headerTextColor: { control: "color" },
    footerBg: { control: "color" },
    footerTextColor: { control: "color" },
    innerBorderColor: { control: "color" },
    headerCloseIconColor: { control: "color" },
    headerLeftContent: { control: "text" },
    headerRightContent: { control: "text" },
    footerLeftContent: { control: "text" },
    footerRightContent: { control: "text" },
    closeVariant: { control: "select", options: ["icon","primary","secondary","ghost","destructive","success","warning"] },
  },
  parameters: {
    layout: "centered",
    docs: {
      description: {
        component:
          "Modal presents focused content in a layer above the UI. It supports Esc/outside‑click dismissal, header with title/close button, and width control. The overlay and container accept universal and style props, enabling patterns like full‑screen modals, side sheets, or elevated dialogs using tokens for radius/elevation/shadow.",
      },
    },
  },
};

export const Basic = {
  render: (args) => {
    const [open, setOpen] = useState(Boolean(args.open));
    useEffect(() => {
      setOpen(Boolean(args.open));
    }, [args.open]);
    const defaultRight =
      args.footerRightContent !== undefined
        ? args.footerRightContent
        : React.createElement(Button, {
            label: "Close",
            variant: "secondary",
            backgroundColor: args.footerCloseButtonColor,
            textColor: args.footerCloseButtonTextColor,
            onClick: () => setOpen(false),
          });
    return React.createElement(
      React.Fragment,
      null,
      React.createElement(Button, {
        label: "Open",
        variant: "primary",
        size: "medium",
        onClick: () => setOpen(true),
      }),
      React.createElement(Modal, {
        ...args,
        open,
        onClose: () => {
          setOpen(false);
          args.onClose && args.onClose();
        },
        title: args.title || "Hello",
        header: args.header,
        footerRightContent: defaultRight,
      })
    );
  },
  args: {
    as: "div",
    id: "modal-1",
    "data-testid": "modal",
    tabIndex: -1,
    width: 500,
    closeOnEsc: true,
    closeOnOutside: true,
    showClose: true,
    m: "0",
    open: false,
    title: "Hello",
  },
  argTypes: {
    variant: { table: { disable: true } },
    closeVariant: { table: { disable: true } },
    width: { table: { disable: true } },
    draggable: { table: { disable: true } },
    title: { table: { disable: true } },
    shadow: { table: { disable: true } },
    size: { table: { disable: true } },
    headerProps: { table: { disable: true } },
    footerProps: { table: { disable: true } },
    footerCloseButtonColor: { control: "color" },
    footerCloseButtonTextColor: { control: "color" },
  }
};
