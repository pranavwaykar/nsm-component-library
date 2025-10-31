import React, { useState } from 'react';
import { Modal } from '../components/Modal/Modal';

export default {
  id: 'example-modal',
  title: 'Modal Component',
  component: Modal,
  parameters: { layout: 'centered' },
  tags: ['autodocs'],
  argTypes: {
    as: { control: 'text' },
    id: { control: 'text' },
    tabIndex: { control: 'number' },
    role: { control: 'text' },
    title: { control: 'text' },
    hidden: { control: 'boolean' },
    draggable: { control: 'boolean' },
    'data-testid': { control: 'text', name: 'data-testid' },
    onClick: { action: 'clicked' },
    onFocus: { action: 'focus' },
    onBlur: { action: 'blur' },
    onKeyDown: { action: 'keydown' },
    onKeyUp: { action: 'keyup' },
  },
};

export const Basic = {
  render: (args) => {
    const [open, setOpen] = useState(true);
    return React.createElement(React.Fragment, null,
      React.createElement('button', { onClick: () => setOpen(true) }, 'Open'),
      React.createElement(Modal, { ...args, open, onClose: () => setOpen(false), title: 'Hello', id: 'modal-1', 'data-testid': 'modal' })
    );
  },
};


