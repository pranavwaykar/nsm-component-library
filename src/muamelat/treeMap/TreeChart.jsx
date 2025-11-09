import React from 'react';
import './TreeChart.scss';
import * as am5 from '@amcharts/amcharts5';
import * as am5hierarchy from '@amcharts/amcharts5/hierarchy';
import am5themes_Animated from '@amcharts/amcharts5/themes/Animated';
import mockData from './mockData';

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
}) => {
  const rootRef = React.useRef(null);
  const seriesRef = React.useRef(null);

  React.useEffect(() => {
    if (rootRef.current) rootRef.current.dispose();
    const root = am5.Root.new('treechart-body');
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
    <div className="treechart">
      <div className="t-body">
        <div className="tb-inset" id="treechart-body" />
      </div>
    </div>
  );
};

export default TreeChart;


