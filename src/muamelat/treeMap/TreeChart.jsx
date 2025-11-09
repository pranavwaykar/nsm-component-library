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
  showLabels = true,
  labelMaxWidth = 125,
  tooltipText = '{category}: [bold]{sum}[/]',
  as,
  style,
  hidden,
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
  if (hidden === true && containerStyle.display === undefined) containerStyle.display = 'none';

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
      text: '{category}',
      oversizedBehavior: 'truncate',
      maxWidth: labelMaxWidth,
      ellipsis: '...'
    } : { visible: false });

    series.rectangles.template.setAll({
      cornerRadiusTL: cornerRadius,
      cornerRadiusTR: cornerRadius,
      cornerRadiusBL: cornerRadius,
      cornerRadiusBR: cornerRadius,
      crisp: true,
      strokeWidth,
      stroke: am5.color('#ffffff'),
      tooltipX: am5.percent(50),
      tooltipY: am5.percent(45),
      tooltipText,
    });

    series.data.setAll([{ name: 'Muamelat Treemap', children: data }]);
    seriesRef.current = series;

    return () => root.dispose();
  }, [data, downDepth, upDepth, initialDepth, cornerRadius, strokeWidth, showLabels, labelMaxWidth, tooltipText]);

  return (
    <Container id={id} className={`treechart ${className || ''}`.trim()} style={containerStyle} role={role} tabIndex={tabIndex} title={title} draggable={draggable} dir={dir} lang={lang} hidden={hidden}>
      <div className="t-body">
        <div className="tb-inset" ref={bodyRef} style={{ width: '100%', height: '100%' }} />
      </div>
    </Container>
  );
};

export default TreeChart;


