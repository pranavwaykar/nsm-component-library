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
      description: { component: 'Chart is a thin wrapper around FusionCharts configured for this library. Use `type`, `dataSource`, and style-system sizing (`w`/`h`, padding/margin) on the container. Per-part colors/fonts can be set via props (e.g., `chartBgColor`, `canvasBgColor`, `baseFontFamily`, `baseFontSize`, `baseFontColor`, `captionFontSize`, `captionFontColor`, `subCaptionFontSize`, `subCaptionFontColor`, `paletteColors`). Shadow applies to the chart host.' },
    },
  },
  argTypes: {
    ...commonArgTypes,
    width: { table: { disable: true } },
    height: { table: { disable: true } },
    w: { control: { type: 'range', min: 300, max: 1800, step: 10 } },
    h: { control: { type: 'range', min: 200, max: 1000, step: 10 } },
    chartBgColor: { control: 'color' },
    baseFontFamily: { control: 'text' },
    baseFontSize: { control: 'text' },
    baseFontColor: { control: 'color' },
    // captionFontFamily: { control: 'text' },
    // captionFontSize: { control: 'text' },
    // captionFontColor: { control: 'color' },
    // subCaptionFontFamily: { control: 'text' },
    // subCaptionFontSize: { control: 'text' },
    // subCaptionFontColor: { control: 'color' },
    labelFontColor: { control: 'color' },
    valueFontColor: { control: 'color' },
    legendFontFamily: { control: 'text' },
    legendFontSize: { control: 'text' },
    legendFontColor: { control: 'color' },
    toolTipBgColor: { control: 'color' },
    toolTipBorderColor: { control: 'color' },
    toolTipColor: { control: 'color' },
    paletteColors: { control: 'text' },
    onChartClick: { action: 'chartClick' },
    onDataPointClick: { action: 'dataPoint' },
    // onLegendClick: { action: 'legendClick' },
  },
  args: { as: 'div', id: 'chart-1', 'data-testid': 'chart', m: '0', w: 900, h: 500 },
};

export const Bar = {
  name: 'Bar',
  args: { data: mockBarData, value: '-' },
  argTypes: {
    // Only show relevant Fusion color/font controls + size
    data: { control: 'object' },
    value: { control: 'text' },
    w: { control: { type: 'range', min: 300, max: 1800, step: 10 } },
    h: { control: { type: 'range', min: 200, max: 1000, step: 10 } },
    baseFontFamily: { control: 'text' },
    baseFontSize: { control: 'text' },
    baseFontColor: { control: 'color' },
    labelFontColor: { control: 'color' },
    valueFontColor: { control: 'color' },
    legendFontFamily: { control: 'text' },
    legendFontSize: { control: 'text' },
    legendFontColor: { control: 'color' },
    toolTipBgColor: { control: 'color' },
    toolTipBorderColor: { control: 'color' },
    toolTipColor: { control: 'color' },
    paletteColors: { control: 'text' },
    // hide unrelated controls for this story
    color: { table: { disable: true } },
    background: { table: { disable: true } },
    backgroundColor: { table: { disable: true } },
    bgClip: { table: { disable: true } },
    bgRepeat: { table: { disable: true } },
    bgPos: { table: { disable: true } },
    bgAttachment: { table: { disable: true } },
    mixBlendMode: { table: { disable: true } },
    filter: { table: { disable: true } },
    backdropFilter: { table: { disable: true } },
    userSelect: { table: { disable: true } },
    touchAction: { table: { disable: true } },
    variant: { table: { disable: true } },
    size: { table: { disable: true } },
    cursor: { table: { disable: true } },
  },
  render: (args) =>
    React.createElement(
      'div',
      { className: 'sb-chart-host' },
      React.createElement(Chart, { ...args, type: 'bar2d' }),
    ),
};

export const Doughnut = {
  name: 'Doughnut',
  args: { data: mockDoughnutData, value: '-' },
  argTypes: {
    data: { control: 'object' },
    value: { control: 'text' },
    color: { table: { disable: true } },
    background: { table: { disable: true } },
    backgroundColor: { table: { disable: true } },
    bgClip: { table: { disable: true } },
    bgRepeat: { table: { disable: true } },
    bgPos: { table: { disable: true } },
    bgAttachment: { table: { disable: true } },
    mixBlendMode: { table: { disable: true } },
    filter: { table: { disable: true } },
    backdropFilter: { table: { disable: true } },
    userSelect: { table: { disable: true } },
    touchAction: { table: { disable: true } },
    variant: { table: { disable: true } },
    size: { table: { disable: true } },
    cursor: { table: { disable: true } },
  },
  render: (args) =>
    React.createElement(
      'div',
      { className: 'sb-chart-host' },
      React.createElement(Chart, { ...args, type: 'doughnut2d' }),
    ),
};

