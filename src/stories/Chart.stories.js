import React from 'react';
import Chart from '../charts/Chart';
import DocumentFlowChart from '../muamelat/documentFlow/DocumentFlowChart';
import documentFlowMock from '../muamelat/documentFlow/mockData';
import TreeChart from '../muamelat/treeMap/TreeChart';
import treeMapMock from '../muamelat/treeMap/mockData';
import LawyerJudicialBarChart from '../muamelat/judicial/LawyerJudicialBarChart';
import Calendar from '../muamelat/calendar/Calendar';
import { commonArgTypes } from './helpers/controls';
import './chart.stories.scss';
import { mockBarData, mockDoughnutData, mockPieData, mockStackedData, mockLineData, mockHeatmapData, mockAreaData, mockParetoData, mockRadarData, mockBubbleData } from '../charts/mockData';

export default {
  id: 'charts',
  title: 'Charts',
  component: Chart,
  parameters: {
    layout: 'centered',
    docs: {
      disable: false,
      description: { component: 'Chart is a thin wrapper around FusionCharts configured for this library. It accepts `type`, `width`, `height`, `dataSource`, and forwards the full universal/style prop set to a wrapping container so charts can participate in responsive/Flex/Grid layouts. Licensing is initialized once per app.' },
    },
  },
  argTypes: { ...commonArgTypes },
  args: { as: 'div', id: 'chart-1', 'data-testid': 'chart', m: '0' },
};

export const Bar = {
  name: 'Bar',
  args: { dataSource: mockBarData },
  argTypes: { dataSource: { control: 'object' } },
  render: ({ dataSource }) =>
    React.createElement(
      'div',
      { className: 'sb-chart-host' },
      React.createElement(Chart, {
        type: 'bar2d',
        width: '80%',
        height: '60%',
        dataSource,
      }),
    ),
};

export const Doughnut = {
  name: 'Doughnut',
  args: { dataSource: mockDoughnutData },
  argTypes: { dataSource: { control: 'object' } },
  render: ({ dataSource }) =>
    React.createElement(
      'div',
      { className: 'sb-chart-host' },
      React.createElement(Chart, {
        type: 'doughnut2d',
        width: '80%',
        height: '70%',
        dataSource,
      }),
    ),
};

export const StackedColumn = {
  name: 'Stacked Column',
  args: { dataSource: mockStackedData },
  argTypes: { dataSource: { control: 'object' } },
  render: ({ dataSource }) =>
    React.createElement(
      'div',
      { className: 'sb-chart-host' },
      React.createElement(Chart, {
        type: 'scrollstackedcolumn2d',
        width: '80%',
        height: '70%',
        dataSource,
      }),
    ),
};

export const Line = {
  name: 'Line',
  args: { dataSource: mockLineData },
  argTypes: { dataSource: { control: 'object' } },
  render: ({ dataSource }) =>
    React.createElement(
      'div',
      { className: 'sb-chart-host' },
      React.createElement(Chart, {
        type: 'msline',
        width: '70%',
        height: '70%',
        dataSource,
      }),
    ),
};

export const Heatmap = {
  name: 'Heatmap',
  args: { dataSource: mockHeatmapData },
  argTypes: { dataSource: { control: 'object' } },
  render: ({ dataSource }) =>
    React.createElement(
      'div',
      { className: 'sb-chart-host' },
      React.createElement(Chart, {
        type: 'heatmap',
        width: '80%',
        height: '70%',
        dataSource,
      }),
    ),
};


export const Area = {
  name: 'Area',
  args: { dataSource: mockAreaData },
  argTypes: { dataSource: { control: 'object' } },
  render: ({ dataSource }) =>
    React.createElement(
      'div',
      { className: 'sb-chart-host' },
      React.createElement(Chart, {
        type: 'area2d',
        width: '70%',
        height: '60%',
        dataSource,
      }),
    ),
};

export const Pareto = {
  name: 'Pareto',
  args: { dataSource: mockParetoData },
  argTypes: { dataSource: { control: 'object' } },
  render: ({ dataSource }) =>
    React.createElement(
      'div',
      { className: 'sb-chart-host' },
      React.createElement(Chart, {
        type: 'pareto2d',
        width: '70%',
        height: '60%',
        dataSource,
      }),
    ),
};

export const Radar = {
  name: 'Radar',
  args: { dataSource: mockRadarData },
  argTypes: { dataSource: { control: 'object' } },
  render: ({ dataSource }) =>
    React.createElement(
      'div',
      { className: 'sb-chart-host' },
      React.createElement(Chart, {
        type: 'radar',
        width: '70%',
        height: '60%',
        dataSource,
      }),
    ),
};

