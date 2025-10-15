import React from 'react';
import '../stories/tokens.css';
import '../muamelat/styles/index.scss';
import { PaginationFooter } from '../muamelat';

export default {
  id: 'pagination-footer',
  title: 'Muamelat/PaginationFooter',
  component: PaginationFooter,
  tags: ['autodocs'],
  parameters: {
    layout: 'centered',
    docs: { source: { language: 'jsx', code: '<PaginationFooter pageLimit={10} totalPages={5} activePage={1} />' } },
  },
};

export const Default = {
  name: 'Default',
  args: { pageLimit: 10, totalPages: 5, activePage: 1 },
};