export const StackedColumn = {
  name: 'Stacked Column',
  args: { data: mockStackedData, value: '-' },
  argTypes: {
    data: { control: 'object' },
    value: { control: 'text' },
    color: { table: { disable: true } },
    background: { table: { disable: true } },
    backgroundColor: { table: { disable: true } },
    bgClip: { table: { disable: true } },
    bgRepeat: { table: { disable: true } },
    bgPos: { table: { disable: true } },
    bgAttachment: { table: { disable: true } },
    mixBlendMode: { table: { disable: true } },
    filter: { table: { disable: true } },
    backdropFilter: { table: { disable: true } },
    userSelect: { table: { disable: true } },
    touchAction: { table: { disable: true } },
    variant: { table: { disable: true } },
    size: { table: { disable: true } },
    cursor: { table: { disable: true } },
  },
  render: (args) =>
    React.createElement(
      'div',
      { className: 'sb-chart-host' },
      React.createElement(Chart, { ...args, type: 'scrollstackedcolumn2d' }),
    ),
};

export const Line = {
  name: 'Line',
  args: { data: mockLineData, value: '-' },
  argTypes: {
    data: { control: 'object' },
    value: { control: 'text' },
    color: { table: { disable: true } },
    background: { table: { disable: true } },
    backgroundColor: { table: { disable: true } },
    bgClip: { table: { disable: true } },
    bgRepeat: { table: { disable: true } },
    bgPos: { table: { disable: true } },
    bgAttachment: { table: { disable: true } },
    mixBlendMode: { table: { disable: true } },
    filter: { table: { disable: true } },
    backdropFilter: { table: { disable: true } },
    userSelect: { table: { disable: true } },
    touchAction: { table: { disable: true } },
    variant: { table: { disable: true } },
    size: { table: { disable: true } },
    cursor: { table: { disable: true } },
  },
  render: (args) =>
    React.createElement(
      'div',
      { className: 'sb-chart-host' },
      React.createElement(Chart, { ...args, type: 'msline' }),
    ),
};

export const Heatmap = {
  name: 'Heatmap',
  args: { data: mockHeatmapData, value: '-' },
  argTypes: {
    data: { control: 'object' },
    value: { control: 'text' },
    color: { table: { disable: true } },
    background: { table: { disable: true } },
    backgroundColor: { table: { disable: true } },
    bgClip: { table: { disable: true } },
    bgRepeat: { table: { disable: true } },
    bgPos: { table: { disable: true } },
    bgAttachment: { table: { disable: true } },
    mixBlendMode: { table: { disable: true } },
    filter: { table: { disable: true } },
    backdropFilter: { table: { disable: true } },
    userSelect: { table: { disable: true } },
    touchAction: { table: { disable: true } },
    variant: { table: { disable: true } },
    size: { table: { disable: true } },
    cursor: { table: { disable: true } },
  },
  render: (args) =>
    React.createElement(
      'div',
      { className: 'sb-chart-host' },
      React.createElement(Chart, { ...args, type: 'heatmap' }),
    ),
};


export const Area = {
  name: 'Area',
  args: { data: mockAreaData, value: '-' },
  argTypes: {
    data: { control: 'object' },
    value: { control: 'text' },
    color: { table: { disable: true } },
    background: { table: { disable: true } },
    backgroundColor: { table: { disable: true } },
    bgClip: { table: { disable: true } },
    bgRepeat: { table: { disable: true } },
    bgPos: { table: { disable: true } },
    bgAttachment: { table: { disable: true } },
    mixBlendMode: { table: { disable: true } },
    filter: { table: { disable: true } },
    backdropFilter: { table: { disable: true } },
    userSelect: { table: { disable: true } },
    touchAction: { table: { disable: true } },
    variant: { table: { disable: true } },
    size: { table: { disable: true } },
    cursor: { table: { disable: true } },
  },
  render: (args) =>
    React.createElement(
      'div',
      { className: 'sb-chart-host' },
      React.createElement(Chart, { ...args, type: 'area2d' }),
    ),
};

// export const Pareto = {
//   name: 'Pareto',
//   args: { dataSource: mockParetoData },
//   argTypes: {
//     dataSource: { control: 'object' },
//   },
//   render: (args) =>
//     React.createElement(
//       'div',
//       { className: 'sb-chart-host' },
//       React.createElement(Chart, { ...args, type: 'pareto2d' }),
//     ),
// };

