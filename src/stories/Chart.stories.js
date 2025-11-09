import React from 'react';
import Chart from '../charts/Chart';
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


