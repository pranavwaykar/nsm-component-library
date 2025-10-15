import React from 'react';
import '../stories/tokens.css';
import '../muamelat/styles/index.scss';
import { PageNotFound } from '../muamelat';

export default {
  id: 'page-not-found',
  title: 'Muamelat/PageNotFound',
  component: PageNotFound,
  tags: ['autodocs'],
  parameters: {
    layout: 'centered',
    docs: { source: { language: 'jsx', code: '<PageNotFound />' } },
  },
};

export const Default = { name: 'Default', args: {} };


