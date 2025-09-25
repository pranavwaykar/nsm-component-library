import React from 'react';
import { fn } from 'storybook/test';
import { Table } from './Table';

export default {
  id: 'example-table',
  title: 'Table Component',
  component: Table,
  parameters: {
    layout: 'fullscreen',
    docs: {
      description: {
        component: 'Data table with sorting, search filter, and accordion sub-rows. Resize window to see horizontal scroll.'
      }
    }
  },
  tags: ['autodocs'],
  argTypes: {
    filterable: { control: 'boolean' },
    expandable: { control: 'boolean' },
    responsive: { control: 'boolean' },
  },
  args: {},
};

const sampleColumns = [
  { header: 'ID', accessor: 'id' },
  { header: 'Name', accessor: 'name' },
  { header: 'Role', accessor: 'role' },
  { header: 'Status', accessor: 'status', render: (v) => (v ? 'Active' : 'Inactive') },
];

const sampleData = Array.from({ length: 8 }).map((_, i) => ({
  id: i + 1,
  name: ['Alice', 'Bob', 'Cara', 'Dan', 'Eve', 'Fred', 'Gina', 'Hank'][i],
  role: ['Admin', 'Editor', 'Viewer', 'Editor', 'Viewer', 'Admin', 'Viewer', 'Editor'][i],
  status: i % 2 === 0,
  email: `user${i + 1}@example.com`,
  notes: 'Additional details for this user can be shown here.'
}));

export const Primary = {
  name: 'Table',
  args: {
    columns: sampleColumns,
    data: sampleData,
    initialSort: { by: 'name', dir: 'asc' },
    filterable: true,
    expandable: true,
    responsive: true,
    rowActions: (row) => React.createElement('div', null,
      React.createElement('button', { onClick: () => fn()(`Edit ${row.id}`) }, 'Edit'),
      ' ',
      React.createElement('button', { onClick: () => fn()(`Delete ${row.id}`) }, 'Delete')
    ),
    renderSubRow: (row) => React.createElement('div', null,
      React.createElement('div', null, React.createElement('strong', null, 'Email:'), ' ', row.email),
      React.createElement('div', null, React.createElement('strong', null, 'Notes:'), ' ', row.notes)
    ),
  },
};


