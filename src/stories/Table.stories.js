import React from 'react';
import '../index.scss';
import { Table } from '../components/Table/Table';
import { commonArgTypes } from './helpers/controls';

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
  parameters: {
    layout: 'padded',
    docs: { description: { component: 'Table renders structured data with sorting, filtering, selection, pagination, and expandable rows. Style variants (surface/flat) and size scale (sm–lg) are provided with sticky headers/footers. The component supports column visibility controls, index column, 3‑dots row actions, and a rich style-system for layout and theming.' } },
  },
  tags: ['autodocs'],
  argTypes: {
    ...commonArgTypes,
    variant: { control: 'select', options: ['surface','flat'] },
    size: { control: 'select', options: ['sm','md','lg'] },
    striped: { control: 'boolean' },
    bordered: { control: 'boolean' },
    hoverable: { control: 'boolean' },
    stickyHeader: { control: 'boolean' },
    showIndex: { control: 'boolean' },
    selectable: { control: 'boolean' },
    expandable: { control: 'boolean' },
    optionsMenu: { control: 'boolean' },
    extraColumns: { control: 'object', description: 'Extra columns to insert. Each item: { header, accessor, render?, at? } where at is number | "start" | "end".' },
    extraColumnsPlacement: { control: 'select', options: ['start','end'], description: 'Default placement when extra column item has no at.' },
    expandedContent: { control: 'text', description: 'String or render function(row) returning content for expanded row.' },
    rowMenu: { control: 'object' },
    onRowMenu: { action: 'rowMenu' },
    elevation: { control: 'select', options: [0,1,2,3,4,5] },
    shadow: { control: 'select', options: ['none','sm','md','lg'] },
    maxHeight: { control: 'text' },
    bgColor: { control: 'color' },
    borderColor: { control: 'color' },
  }
};

export const Basic = {
  name: 'Table',
  args: {
    columns,
    data,
    extraColumnsPlacement: 'end',
    extraColumns: [],
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
    expandedContent: 'More details…',
    rowMenu: [
      { label: 'Edit', value: 'edit' },
      { label: 'Delete', value: 'delete' },
    ],
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


