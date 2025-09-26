import React, { useState } from 'react';
import { Pagination } from './Pagination';

export default {
  id: 'example-pagination',
  title: 'Pagination Component',
  component: Pagination,
  parameters: { layout: 'centered' },
  tags: ['autodocs'],
  argTypes: {
    pageSizeOptions: { control: 'object' },
  },
};

export const Primary = {
  name: 'Pagination',
  render: (args) => {
    const [page, setPage] = useState(1);
    const [pageSize, setPageSize] = useState(args.pageSize);
    return React.createElement(Pagination, {
      ...args,
      page,
      pageSize,
      onPageChange: setPage,
      onPageSizeChange: (n) => { setPage(1); setPageSize(n); },
    });
  },
  args: {
    totalItems: 123,
    pageSize: 10,
    pageSizeOptions: [10, 20, 50],
    disabled: false,
  },
};