// export const Radar = {
//   name: 'Radar',
//   args: { dataSource: mockRadarData },
//   argTypes: {
//     dataSource: { control: 'object' },
//   },
//   render: (args) =>
//     React.createElement(
//       'div',
//       { className: 'sb-chart-host' },
//       React.createElement(Chart, { ...args, type: 'radar' }),
//     ),
// };

export const Bubble = {
  name: 'Bubble',
  args: { data: mockBubbleData, value: '-' },
  argTypes: {
    data: { control: 'object' },
    value: { control: 'text' },
    color: { table: { disable: true } },
    background: { table: { disable: true } },
    backgroundColor: { table: { disable: true } },
    bgClip: { table: { disable: true } },
    bgRepeat: { table: { disable: true } },
    bgPos: { table: { disable: true } },
    bgAttachment: { table: { disable: true } },
    mixBlendMode: { table: { disable: true } },
    filter: { table: { disable: true } },
    backdropFilter: { table: { disable: true } },
    userSelect: { table: { disable: true } },
    touchAction: { table: { disable: true } },
    variant: { table: { disable: true } },
    size: { table: { disable: true } },
    cursor: { table: { disable: true } },
  },
  render: (args) =>
    React.createElement(
      'div',
      { className: 'sb-chart-host' },
      React.createElement(Chart, { ...args, type: 'bubble' }),
    ),
};

// Muamelat charts consolidated here for a single Charts file
export const DocumentFlow = {
  name: 'Document Flow',
  args: {
    id: 'documentflow-root',
    w: 1200,
    h: 480,
    data: documentFlowMock,
    color: '#092370',
    baseInterval: { timeUnit: 'hour', count: 1 },
    xMinGridDistance: 70,
    xOpposite: true,
    yMinGridDistance: 30,
    tooltipText: '{category}',
  },
  argTypes: {
    width: { table: { disable: true } },
    height: { table: { disable: true } },
    w: { control: { type: 'range', min: 600, max: 1600, step: 50 } },
    h: { control: { type: 'range', min: 320, max: 800, step: 20 } },
    chartData: { control: 'object' },
    color: { control: 'color' },
    chartBgColor: { control: 'color' },
    baseFontFamily: { control: 'text' },
    baseFontSize: { control: 'text' },
    baseFontColor: { control: 'color' },
    'baseInterval.timeUnit': { name: 'baseInterval.timeUnit', control: { type: 'select' }, options: ['millisecond','second','minute','hour','day','week','month','year'] },
    'baseInterval.count': { name: 'baseInterval.count', control: { type: 'number', min: 1, step: 1 } },
    xMinGridDistance: { control: { type: 'number', min: 0, step: 1 } },
    xOpposite: { control: 'boolean' },
    yMinGridDistance: { control: { type: 'number', min: 0, step: 1 } },
    tooltipText: { control: 'text' },
    color: { table: { disable: true } },
    background: { table: { disable: true } },
    backgroundColor: { table: { disable: true } },
    bgClip: { table: { disable: true } },
    bgRepeat: { table: { disable: true } },
    bgPos: { table: { disable: true } },
    bgAttachment: { table: { disable: true } },
    mixBlendMode: { table: { disable: true } },
    filter: { table: { disable: true } },
    backdropFilter: { table: { disable: true } },
    userSelect: { table: { disable: true } },
    touchAction: { table: { disable: true } },
    variant: { table: { disable: true } },
    size: { table: { disable: true } },
    cursor: { table: { disable: true } },
  },
  render: (args) => {
    const { w, h, ...rest } = args;
    const baseInterval = {
      timeUnit: args['baseInterval.timeUnit'] || args.baseInterval?.timeUnit || 'hour',
      count: args['baseInterval.count'] || args.baseInterval?.count || 1,
    };
    return React.createElement(DocumentFlowChart, { ...rest, baseInterval, w, h });
  },
};

export const TreeMap = {
  name: 'Tree Map',
  args: {
    w: 1200,
    h: 480,
    data: treeMapMock,
    chartBgColor: '#ffffff',
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
    width: { table: { disable: true } },
    height: { table: { disable: true } },
    w: { control: { type: 'range', min: 600, max: 1600, step: 50 } },
    h: { control: { type: 'range', min: 320, max: 800, step: 20 } },
    data: { control: 'object' },
    chartBgColor: { control: 'color' },
    baseFontFamily: { control: 'text' },
    baseFontSize: { control: 'text' },
    baseFontColor: { control: 'color' },
    downDepth: { control: { type: 'number', min: 0, max: 3, step: 1 } },
    upDepth: { control: { type: 'number', min: 0, max: 3, step: 1 } },
    initialDepth: { control: { type: 'number', min: 0, max: 3, step: 1 } },
    cornerRadius: { control: { type: 'range', min: 0, max: 20, step: 1 } },
    strokeWidth: { control: { type: 'range', min: 0, max: 30, step: 1 } },
    showLabels: { control: 'boolean' },
    labelMaxWidth: { control: { type: 'range', min: 50, max: 300, step: 5 } },
    tooltipText: { control: 'text' },
  },
  render: ({ w, h, ...rest }) => React.createElement(TreeChart, { ...rest, w, h }),
};

