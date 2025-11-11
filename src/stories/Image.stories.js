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
    w: { control: 'text', description: 'container width' },
    h: { control: 'text', description: 'container height' },
    variant: { control: 'select', options: ['solid','outline','ghost'] },
    shadow: { control: 'select', options: ['none','sm','md','lg'] },
    tone: { control: 'select', options: ['default','subtle','strong'] },
    disabled: { control: 'boolean' },
    loading: { control: 'boolean' },
    size: { table: { disable: true } },
    color: { table: { disable: true } },
    rounded: { table: { disable: true } },
    rootMargin: { table: { disable: true } },
    threshold: { control: 'number' },
    fallback: { control: false, table: { type: { summary: 'ReactNode' }, defaultValue: { summary: 'Loading…' } } },
    errorFallback: { control: false, table: { type: { summary: 'ReactNode' } } },
  },
  args: {},
};

export const Primary = {
  name: 'Image',
  args: {
    as: 'div', id: 'image-1', 'data-testid': 'image', tabIndex: 0, dir: 'ltr', hidden: false,
    src: sampleImage,
    alt: 'Sample',
    fit: 'cover',
    fallback: 'Loading…',
    errorFallback: 'Failed to load',
    threshold: 0.1,
    rootMargin: '200px',
    m: '0', w: '320px', h: '200px',
  },
};


