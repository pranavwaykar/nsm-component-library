import React, { useState } from 'react';
import { Pagination } from '../components/Pagination/Pagination';
import { universalArgTypes, styleSystemArgTypes } from './helpers/controls';

export default {
  id: 'example-pagination',
  title: 'Pagination Component',
  component: Pagination,
  parameters: { layout: 'centered', docs: { description: { component: 'Pagination controls page navigation with size selection and numbered buttons. It supports disabled state and forwards universal/style props for positioning within toolbars or footers.' } } },
  tags: ['autodocs'],
  argTypes: {
    ...universalArgTypes,
    ...styleSystemArgTypes,
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
    as: 'nav', id: 'pagination-1', 'data-testid': 'pagination', m: '0',
  },
};


