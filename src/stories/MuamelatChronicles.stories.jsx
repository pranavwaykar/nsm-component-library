import React from 'react';
import DocumentFlowChart from '../muamelat/documentFlow/DocumentFlowChart';
import TreeChart from '../muamelat/treeMap/TreeChart';
import LawyerJudicialBarChart from '../muamelat/judicial/LawyerJudicialBarChart';
import Calendar from '../muamelat/calendar/Calendar';

export default {
  title: 'Charts',
};

export const DocumentFlow = {
  name: 'Document Flow Chart',
  args: {
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
    return (
      <div style={{ width: '100%', maxWidth: width, height }}>
        <DocumentFlowChart {...rest} baseInterval={baseInterval} />
      </div>
    );
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
  render: ({ width, height, ...rest }) => (
    <div style={{ width: '100%', maxWidth: width, height }}>
      <TreeChart {...rest} />
    </div>
  ),
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
  render: ({ width, height, ...rest }) => (
    <div style={{ width }}>
      <LawyerJudicialBarChart width={String(width)} height={String(height)} {...rest} />
    </div>
  ),
};

export const CalendarChart = {
  name: 'Calendar',
  args: { width: 1400, height: 700 },
  argTypes: {
    width: { control: { type: 'range', min: 900, max: 1600, step: 50 } },
    height: { control: { type: 'range', min: 480, max: 1000, step: 20 } },
  },
  render: ({ width, height }) => (
    <div style={{ width: '100%', maxWidth: width, minHeight: height }}>
      <Calendar />
    </div>
  ),
};


