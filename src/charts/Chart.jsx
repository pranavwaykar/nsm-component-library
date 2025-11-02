import React, { forwardRef } from 'react';
import './fusioncharts-license';
import ReactFusioncharts from 'react-fusioncharts';
import FusionCharts from 'fusioncharts';
import Charts from 'fusioncharts/fusioncharts.charts';
import PowerCharts from 'fusioncharts/fusioncharts.powercharts';
import FusionTheme from 'fusioncharts/themes/fusioncharts.theme.fusion';

Charts(FusionCharts);
PowerCharts(FusionCharts);
FusionTheme(FusionCharts);

const Chart = forwardRef(({ type, width = '100%', height = '100%', dataSource, events, ...rest }, ref) => {
  return (
    <ReactFusioncharts
      ref={ref}
      type={type}
      width={width}
      height={height}
      dataFormat="JSON"
      dataSource={dataSource}
      {...(events ? { events } : {})}
      {...rest}
    />
  );
});

export default Chart;


