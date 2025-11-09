import React, { useState } from 'react';
import { Modal } from '../components/Modal/Modal';
import { commonArgTypes } from './helpers/controls';

export default {
  id: 'example-modal',
  title: 'Modal Component',
  component: Modal,
  parameters: { layout: 'centered' },
  tags: ['autodocs'],
  argTypes: {
    ...commonArgTypes,
    open: { control: 'boolean' },
    width: { control: 'number' },
    closeOnEsc: { control: 'boolean' },
    closeOnOutside: { control: 'boolean' },
    showClose: { control: 'boolean' },
  },
  parameters: {
    layout: 'centered',
    docs: {
      description: {
        component: 'Modal presents focused content in a layer above the UI. It supports Esc/outside‑click dismissal, header with title/close button, and width control. The overlay and container accept universal and style props, enabling patterns like full‑screen modals, side sheets, or elevated dialogs using tokens for radius/elevation/shadow.',
      },
    },
  },
};

export const Basic = {
  render: (args) => {
    const [open, setOpen] = useState(true);
    return React.createElement(React.Fragment, null,
      React.createElement('button', { onClick: () => setOpen(true) }, 'Open'),
      React.createElement(Modal, { ...args, open, onClose: () => setOpen(false), title: 'Hello' })
    );
  },
  args: { as: 'div', id: 'modal-1', 'data-testid': 'modal', tabIndex: -1, width: 500, closeOnEsc: true, closeOnOutside: true, showClose: true, m: '0' },
};


