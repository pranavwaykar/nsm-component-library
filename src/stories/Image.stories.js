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
    size: { control: 'select', options: ['sm','md','lg'] },
    ring: { control: 'boolean' },
    width: { control: 'text' },
    height: { control: 'text' },
    threshold: { control: 'number' },
    rootMargin: { control: 'text' },
    fallback: { control: false, table: { type: { summary: 'ReactNode' }, defaultValue: { summary: 'Loading…' } } },
    errorFallback: { control: false, table: { type: { summary: 'ReactNode' } } },
  },
  args: {},
};

export const Primary = {
  name: 'Image',
  args: {
    src: sampleImage,
    alt: 'Sample',
    size: 'md',
    fit: 'cover',
    radius: 'pill',
    ring: true,
    fallback: 'Loading…',
    errorFallback: 'Failed to load',
    threshold: 0.1,
    rootMargin: '200px'
  },
};


