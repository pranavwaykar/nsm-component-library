import { fn } from 'storybook/test';
import { Modal } from './Modal';

export default {
  id: 'example-modal',
  title: 'Modal Component',
  component: Modal,
  parameters: {
    layout: 'fullscreen',
    docs: {
      canvas: { sourceState: 'hidden' },
      story: { height: '720px' },
    },
  },
  tags: ['autodocs'],
};

export const Primary = {
  name: 'Modal',
  args: {
    open: true,
    title: 'Example modal',
    children: 'This is a simple modal body.',
    onClose: fn(),
    width: 500,
    closeOnEsc: true,
    closeOnOutside: true,
    showClose: true,
  },
};


