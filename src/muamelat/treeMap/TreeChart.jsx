import React from 'react';
import './TreeChart.scss';
import * as am5 from '@amcharts/amcharts5';
import * as am5hierarchy from '@amcharts/amcharts5/hierarchy';
import am5themes_Animated from '@amcharts/amcharts5/themes/Animated';
import mockData from './mockData';
import { expandStyleProps } from '../../utils/styleSystem';

const TreeChart = ({
  data = mockData,
  downDepth = 1,
  upDepth = 0,
  initialDepth = 1,
  cornerRadius = 12,
  strokeWidth = 15,
  plotBorderColor,
  // labels
  showLabels = true,
  labelMaxWidth = 125,
  labelFontSize,
  labelFontColor,
  tooltipText = '{category}: [bold]{sum}[/]',
  shadow,
  chartBgColor,
  baseFontFamily,
  baseFontSize,
  baseFontColor,
  valueFontColor,
  paletteColors,
  toolTipBgColor,
  toolTipBorderColor,
  toolTipColor,
  as,
  style,
  hidden,
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
}) => {
  const rootRef = React.useRef(null);
  const seriesRef = React.useRef(null);
  const bodyRef = React.useRef(null);
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

  React.useEffect(() => {
    if (rootRef.current) rootRef.current.dispose();
    if (!bodyRef.current) return;
    const root = am5.Root.new(bodyRef.current);
    root.setThemes([am5themes_Animated.new(root)]);
    rootRef.current = root;

    const series = root.container.children.push(
      am5hierarchy.Treemap.new(root, {
        downDepth,
        upDepth,
        initialDepth,
        valueField: 'value',
        categoryField: 'title',
        childDataField: 'children',
      }),
    );

    series.labels.template.setAll(showLabels ? {
      text: '{title}',
      textAlign: 'center',
      centerX: am5.p50,
      centerY: am5.p50,
      oversizedBehavior: 'wrap',
      maxWidth: labelMaxWidth,
      ellipsis: '...',
      paddingLeft: 6,
      paddingRight: 6,
      ...(baseFontFamily ? { fontFamily: baseFontFamily } : {}),
      ...((labelFontSize || baseFontSize) ? { fontSize: labelFontSize || baseFontSize } : {}),
      // prefer explicit label color; otherwise fall back to valueFontColor, then base
      ...((labelFontColor || valueFontColor || baseFontColor) ? { fill: am5.color(labelFontColor || valueFontColor || baseFontColor) } : {}),
    } : { visible: false });

    series.rectangles.template.setAll({
      cornerRadiusTL: cornerRadius,
      cornerRadiusTR: cornerRadius,
      cornerRadiusBL: cornerRadius,
      cornerRadiusBR: cornerRadius,
      crisp: true,
      strokeWidth,
      stroke: am5.color(plotBorderColor || '#ffffff'),
      // bind per-node colors from data
      fillField: 'fill',
      strokeField: 'stroke',
      tooltipX: am5.percent(50),
      tooltipY: am5.percent(45),
      tooltipText,
    });

    // Apply palette colors if provided (FusionCharts parity)
    const resolvePalette = (p) => {
      if (!p) return [];
      if (Array.isArray(p)) return p.filter(Boolean);
      if (typeof p === 'string') {
        return p.split(',').map((c) => c.trim()).filter(Boolean);
      }
      return [];
    };
    const palette = resolvePalette(paletteColors);
    if (palette.length) {
      const cs = series.get('colors');
      if (cs && cs.setAll) {
        cs.setAll({ colors: palette.map((c) => am5.color(c)) });
      }
    }

    // Tooltip theming (match FusionCharts-style props)
    const tt = series.get('tooltip');
    if (tt) {
      tt.label.setAll({
        ...(baseFontSize ? { fontSize: baseFontSize } : {}),
        // prefer tooltip color; else fall back to valueFontColor; else leave theme default
        ...((toolTipColor || valueFontColor) ? { fill: am5.color(toolTipColor || valueFontColor) } : {}),
        maxWidth: 200,
        oversizedBehavior: 'wrap',
        textAlign: 'center',
        paddingTop: 6,
        paddingRight: 10,
        paddingBottom: 6,
        paddingLeft: 10,
      });
      const bg = tt.get('background');
      if (bg) {
        if (toolTipBgColor) bg.setAll({ fill: am5.color(toolTipBgColor) });
        if (toolTipBorderColor) bg.setAll({ stroke: am5.color(toolTipBorderColor) });
        bg.setAll({ cornerRadius: 8 });
      }
    }

    // Support per-node color from data.color or data.fill
    const mapNode = (node) => {
      if (!node || typeof node !== 'object') return node;
      const { children, color, fill, ...rest } = node;
      const mapped = { ...rest };
      const col = fill || color;
      if (col) mapped.fill = am5.color(col);
      if (Array.isArray(children)) mapped.children = children.map(mapNode);
      return mapped;
    };
    const normalizedChildren = Array.isArray(data) ? data.map(mapNode) : [];
    series.data.setAll([{ name: 'Muamelat Treemap', children: normalizedChildren }]);
    seriesRef.current = series;

    return () => root.dispose();
  }, [
    data,
    downDepth,
    upDepth,
    initialDepth,
    cornerRadius,
    strokeWidth,
    plotBorderColor,
    showLabels,
    labelMaxWidth,
    tooltipText,
    baseFontFamily,
    baseFontSize,
    baseFontColor,
    valueFontColor,
    labelFontSize,
    labelFontColor,
    paletteColors,
    toolTipBgColor,
    toolTipBorderColor,
    toolTipColor,
  ]);

  return (
    <Container id={id} className={`treechart ${className || ''}`.trim()} style={containerStyle} role={role} tabIndex={tabIndex} title={title} draggable={draggable} dir={dir} lang={lang} hidden={hidden} {...(customProps || {})}>
      <div className="t-body">
        <div className="tb-inset" ref={bodyRef} style={{ width: '100%', height: '100%', ...hostStyle }} />
      </div>
    </Container>
  );
};

export default TreeChart;


