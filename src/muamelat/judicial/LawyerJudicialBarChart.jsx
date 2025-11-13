import React from 'react';
import Chart from '../../charts/Chart';

const defaultDs = {
  chart: {
    theme: 'fusion',
    caption: 'Lawyer Judicial Bar Chart',
    xAxisName: 'Category',
    yAxisName: 'Count',
    showValues: '1',
  },
  data: [
    { label: 'A', value: '12' },
    { label: 'B', value: '9' },
    { label: 'C', value: '15' },
    { label: 'D', value: '7' },
  ],
};

const LawyerJudicialBarChart = ({
  w,
  h,
  type = 'bar2d',
  caption = defaultDs.chart.caption,
  xAxisName = defaultDs.chart.xAxisName,
  yAxisName = defaultDs.chart.yAxisName,
  showValues = true,
  paletteColors,
  data = defaultDs.data,
  as,
  style,
  hidden,
  ...rest
}) => {
  const ds = {
    chart: {
      ...defaultDs.chart,
      caption,
      xAxisName,
      yAxisName,
      showValues: showValues ? '1' : '0',
      ...(paletteColors ? { paletteColors } : {}),
    },
    data,
  };
  return <Chart as={as} style={style} hidden={hidden} type={type} data={ds} w={w} h={h} {...rest} />;
};

export default LawyerJudicialBarChart;


