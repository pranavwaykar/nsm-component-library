import React from 'react';
import Chart from '../charts/Chart';
import DocumentFlowChart from '../muamelat/documentFlow/DocumentFlowChart';
import TreeChart from '../muamelat/treeMap/TreeChart';
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
  render: () =>
    React.createElement(
      'div',
      { className: 'sb-chart-host' },
      React.createElement(Chart, {
        type: 'bar2d',
        width: '80%',
        height: '60%',
        dataSource: mockBarData,
      }),
    ),
};

export const Doughnut = {
  name: 'Doughnut',
  render: () =>
    React.createElement(
      'div',
      { className: 'sb-chart-host' },
      React.createElement(Chart, {
        type: 'doughnut2d',
        width: '80%',
        height: '70%',
        dataSource: mockDoughnutData,
      }),
    ),
};

export const StackedColumn = {
  name: 'Stacked Column',
  render: () =>
    React.createElement(
      'div',
      { className: 'sb-chart-host' },
      React.createElement(Chart, {
        type: 'scrollstackedcolumn2d',
        width: '80%',
        height: '70%',
        dataSource: mockStackedData,
      }),
    ),
};

export const Line = {
  name: 'Line',
  render: () =>
    React.createElement(
      'div',
      { className: 'sb-chart-host' },
      React.createElement(Chart, {
        type: 'msline',
        width: '70%',
        height: '70%',
        dataSource: mockLineData,
      }),
    ),
};

export const Heatmap = {
  name: 'Heatmap',
  render: () =>
    React.createElement(
      'div',
      { className: 'sb-chart-host' },
      React.createElement(Chart, {
        type: 'heatmap',
        width: '80%',
        height: '70%',
        dataSource: mockHeatmapData,
      }),
    ),
};


export const Area = {
  name: 'Area',
  render: () =>
    React.createElement(
      'div',
      { className: 'sb-chart-host' },
      React.createElement(Chart, {
        type: 'area2d',
        width: '70%',
        height: '60%',
        dataSource: mockAreaData,
      }),
    ),
};

export const Pareto = {
  name: 'Pareto',
  render: () =>
    React.createElement(
      'div',
      { className: 'sb-chart-host' },
      React.createElement(Chart, {
        type: 'pareto2d',
        width: '70%',
        height: '60%',
        dataSource: mockParetoData,
      }),
    ),
};

export const Radar = {
  name: 'Radar',
  render: () =>
    React.createElement(
      'div',
      { className: 'sb-chart-host' },
      React.createElement(Chart, {
        type: 'radar',
        width: '70%',
        height: '60%',
        dataSource: mockRadarData,
      }),
    ),
};

export const Bubble = {
  name: 'Bubble',
  render: () =>
    React.createElement(
      'div',
      { className: 'sb-chart-host' },
      React.createElement(Chart, {
        type: 'bubble',
        width: '70%',
        height: '60%',
        dataSource: mockBubbleData,
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
    width: { control: { type: 'range', min: 900, max: 1600, step: 50 } },
    height: { control: { type: 'range', min: 480, max: 1000, step: 20 } },
  },
  render: ({ width, height, ...rest }) => React.createElement('div', { style: { maxWidth: width, minHeight: height } }, React.createElement(Calendar, { ...rest })),
};


