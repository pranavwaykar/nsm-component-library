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

const Chart = forwardRef(({
  as,
  style,
  hidden,
  type,
  width = '100%',
  height = '100%',
  dataSource,
  events,
  customProps,
  id,
  className,
  role,
  tabIndex,
  title,
  draggable,
  dir,
  lang,
  ...rest
}, ref) => {
  const Container = as || 'div';
  const containerStyle = { ...expandStyleProps(rest), ...(style || {}) };
  if (hidden === true && containerStyle.display === undefined) containerStyle.display = 'none';
  return (
    <Container
      id={id}
      className={className}
      style={containerStyle}
      role={role}
      tabIndex={tabIndex}
      title={title}
      draggable={draggable}
      dir={dir}
      lang={lang}
      hidden={hidden}
      {...(customProps || {})}
    >
      <ReactFusioncharts
        ref={ref}
        type={type}
        width={width}
        height={height}
        dataFormat="JSON"
        dataSource={dataSource}
        {...(events ? { events } : {})}
      />
    </Container>
  );
});

export default Chart;


