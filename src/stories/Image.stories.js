import React from 'react';
import { Image } from './Image';
import sampleImage from './assets/avif-test-image.avif';

export default {
  id: 'example-image',
  title: 'Image Component',
  component: Image,
  parameters: {
    layout: 'centered',
    docs: {
      description: {
        component: 'Optimized image with IntersectionObserver-based lazy loading, fallback, and error states.'
      }
    }
  },
  tags: ['autodocs'],
  argTypes: {
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
    src: sampleImage,
    alt: 'Sample',
    fit: 'cover',
    radius: 'md',
    fallback: 'Loading…',
    errorFallback: 'Failed to load',
    threshold: 0.1,
    rootMargin: '200px',
    id: 'image-1',
    tabIndex: 0,
    'data-testid': 'image',
  },
};


