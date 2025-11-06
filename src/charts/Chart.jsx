import React, { forwardRef } from 'react';
import './fusioncharts-license';
import ReactFusioncharts from 'react-fusioncharts';
import FusionCharts from 'fusioncharts';
import Charts from 'fusioncharts/fusioncharts.charts';
import PowerCharts from 'fusioncharts/fusioncharts.powercharts';
import FusionTheme from 'fusioncharts/themes/fusioncharts.theme.fusion';
import { expandStyleProps } from '../utils/styleSystem';

Charts(FusionCharts);
PowerCharts(FusionCharts);
FusionTheme(FusionCharts);

const Chart = forwardRef(({ as, style, hidden, type, width = '100%', height = '100%', dataSource, events, ...rest }, ref) => {
  const Container = as || 'div';
  const containerStyle = { ...expandStyleProps(rest), ...(style || {}) };
  if (hidden === true && containerStyle.display === undefined) containerStyle.display = 'none';
  const { id, className, ...other } = rest;
  return (
    <Container id={id} className={className} style={containerStyle}>
      <ReactFusioncharts
        ref={ref}
        type={type}
        width={width}
        height={height}
        dataFormat="JSON"
        dataSource={dataSource}
        {...(events ? { events } : {})}
        {...other}
      />
    </Container>
  );
});

export default Chart;


