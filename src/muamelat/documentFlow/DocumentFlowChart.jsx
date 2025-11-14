import React from 'react';
import './DocumentFlowChart.scss';
import am5themes_Animated from '@amcharts/amcharts5/themes/Animated';
import * as am5 from '@amcharts/amcharts5';
import * as am5xy from '@amcharts/amcharts5/xy';
import mockData from './mockData';
import { expandStyleProps } from '../../utils/styleSystem';

const DocumentFlowChart = ({
  chartData = mockData,
  data,
  id = 'DOCUMENTFLOWCHART',
  color = '#092370',
  paletteColors,
  baseInterval = { timeUnit: 'hour', count: 1 },
  xMinGridDistance = 70,
  xOpposite = true,
  yMinGridDistance = 30,
  tooltipText = '{category}',
  shadow,
  chartBgColor,
  baseFontFamily,
  baseFontSize,
  baseFontColor,
  labelFontSize,
  labelFontColor,
  toolTipBgColor,
  toolTipBorderColor,
  toolTipColor,
  onBarClick,
  onDataPointClick,
  as,
  style,
  hidden,
  customProps,
  className,
  role,
  tabIndex,
  title,
  draggable,
  dir,
  lang,
  ...rest
}) => {
  const Container = as || 'div';
  const containerStyle = { ...expandStyleProps(rest), ...(style || {}) };
  if (chartBgColor) containerStyle.background = chartBgColor;
  if (baseFontFamily) containerStyle.fontFamily = baseFontFamily;
  if (baseFontSize) containerStyle.fontSize = baseFontSize;
  if (hidden === true && containerStyle.display === undefined) containerStyle.display = 'none';
  const hostStyle = {};
  if (shadow) {
    const smap = { none: '0', sm: '1', md: '3', lg: '5' };
    const key = smap[String(shadow)] || null;
    if (key) hostStyle.boxShadow = `var(--sb-shadow-${key})`;
    if (shadow === 'none') hostStyle.boxShadow = 'var(--sb-shadow-0)';
  }
  const effectiveData = chartData ?? data;
  React.useLayoutEffect(() => {
    const root = am5.Root.new(id);
    root.setThemes([am5themes_Animated.new(root)]);

    const chart = root.container.children.push(
      am5xy.XYChart.new(root, {
        panX: false,
        panY: false,
        wheelX: 'panX',
        wheelY: 'zoomX',
        paddingLeft: 0,
        layout: root.verticalLayout,
      }),
    );

    const yAxis = chart.yAxes.push(
      am5xy.CategoryAxis.new(root, {
        categoryField: 'category',
        renderer: am5xy.AxisRendererY.new(root, {
          minorGridEnabled: true,
          minGridDistance: yMinGridDistance,
        }),
      }),
    );

    const xAxis = chart.xAxes.push(
      am5xy.DateAxis.new(root, {
        baseInterval,
        renderer: am5xy.AxisRendererX.new(root, {
          strokeOpacity: 0.05,
          minorGridEnabled: true,
          minGridDistance: xMinGridDistance,
          opposite: xOpposite,
        }),
      }),
    );
    // Apply base font styles to axis labels
    const labelStyles = {};
    if (baseFontFamily) labelStyles.fontFamily = baseFontFamily;
    if (labelFontSize || baseFontSize) labelStyles.fontSize = labelFontSize || baseFontSize;
    if (labelFontColor || baseFontColor) labelStyles.fill = am5.color(typeof (labelFontColor || baseFontColor) === 'string' ? (labelFontColor || baseFontColor) : String(labelFontColor || baseFontColor));
    yAxis.get('renderer').labels.template.setAll(labelStyles);
    xAxis.get('renderer').labels.template.setAll(labelStyles);

    const series = chart.series.push(
      am5xy.ColumnSeries.new(root, {
        xAxis,
        yAxis,
        openValueXField: 'start',
        valueXField: 'end',
        categoryYField: 'category',
        sequencedInterpolation: true,
      }),
    );

    // Resolve palette colors (FusionCharts parity)
    const resolvePalette = (p) => {
      if (!p) return [];
      if (Array.isArray(p)) return p.filter(Boolean);
      if (typeof p === 'string') return p.split(',').map((c) => c.trim()).filter(Boolean);
      return [];
    };
    const palette = resolvePalette(paletteColors);
    const singleColor = (typeof color === 'string' && color.trim()) ? color : '#2a9cff';
    const data = (effectiveData || []).map((item) => {
      const [sYear, sMonth, sDay] = (item.fromDate || item.date).split('-');
      const start = new Date(sYear, sMonth - 1, sDay).setHours(0, 0, 0, 0);
      const end = new Date(sYear, sMonth - 1, sDay).setHours(23, 0, 0, 0);
      const idx = (effectiveData || []).indexOf(item);
      const palColor = palette.length ? palette[idx % palette.length] : null;
      return {
        category: `${item.name} (${item.count})`,
        start,
        end,
        columnSettings: { fill: am5.color(palColor || singleColor) },
      };
    });

    yAxis.data.setAll(
      Array.from(new Set(data.map((d) => d.category))).map((category) => ({ category })),
    );

    series.columns.template.setAll({
      templateField: 'columnSettings',
      strokeOpacity: 0,
      tooltipText,
      tooltipX: am5.percent(50),
      tooltipY: am5.percent(100),
    });
    if (onBarClick || onDataPointClick) {
      series.columns.template.events.on('click', (ev) => {
        const ctx = ev?.target?.dataItem?.dataContext;
        if (onBarClick) onBarClick(ctx);
        if (onDataPointClick) onDataPointClick(ctx);
      });
    }
    const tt = series.get('tooltip');
    if (tt) {
      tt.label.setAll({
        ...(baseFontSize ? { fontSize: baseFontSize } : {}),
        ...(toolTipColor ? { fill: am5.color(toolTipColor) } : { fill: am5.color(0xffffff) }),
        maxWidth: 180,
        oversizedBehavior: 'wrap',
        paddingTop: 6,
        paddingRight: 10,
        paddingBottom: 6,
        paddingLeft: 10,
        textAlign: 'center',
      });
      tt.set('pointerOrientation', 'vertical');
      tt.get('background')?.setAll({
        ...(toolTipBgColor ? { fill: am5.color(toolTipBgColor) } : { fill: am5.color(0x2563eb) }),
        fillOpacity: 0.95,
        ...(toolTipBorderColor ? { stroke: am5.color(toolTipBorderColor) } : { stroke: am5.color(0x1e40af) }),
        strokeOpacity: 1,
        cornerRadius: 8,
      });
      }
    series.data.setAll(data);

    series.appear();
    chart.appear(1000, 100);
    return () => root.dispose();
  }, [
    effectiveData,
    id,
    color,
    paletteColors,
    baseInterval.timeUnit,
    baseInterval.count,
    xMinGridDistance,
    xOpposite,
    yMinGridDistance,
    tooltipText,
    onBarClick,
    onDataPointClick,
    baseFontFamily,
    baseFontSize,
    baseFontColor,
    labelFontSize,
    labelFontColor,
    toolTipBgColor,
    toolTipBorderColor,
    toolTipColor,
  ]);

  return (
    <Container id={`${id}-wrap`} className={`documentflowchart-container ${className || ''}`.trim()} style={containerStyle} role={role} tabIndex={tabIndex} title={title} draggable={draggable} dir={dir} lang={lang} hidden={hidden} {...(customProps || {})}>
      <div id={id} style={{ width: '100%', height: '100%', ...hostStyle }} />
    </Container>
  );
};

export default DocumentFlowChart;