export const Bubble = {
  name: 'Bubble',
  args: { dataSource: mockBubbleData },
  argTypes: { dataSource: { control: 'object' } },
  render: ({ dataSource }) =>
    React.createElement(
      'div',
      { className: 'sb-chart-host' },
      React.createElement(Chart, {
        type: 'bubble',
        width: '70%',
        height: '60%',
        dataSource,
      }),
    ),
};

// Muamelat charts consolidated here for a single Charts file
export const DocumentFlow = {
  name: 'Document Flow',
  args: {
    id: 'documentflow-root',
    width: 1200,
    height: 480,
    chartData: documentFlowMock,
    color: '#2a9cff',
    baseInterval: { timeUnit: 'hour', count: 1 },
    xMinGridDistance: 70,
    xOpposite: true,
    yMinGridDistance: 30,
    tooltipText: '{category}',
  },
  argTypes: {
    width: { control: { type: 'range', min: 600, max: 1600, step: 50 } },
    height: { control: { type: 'range', min: 320, max: 800, step: 20 } },
    chartData: { control: 'object' },
    color: { control: 'color' },
    'baseInterval.timeUnit': { name: 'baseInterval.timeUnit', control: { type: 'select' }, options: ['millisecond','second','minute','hour','day','week','month','year'] },
    'baseInterval.count': { name: 'baseInterval.count', control: { type: 'number', min: 1, step: 1 } },
    xMinGridDistance: { control: { type: 'number', min: 0, step: 1 } },
    xOpposite: { control: 'boolean' },
    yMinGridDistance: { control: { type: 'number', min: 0, step: 1 } },
    tooltipText: { control: 'text' },
  },
  render: (args) => {
    const { width, height, ...rest } = args;
    const baseInterval = {
      timeUnit: args['baseInterval.timeUnit'] || args.baseInterval?.timeUnit || 'hour',
      count: args['baseInterval.count'] || args.baseInterval?.count || 1,
    };
    return React.createElement(DocumentFlowChart, { ...rest, baseInterval, style: { width, height } });
  },
};

export const TreeMap = {
  name: 'Tree Map',
  args: {
    width: 1200,
    height: 480,
    data: treeMapMock,
    downDepth: 1,
    upDepth: 0,
    initialDepth: 1,
    cornerRadius: 12,
    strokeWidth: 15,
    showLabels: true,
    labelMaxWidth: 125,
    tooltipText: '{category}: [bold]{sum}[/]',
  },
  argTypes: {
    width: { control: { type: 'range', min: 600, max: 1600, step: 50 } },
    height: { control: { type: 'range', min: 320, max: 800, step: 20 } },
    data: { control: 'object' },
    downDepth: { control: { type: 'number', min: 0, max: 3, step: 1 } },
    upDepth: { control: { type: 'number', min: 0, max: 3, step: 1 } },
    initialDepth: { control: { type: 'number', min: 0, max: 3, step: 1 } },
    cornerRadius: { control: { type: 'range', min: 0, max: 20, step: 1 } },
    strokeWidth: { control: { type: 'range', min: 0, max: 30, step: 1 } },
    showLabels: { control: 'boolean' },
    labelMaxWidth: { control: { type: 'range', min: 50, max: 300, step: 5 } },
    tooltipText: { control: 'text' },
  },
  render: ({ width, height, ...rest }) => React.createElement(TreeChart, { ...rest, style: { width, height } }),
};

export const JudicialBar = {
  name: 'Lawyer Judicial Bar',
  args: {
    width: 800,
    height: 400,
    type: 'bar2d',
    caption: 'Lawyer Judicial Bar Chart',
    xAxisName: 'Category',
    yAxisName: 'Count',
    showValues: true,
    paletteColors: '',
  },
  argTypes: {
    width: { control: { type: 'range', min: 400, max: 1200, step: 20 } },
    height: { control: { type: 'range', min: 300, max: 700, step: 20 } },
    type: { control: { type: 'select' }, options: ['bar2d','column2d','bar3d','column3d','msbar2d','mscolumn2d'] },
    caption: { control: 'text' },
    xAxisName: { control: 'text' },
    yAxisName: { control: 'text' },
    showValues: { control: 'boolean' },
    paletteColors: { control: 'text' },
  },
  render: ({ width, height, ...rest }) => React.createElement(LawyerJudicialBarChart, { width: String(width), height: String(height), ...rest, style: { width } }),
};

export const CalendarChart = {
  name: 'Calendar',
  args: { width: 1400, height: 700 },
  argTypes: {
    width: { control: { type: 'range', min: 1000, max: 1800, step: 50 } },
    height: { control: { type: 'range', min: 480, max: 1000, step: 20 } },
  },
  render: ({ width, height, ...rest }) =>
    React.createElement(
      'div',
      {
        style: {
          width,
          minHeight: height,
          margin: '0 auto',
        },
      },
      React.createElement(Calendar, { ...rest }),
    ),
};


