import React from 'react';
import Chart from '../charts/Chart';
import {
  mockBarData,
  mockDoughnutData,
  mockStackedColumnData,
  mockLineData,
  mockHeatmapData,
  mockColumnData,
  mockPieData,
  mockAreaData,
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
  argTypes: {
    width: { control: 'text' },
    height: { control: 'text' },
    showLegend: { control: 'boolean' },
    color: { control: 'color' },
    maxBarHeight: { control: 'number' },
    gradient: { control: 'boolean' },
  },
  tags: ['autodocs'],
};

const stageStyle = { width: '100%', minHeight: '100%', display: 'flex', placeItems: 'center', boxSizing: 'border-box' };
const containerStyle = { width: '100%', height: 420, boxSizing: 'border-box'};

export const Bar_MostCommonDocumentTypes = {
  name: 'Bar',
  render: (args) => {
    const ds = {
      chart: {
        ...mockBarData.chart,
        ...(args.maxBarHeight != null ? { maxBarHeight: args.maxBarHeight } : {}),
      },
      data: mockBarData.data.map((d) => ({
        ...d,
        ...(args.color ? { color: args.color } : {}),
      })),
    };
    return React.createElement(
      'div',
      { style: stageStyle },
      React.createElement(
        'div',
        { style: containerStyle },
        React.createElement(Chart, {
          type: 'bar2d',
          width: args.width,
          height: args.height,
          dataSource: ds,
        }),
      ),
    );
  },
  args: { width: '100%', height: '100%', color: '#0082FA', maxBarHeight: 30 },
  argTypes: { showLegend: { table: { disable: true } }, gradient: { table: { disable: true } } },
};

export const Column_Basic = {
  name: 'Column',
  render: (args) => {
    const ds = {
      chart: { ...mockColumnData.chart },
      data: mockColumnData.data.map((d) => ({ ...d, ...(args.color ? { color: args.color } : {}) })),
    };
    return React.createElement(
      'div',
      { style: stageStyle },
      React.createElement(
        'div',
        { style: containerStyle },
        React.createElement(Chart, { type: 'column2d', width: args.width, height: args.height, dataSource: ds }),
      ),
    );
  },
  args: { width: '100%', height: '100%', color: '#3B82F6' },
  argTypes: { showLegend: { table: { disable: true } }, maxBarHeight: { table: { disable: true } }, gradient: { table: { disable: true } } },
};

export const Doughnut_TaskStatus = {
  name: 'Doughnut',
  render: (args) => {
    const ds = {
      ...mockDoughnutData,
      chart: {
        ...mockDoughnutData.chart,
        showLegend: args.showLegend ? '1' : '0',
        showValuesInLegend: args.showLegend ? '1' : '0',
      },
    };
    return React.createElement(
      'div',
      { style: stageStyle },
      React.createElement(
        'div',
        { style: containerStyle },
        React.createElement(Chart, {
          type: 'doughnut2d',
          width: args.width,
          height: args.height,
          dataSource: ds,
        }),
      ),
    );
  },
  args: { width: '100%', height: '100%', showLegend: true },
  argTypes: { color: { table: { disable: true } }, maxBarHeight: { table: { disable: true } }, gradient: { table: { disable: true } } },
};

export const Pie_Basic = {
  name: 'Pie',
  render: (args) => {
    const ds = {
      ...mockPieData,
      chart: { ...mockPieData.chart, showLegend: args.showLegend ? '1' : '0' },
    };
    return React.createElement(
      'div',
      { style: stageStyle },
      React.createElement(
        'div',
        { style: containerStyle },
        React.createElement(Chart, { type: 'pie2d', width: args.width, height: args.height, dataSource: ds }),
      ),
    );
  },
  args: { width: '100%', height: '100%', showLegend: true },
  argTypes: { color: { table: { disable: true } }, maxBarHeight: { table: { disable: true } }, gradient: { table: { disable: true } } },
};


export const StackedColumn_TeamBasedSigning = {
  name: 'Stacked Column',
  render: (args) => {
    const ds = {
      ...mockStackedColumnData,
      chart: {
        ...mockStackedColumnData.chart,
        showLegend: args.showLegend ? '1' : '0',
      },
    };
    return React.createElement(
      'div',
      { style: stageStyle },
      React.createElement(
        'div',
        { style: containerStyle },
        React.createElement(Chart, {
          type: 'scrollstackedcolumn2d',
          width: args.width,
          height: args.height,
          dataSource: ds,
        }),
      ),
    );
  },
  args: { width: '100%', height: '100%', showLegend: true },
  argTypes: { color: { table: { disable: true } }, maxBarHeight: { table: { disable: true } }, gradient: { table: { disable: true } } },
};

export const Line_ActivityOverTime = {
  name: 'Line',
  render: (args) => {
    const ds = {
      ...mockLineData,
      chart: {
        ...mockLineData.chart,
        showLegend: args.showLegend ? '1' : '0',
      },
    };
    return React.createElement(
      'div',
      { style: stageStyle },
      React.createElement(
        'div',
        { style: containerStyle },
        React.createElement(Chart, {
          type: 'msline',
          width: args.width,
          height: args.height,
          dataSource: ds,
        }),
      ),
    );
  },
  args: { width: '100%', height: '100%', showLegend: false },
  argTypes: { color: { table: { disable: true } }, maxBarHeight: { table: { disable: true } }, gradient: { table: { disable: true } } },
};

export const Area_Basic = {
  name: 'Area',
  render: (args) => {
    const ds = { ...mockAreaData };
    return React.createElement(
      'div',
      { style: stageStyle },
      React.createElement(
        'div',
        { style: containerStyle },
        React.createElement(Chart, { type: 'msarea', width: args.width, height: args.height, dataSource: ds }),
      ),
    );
  },
  args: { width: '100%', height: '100%' },
  argTypes: { color: { table: { disable: true } }, maxBarHeight: { table: { disable: true } }, gradient: { table: { disable: true } }, showLegend: { table: { disable: true } } },
};

export const Heatmap_TaskStatusDistributionToUser = {
  name: 'Heatmap',
  render: (args) => {
    const ds = {
      ...mockHeatmapData,
      chart: {
        ...mockHeatmapData.chart,
        showLegend: args.showLegend ? '1' : '0',
      },
      colorrange: {
        ...mockHeatmapData.colorrange,
        gradient: args.gradient ? '1' : '0',
      },
    };
    return React.createElement(
      'div',
      { style: stageStyle },
      React.createElement(
        'div',
        { style: containerStyle },
        React.createElement(Chart, {
          type: 'heatmap',
          width: args.width,
          height: args.height,
          dataSource: ds,
        }),
      ),
    );
  },
  args: { width: '100%', height: '100%', showLegend: false, gradient: true },
  argTypes: { color: { table: { disable: true } }, maxBarHeight: { table: { disable: true } } },
};


