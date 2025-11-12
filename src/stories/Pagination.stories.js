import React, { useState } from 'react';
import { Pagination } from '../components/Pagination/Pagination';
import { commonArgTypes } from './helpers/controls';

export default {
  id: 'example-pagination',
  title: 'Pagination Component',
  component: Pagination,
  parameters: { layout: 'centered', docs: { description: { component: 'Pagination controls page navigation with size selection and numbered buttons. It supports disabled state and forwards universal/style props for positioning within toolbars or footers.' } } },
  tags: ['autodocs'],
  argTypes: {
    ...commonArgTypes,
    pageSizeOptions: { control: 'object' },
    pagerLabelColor: { control: 'color' },
    pagerSelectTextColor: { control: 'color' },
    pagerSelectBgColor: { control: 'color' },
    pagerSelectBorderColor: { control: 'color' },
    pagerButtonTextColor: { control: 'color' },
    pagerButtonBgColor: { control: 'color' },
    pagerButtonBorderColor: { control: 'color' },
    pagerActiveButtonTextColor: { control: 'color' },
    pagerActiveButtonBgColor: { control: 'color' },
    pagerActiveButtonBorderColor: { control: 'color' },
    pagerStatusTextColor: { control: 'color' },
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
    pagerLabelColor: '#6b7280',
    pagerSelectTextColor: '#111827',
    pagerSelectBgColor: '#ffffff',
    pagerSelectBorderColor: '#d1d5db',
    pagerButtonTextColor: '#111827',
    pagerButtonBgColor: '#ffffff',
    pagerButtonBorderColor: '#d1d5db',
    pagerActiveButtonTextColor: '#ffffff',
    pagerActiveButtonBgColor: '#111827',
    pagerActiveButtonBorderColor: '#111827',
    pagerStatusTextColor: '#6b7280',
    as: 'nav', id: 'pagination-1', 'data-testid': 'pagination', m: '0',
  },
};


