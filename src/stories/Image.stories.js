import React from 'react';
import { Image } from '../components/Image/Image';
import { commonArgTypes } from './helpers/controls';
import sampleImage from '../assets/avif-test-image.avif';

export default {
  id: 'example-image',
  title: 'Image Component',
  component: Image,
  parameters: {
    layout: 'centered',
    docs: {
      description: {
        component: 'Image provides lazy‑loaded visuals with graceful fallbacks and error states. It uses IntersectionObserver to defer loading off‑screen images. Supports radius tokens, object‑fit modes, and full universal/style props on the container so you can control layout, spacing, and responsiveness without wrappers.'
      }
    }
  },
  tags: ['autodocs'],
  argTypes: {
    ...commonArgTypes,
    fit: { control: 'select', options: ['cover', 'contain', 'fill', 'none', 'scale-down'] },
    radius: { control: 'select', options: ['none', 'sm', 'md', 'lg', 'pill'] },
    width: { control: 'text' },
    height: { control: 'text' },
    threshold: { control: 'number' },
    rootMargin: { control: 'text' },
    fallback: { control: false, table: { type: { summary: 'ReactNode' }, defaultValue: { summary: 'Loading…' } } },
    errorFallback: { control: false, table: { type: { summary: 'ReactNode' } } },
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
  },
  args: {},
};

export const Primary = {
  name: 'Image',
  args: {
    as: 'div', id: 'image-1', 'data-testid': 'image', tabIndex: 0, dir: 'ltr', lang: 'en', hidden: false,
    src: sampleImage,
    alt: 'Sample',
    fit: 'cover',
    radius: 'md',
    fallback: 'Loading…',
    errorFallback: 'Failed to load',
    threshold: 0.1,
    rootMargin: '200px',
    m: '0',
  },
};


