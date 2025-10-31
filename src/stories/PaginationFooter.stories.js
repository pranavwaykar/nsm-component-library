import React from 'react';
import '../index.scss';
import PaginationFooter from '../components/PaginationFooter/PaginationFooter';

export default {
  id: 'pagination-footer',
  title: 'Pagination Footer',
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


