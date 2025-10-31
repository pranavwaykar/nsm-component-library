import React from 'react';
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
  parameters: { layout: 'centered' },
  tags: ['autodocs'],
  argTypes: {
    as: { control: 'text' }, id: { control: 'text' }, 'data-testid': { control: 'text', name: 'data-testid' },
    role: { control: 'text' }, tabIndex: { control: 'number' }, title: { control: 'text' }, hidden: { control: 'boolean' }, draggable: { control: 'boolean' },
    onClick: { action: 'clicked' }, onFocus: { action: 'focus' }, onBlur: { action: 'blur' }, onKeyDown: { action: 'keydown' }, onKeyUp: { action: 'keyup' },
    style: { control: 'object' }, className: { control: 'text' },
  }
};

export const Basic = {
  name: 'Table',
  args: { columns, data, page: 1, pageSize: 10, totalPages: 1, id: 'table-1', 'data-testid': 'table' },
  render: (args) => React.createElement(Table, { ...args }),
};


