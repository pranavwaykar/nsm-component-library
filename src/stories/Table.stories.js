import React from 'react';
import '../index.scss';
import { Table } from '../components/Table/Table';

const columns = [
  { header: 'Name', accessor: 'name' },
  { header: 'Age', accessor: 'age' },
];
const data = [
  { id: 1, name: 'Alice', age: 30 },
  { id: 2, name: 'Bob', age: 25 },
  { id: 3, name: 'Carol', age: 35 },
];

export default {
  id: 'example-table',
  title: 'Table Component',
  component: Table,
  parameters: { layout: 'padded' },
  tags: ['autodocs'],
  argTypes: {
    as: { control: 'text' }, id: { control: 'text' }, 'data-testid': { control: 'text', name: 'data-testid' },
    role: { control: 'text' }, tabIndex: { control: 'number' }, title: { control: 'text' }, hidden: { control: 'boolean' }, draggable: { control: 'boolean' },
    onClick: { action: 'clicked' }, onFocus: { action: 'focus' }, onBlur: { action: 'blur' }, onKeyDown: { action: 'keydown' }, onKeyUp: { action: 'keyup' },
    style: { control: 'object' }, className: { control: 'text' },
    variant: { control: 'select', options: ['surface','flat'] },
    size: { control: 'select', options: ['sm','md','lg'] },
    striped: { control: 'boolean' },
    bordered: { control: 'boolean' },
    hoverable: { control: 'boolean' },
    stickyHeader: { control: 'boolean' },
    showIndex: { control: 'boolean' },
    // styling props
    radius: { control: 'select', options: ['none','sm','md','lg','full'] },
    elevation: { control: 'select', options: [0,1,2,3,4,5] },
    shadow: { control: 'select', options: ['none','sm','md','lg'] },
    m: { control: 'text' }, px: { control: 'text' }, py: { control: 'text' }, w: { control: 'text' }, maxHeight: { control: 'text' },
    bgColor: { control: 'color' },
    borderColor: { control: 'color' },
  }
};

export const Basic = {
  name: 'Table',
  args: {
    columns,
    data,
    page: 1,
    pageSize: 10,
    totalPages: 1,
    id: 'table-1',
    'data-testid': 'table',
    variant: 'surface',
    size: 'md',
    striped: true,
    bordered: false,
    hoverable: true,
    stickyHeader: true,
    showIndex: true,
    filterable: true,
    selectable: true,
    expandable: true,
    renderExpandedRow: (row) => React.createElement('div', { style: { padding: '8px 4px' } }, `More about ${row.name}…`),
    rowActions: (row, action) => { /* eslint-disable no-console */ console.log(action, row); },
    // styling defaults
    radius: 'md',
    elevation: 0,
    shadow: 'none',
    m: '0',
    px: '0',
    py: '0',
    w: '100%',
    maxHeight: 'auto',
    bgColor: '#ffffff',
    borderColor: '#e5e7eb',
  },
  render: (args) => React.createElement(Table, { ...args }),
};