export const JudicialBar = {
  name: 'Lawyer Judicial Bar',
  args: {
    w: 800,
    h: 400,
    type: 'bar2d',
    caption: 'Lawyer Judicial Bar Chart',
    xAxisName: 'Category',
    yAxisName: 'Count',
    showValues: true,
    paletteColors: '',
  },
  argTypes: {
    width: { table: { disable: true } },
    height: { table: { disable: true } },
    w: { control: { type: 'range', min: 400, max: 1200, step: 20 } },
    h: { control: { type: 'range', min: 300, max: 700, step: 20 } },
    type: { control: { type: 'select' }, options: ['bar2d','column2d','bar3d','column3d','msbar2d','mscolumn2d'] },
    caption: { control: 'text' },
    xAxisName: { control: 'text' },
    yAxisName: { control: 'text' },
    showValues: { control: 'boolean' },
    paletteColors: { control: 'text' },
  },
  render: (args) => React.createElement(LawyerJudicialBarChart, { ...args }),
};

export const CalendarChart = {
  name: 'Calendar',
  args: { w: 1400, h: 700 },
  argTypes: {
    width: { table: { disable: true } },
    height: { table: { disable: true } },
    w: { control: { type: 'range', min: 1000, max: 1800, step: 50 } },
    h: { control: { type: 'range', min: 480, max: 1000, step: 20 } },
    calendarBgColor: { control: 'color' },
    calendarTextColor: { control: 'color' },
    calendarFontFamily: { control: 'text' },
    calendarFontSize: { control: 'text' },
    headerBgColor: { control: 'color' },
    prmCalendarHeaderTextColor: { control: 'color' },
    // weekday header row
    daysHeaderBgColor: { control: 'color' },
    daysHeaderFontFamily: { control: 'text' },
    daysHeaderFontSize: { control: 'text' },
    daysHeaderFontWeight: { control: 'text' },
    // day cells
    dayCellBgColor: { control: 'color' },
    dayCellDisabledBgColor: { control: 'color' },
    dayCellBorderColor: { control: 'color' },
    todayBgColor: { control: 'color' },
    todayBorderColor: { control: 'color' },
    todayTextColor: { control: 'color' },
    // numbers and task text
    dayNumberFontSize: { control: 'text' },
    dayNumberColor: { control: 'color' },
    taskFontSize: { control: 'text' },
    taskTextColor: { control: 'color' },
    moreIndicatorTextColor: { control: 'color' },
    // popover
    popoverFontSize: { control: 'text' },
    popoverLabelColor: { control: 'color' },
    popoverValueColor: { control: 'color' },
    // task chip and popover container
    taskChipBgColor: { control: 'color' },
    taskChipTextColor: { control: 'color' },
    popoverBgColor: { control: 'color' },
    popoverBorderColor: { control: 'color' },
    onDayClick: { action: 'dayClick' },
    backgroundColor: { table: { disable: true } },
    color: { table: { disable: true } },
    chartBgColor: { table: { disable: true } },
    shadow: { table: { disable: true } },
    variant: { table: { disable: true } },
    size: { table: { disable: true } },
    headerBgColor: { table: { disable: true } },
    headerTextColor: { table: { disable: true } },
    labelFontColor: { table: { disable: true } },
    valueFontColor: { table: { disable: true } },
    legendFontFamily: { table: { disable: true } },
    legendFontSize: { table: { disable: true } },
    legendFontColor: { table: { disable: true } },
    toolTipBgColor: { table: { disable: true } },
    toolTipBorderColor: { table: { disable: true } },
    toolTipColor: { table: { disable: true } },
    paletteColors: { table: { disable: true } },
    calendarTextColor: { table: { disable: true } },
    disabled: { table: { disable: true } },
    loading: { table: { disable: true } },
  },
  render: ({ w, h, ...rest }) =>
    React.createElement(
      'div',
      { style: { display: 'flex', justifyContent: 'center', width: '100%' } },
      React.createElement(
        'div',
        { style: { width: w, minHeight: h } },
        React.createElement(Calendar, { ...rest }),
      )
    ),
};


