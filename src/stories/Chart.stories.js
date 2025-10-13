import React from 'react';
import Chart from '../charts/Chart';
import './chart.stories.scss';
import { mockBarData, mockDoughnutData, mockPieData, mockStackedData, mockLineData, mockHeatmapData } from '../charts/mockData';

export default {
  id: 'charts',
  title: 'Charts',
  component: Chart,
  parameters: {
    layout: 'centered',
    docs: { disable: true },
  },
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


