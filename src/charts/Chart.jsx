import React, { forwardRef, useMemo } from 'react';
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
  data,
  dataSource,
  events,
  shadow,
  chartBgColor,
  canvasBgColor,
  baseFontFamily,
  baseFontSize,
  baseFontColor,
  captionFontFamily,
  captionFontSize,
  captionFontColor,
  subCaptionFontFamily,
  subCaptionFontSize,
  subCaptionFontColor,
  // xAxisNameFontFamily,
  // xAxisNameFontSize,
  // xAxisNameFontColor,
  // yAxisNameFontFamily,
  // yAxisNameFontSize,
  // yAxisNameFontColor,
  labelFontColor,
  valueFontColor,
  legendFontFamily,
  legendFontSize,
  legendFontColor,
  toolTipBgColor,
  toolTipBorderColor,
  toolTipColor,
  paletteColors,
  // xLabelFontSize,
  // yLabelFontColor,
  // yLabelFontSize,
  // xLabelFontColor,
  onChartClick,
  onDataPointClick,
  onLegendClick,
  value,
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
  const hostStyle = {};
  if (shadow) {
    const smap = { none: '0', sm: '1', md: '3', lg: '5' };
    const key = smap[String(shadow)] || null;
    if (key) hostStyle.boxShadow = `var(--sb-shadow-${key})`;
    if (shadow === 'none') hostStyle.boxShadow = 'var(--sb-shadow-0)';
  }

  const mergedDataSource = useMemo(() => {
    const input = data ?? dataSource;
    const ds = input ? JSON.parse(JSON.stringify(input)) : { chart: {} };
    ds.chart = ds.chart || {};
    if (chartBgColor) ds.chart.bgColor = chartBgColor;
    if (canvasBgColor) ds.chart.canvasBgColor = canvasBgColor;
    if (baseFontFamily) ds.chart.baseFont = baseFontFamily;
    if (baseFontSize) ds.chart.baseFontSize = String(baseFontSize);
    if (baseFontColor) ds.chart.baseFontColor = baseFontColor;
    if (captionFontFamily) ds.chart.captionFont = captionFontFamily;
    if (captionFontSize) ds.chart.captionFontSize = String(captionFontSize);
    if (captionFontColor) ds.chart.captionFontColor = captionFontColor;
    if (subCaptionFontFamily) ds.chart.subcaptionFont = subCaptionFontFamily;
    if (subCaptionFontSize) ds.chart.subcaptionFontSize = String(subCaptionFontSize);
    if (subCaptionFontColor) ds.chart.subcaptionFontColor = subCaptionFontColor;
    // if (xAxisNameFontFamily) ds.chart.xAxisNameFont = xAxisNameFontFamily;
    // if (xAxisNameFontSize) ds.chart.xAxisNameFontSize = String(xAxisNameFontSize);
    // if (xAxisNameFontColor) ds.chart.xAxisNameFontColor = xAxisNameFontColor;
    // if (yAxisNameFontFamily) ds.chart.yAxisNameFont = yAxisNameFontFamily || 'Arial';
    // if (yAxisNameFontSize) ds.chart.yAxisNameFontSize = String(yAxisNameFontSize);
    // if (yAxisNameFontColor) ds.chart.yAxisNameFontColor = yAxisNameFontColor;
    // if (xLabelFontSize) ds.chart.xLabelFontSize = String(xLabelFontSize);
    // if (xLabelFontColor) ds.chart.xLabelFontColor = xLabelFontColor;
    // if (yLabelFontSize) ds.chart.yLabelFontSize = String(yLabelFontSize);
    // if (yLabelFontColor) ds.chart.yLabelFontColor = yLabelFontColor;
    if (labelFontColor) ds.chart.labelFontColor = labelFontColor;
    if (valueFontColor) ds.chart.valueFontColor = valueFontColor;
    if (legendFontFamily) ds.chart.legendItemFont = legendFontFamily;
    if (legendFontSize) ds.chart.legendItemFontSize = String(legendFontSize);
    if (legendFontColor) ds.chart.legendItemFontColor = legendFontColor;
    if (toolTipBgColor) ds.chart.toolTipBgColor = toolTipBgColor;
    if (toolTipBorderColor) ds.chart.toolTipBorderColor = toolTipBorderColor;
    if (toolTipColor) ds.chart.toolTipColor = toolTipColor;
    if (paletteColors) ds.chart.paletteColors = paletteColors;
    // Ensure visibility for certain styled features
    if (valueFontColor && ds.chart.showValues === undefined) ds.chart.showValues = '1';
    if ((legendFontFamily || legendFontSize || legendFontColor) && ds.chart.showLegend === undefined) ds.chart.showLegend = '1';
    // If paletteColors are provided, prefer them over per-point/series color definitions
    if (paletteColors) {
      if (Array.isArray(ds.data)) ds.data.forEach((pt) => { if (pt && typeof pt === 'object') delete pt.color; });
      if (Array.isArray(ds.dataset)) {
        ds.dataset.forEach((series) => {
          if (series && typeof series === 'object') {
            delete series.color;
            if (Array.isArray(series.data)) series.data.forEach((pt) => { if (pt && typeof pt === 'object') delete pt.color; });
          }
        });
      }
    }
    // favor responsive sizing
    ds.chart.usePlotGradientColor = ds.chart.usePlotGradientColor ?? '0';
    return ds;
  }, [
    data,
    dataSource,
    chartBgColor,
    canvasBgColor,
    baseFontFamily,
    baseFontSize,
    baseFontColor,
    captionFontSize,
    captionFontColor,
    subCaptionFontSize,
    subCaptionFontColor,
    labelFontColor,
    valueFontColor,
    legendFontFamily,
    legendFontSize,
    legendFontColor,
    toolTipBgColor,
    toolTipBorderColor,
    toolTipColor,
    paletteColors,
  ]);

  const mergedEvents = useMemo(() => {
    const ev = { ...(events || {}) };
    if (onChartClick) ev.chartClick = (e) => onChartClick(e);
    if (onDataPointClick) ev.dataplotClick = (e) => onDataPointClick(e);
    if (onLegendClick) ev.legendItemClicked = (e) => onLegendClick(e);
    return ev;
  }, [events, onChartClick, onDataPointClick, onLegendClick]);

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
      <div style={{ width: '100%', height: '100%', ...hostStyle }}>
        <ReactFusioncharts
          ref={ref}
          type={type}
          width={rest.w || rest.width || '100%'}
          height={rest.h || rest.height || '100%'}
          dataFormat="JSON"
          dataSource={mergedDataSource}
          {...(mergedEvents ? { events: mergedEvents } : {})}
        />
      </div>
    </Container>
  );
});

export default Chart;


