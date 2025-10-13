import React from 'react';
import Chart from '../charts/Chart';
import {
  mockMostCommonDocumentTypes,
  mockPhaseTypeDistribution,
  mockTaskStatus,
  mockTeamBasedSigning,
  mockLineActivityOverTime,
  mockHeatmapTaskStatusDistributionToUser,
} from '../charts/mockData';

export default {
  id: 'charts',
  title: 'Charts',
  component: Chart,
  parameters: {
    layout: 'fullscreen',
    docs: {
      description: {
        component: `
Use mock data for quick demos, or switch to live endpoints with the ready-to-go FetchChart:

import { FetchChart } from '../charts/FetchChart';
import { barConfig } from '../charts/fusionConfig';

<FetchChart
  chartType="bar2d"
  endpoint="/api/your-endpoint"
  method="GET"
  headers={{ Authorization: 'Bearer <token>' }}
  params={{ from: '2024-01-01', to: '2024-12-31' }}
  transform={(resp) => ({
    chart: barConfig,
    data: (resp?.items || []).map(item => ({
      label: item.name,
      value: String(item.count),
      color: '#0082FA',
    })),
  })}
/>`,
      },
    },
  },
  tags: ['autodocs'],
};

export const Bar_MostCommonDocumentTypes = {
  name: 'Bar',
  render: () =>
    React.createElement(
      'div',
      { style: { width: '100%', height: 420, padding: 16 } },
      React.createElement(Chart, {
        type: 'bar2d',
        width: '100%',
        height: '100%',
        dataSource: mockMostCommonDocumentTypes,
      }),
    ),
};

export const Doughnut_TaskStatus = {
  name: 'Doughnut',
  render: () =>
    React.createElement(
      'div',
      { style: { width: '100%', height: 420, padding: 16 } },
      React.createElement(Chart, {
        type: 'doughnut2d',
        width: '100%',
        height: '100%',
        dataSource: mockTaskStatus,
      }),
    ),
};

// Removed duplicate doughnut story

export const StackedColumn_TeamBasedSigning = {
  name: 'Stacked Column',
  render: () =>
    React.createElement(
      'div',
      { style: { width: '100%', height: 420, padding: 16 } },
      React.createElement(Chart, {
        type: 'scrollstackedcolumn2d',
        width: '100%',
        height: '100%',
        dataSource: mockTeamBasedSigning,
      }),
    ),
};

export const Line_ActivityOverTime = {
  name: 'Line',
  render: () =>
    React.createElement(
      'div',
      { style: { width: '100%', height: 420, padding: 16 } },
      React.createElement(Chart, {
        type: 'msline',
        width: '100%',
        height: '100%',
        dataSource: mockLineActivityOverTime,
      }),
    ),
};

export const Heatmap_TaskStatusDistributionToUser = {
  name: 'Heatmap',
  render: () =>
    React.createElement(
      'div',
      { style: { width: '100%', height: 420, padding: 16 } },
      React.createElement(Chart, {
        type: 'heatmap',
        width: '100%',
        height: '100%',
        dataSource: mockHeatmapTaskStatusDistributionToUser,
      }),
    ),
};


