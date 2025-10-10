import React from 'react';
import ReactFusioncharts from 'react-fusioncharts';
import FusionCharts from 'fusioncharts';
import Charts from 'fusioncharts/fusioncharts.charts';
import PowerCharts from 'fusioncharts/fusioncharts.powercharts';
import FusionTheme from 'fusioncharts/themes/fusioncharts.theme.fusion';

// Initialize required modules once
Charts(FusionCharts);
PowerCharts(FusionCharts);
FusionTheme(FusionCharts);

const Chart = ({ type, width = '100%', height = '100%', dataSource, events }) => {
  return (
    <ReactFusioncharts
      type={type}
      width={width}
      height={height}
      dataFormat="JSON"
      dataSource={dataSource}
      {...(events ? { events } : {})}
    />
  );
};

export default Chart;


