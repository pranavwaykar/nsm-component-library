import React from 'react';
import './DocumentFlowChart.scss';
import am5themes_Animated from '@amcharts/amcharts5/themes/Animated';
import * as am5 from '@amcharts/amcharts5';
import * as am5xy from '@amcharts/amcharts5/xy';
import mockData from './mockData';

const DocumentFlowChart = ({
  chartData = mockData,
  id = 'DOCUMENTFLOWCHART',
  color = '#2a9cff',
  baseInterval = { timeUnit: 'hour', count: 1 },
  xMinGridDistance = 70,
  xOpposite = true,
  yMinGridDistance = 30,
  tooltipText = '{category}',
}) => {
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

    const barColor = am5.color(am5.Color.fromString(color).toNumber());
    const data = (chartData || []).map((item) => {
      const [sYear, sMonth, sDay] = (item.fromDate || item.date).split('-');
      const start = new Date(sYear, sMonth - 1, sDay).setHours(0, 0, 0, 0);
      const end = new Date(sYear, sMonth - 1, sDay).setHours(23, 0, 0, 0);
      return {
        category: `${item.name} (${item.count})`,
        start,
        end,
        columnSettings: { fill: barColor },
      };
    });

    yAxis.data.setAll(
      Array.from(new Set(data.map((d) => d.category))).map((category) => ({ category })),
    );

    series.columns.template.setAll({
      templateField: 'columnSettings',
      strokeOpacity: 0,
      tooltipText,
    });
    series.data.setAll(data);

    series.appear();
    chart.appear(1000, 100);
    return () => root.dispose();
  }, [chartData, id, color, baseInterval.timeUnit, baseInterval.count, xMinGridDistance, xOpposite, yMinGridDistance, tooltipText]);

  return (
    <div className="documentflowchart-container">
      <div id={id} />
    </div>
  );
};

export default DocumentFlowChart;


