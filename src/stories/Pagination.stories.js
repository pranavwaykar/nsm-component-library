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
    customSelect: { control: 'boolean' },
    pagerSelectRadius: { control: 'text' },
    pagerSelectFontSize: { control: 'text' },
    pagerSelectMenuBgColor: { control: 'color' },
    pagerSelectMenuTextColor: { control: 'color' },
    pagerSelectMenuBorderColor: { control: 'color' },
    pagerSelectOptionHoverBgColor: { control: 'color' },
    pagerSelectOptionActiveBgColor: { control: 'color' },
    pagerSelectShadow: { control: 'text' },
    pagerSelectMenuMaxHeight: { control: 'text' },
    pagerSelectZIndex: { control: 'number' },
    pagerButtonHoverBgColor: { control: 'color' },
    pagerButtonHoverBorderColor: { control: 'color' },
    pagerButtonHoverTextColor: { control: 'color' },
    pagerSelectHoverBgColor: { control: 'color' },
    pagerFontSize: { control: 'text' },
    pagerSelectWidth: { control: 'text' },
    pagerSelectHeight: { control: 'text' },
    pagerSelectOptionHeight: { control: 'text' },
    pagerButtonMinWidth: { control: 'text' },
    pagerButtonHeight: { control: 'text' },
    pagerControlsGap: { control: 'text' },
    pagerListGap: { control: 'text' },
    pagerStatusFontSize: { control: 'text' },
  },
};

export const Primary = {
  name: 'Pagination',
  render: (args) => {
    const [page, setPage] = useState(1);
    const [pageSize, setPageSize] = useState(args.pageSize);
    React.useEffect(() => {
      setPageSize(args.pageSize);
    }, [args.pageSize]);
    React.useEffect(() => {
      // reset or clamp page when total or size changes from controls
      const totalPages = Math.max(1, Math.ceil((args.totalItems || 0) / (pageSize || 1)));
      if (page > totalPages) setPage(totalPages);
      else setPage(1);
      // eslint-disable-next-line react-hooks/exhaustive-deps
    }, [args.totalItems, args.pageSize]);
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
    customSelect: true,
    pagerSelectRadius: '6px',
    pagerSelectFontSize: '14px',
    pagerSelectMenuBgColor: '#3f3f46',
    pagerSelectMenuTextColor: '#ffffff',
    pagerSelectMenuBorderColor: '#111827',
    pagerSelectOptionHoverBgColor: '#52525b',
    pagerSelectOptionActiveBgColor: '#1f2937',
    pagerSelectShadow: '0 12px 24px rgba(0,0,0,.24)',
    pagerSelectMenuMaxHeight: '240px',
    pagerSelectZIndex: 30,
    pagerButtonHoverBgColor: '#f9fafb',
    pagerButtonHoverBorderColor: '#cbd5e1',
    pagerButtonHoverTextColor: undefined,
    pagerSelectHoverBgColor: '#f5f7fb',
    pagerFontSize: '14px',
    pagerSelectWidth: 'auto',
    pagerSelectHeight: '36px',
    pagerSelectOptionHeight: '20px',
    pagerButtonMinWidth: '36px',
    pagerButtonHeight: '36px',
    pagerControlsGap: '6px',
    pagerListGap: '6px',
    pagerStatusFontSize: '14px',
    as: 'nav', id: 'pagination-1', 'data-testid': 'pagination', m: '0',
  },
  argTypes: {
    variant: { table: { disable: true } },
    size: { table: { disable: true } },
  }
};


