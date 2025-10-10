// Minimal FusionCharts chart configs mirrored from dashboard

export const heatMapConfig = {
  showvalues: '1',
  theme: 'fusion',
  valueFontColor: 'ffffff',
  useEllipsesWhenOverflow: '1',
  showLegend: '0',
  baseFontSize: '13',
  labelFontSize: 10,
  labelFontBold: true,
  chartBottomMargin: 5,
  xAxisNameWidth: 200,
  plotBorderColor: '#ffffff',
  plotBorderThickness: 3,
};

export const stackBarConfig = {
  theme: 'fusion',
  chartBottomMargin: 10,
  scrollWidth: 2,
  scrollHeight: 5,
  labelDisplay: 'rotate',
  slantLabel: '1',
  baseFontSize: 10,
  xAxisNameWidth: 30,
  useEllipsesWhenOverflow: 1,
  showLegend: false,
};

export const stackBarConfigWithLegend = {
  theme: 'fusion',
  chartBottomMargin: 10,
  scrollWidth: 2,
  scrollHeight: 5,
  labelDisplay: 'rotate',
  slantLabel: '1',
  baseFontSize: 10,
  xAxisNameWidth: 30,
  useEllipsesWhenOverflow: 1,
  showLegend: true,
  legendPosition: 'top-left',
  legendItemFontSize: 13,
  plotToolText:
    "<div style='color: $color'>&nbsp &nbsp $seriesname | $label : $value</div>",
};

export const barConfig = {
  theme: 'fusion',
  chartBottomMargin: 10,
  scrollWidth: 2,
  scrollHeight: 5,
  labelDisplay: 'rotate',
  slantLabel: '1',
  baseFontSize: 10,
  xAxisNameWidth: 30,
  useEllipsesWhenOverflow: '1',
  decimals: 1,
};

export const lineChartConfig = {
  theme: 'fusion',
  chartBottomMargin: 0,
  drawAnchors: false,
  baseFontSize: 10,
  showLegend: '0',
};

export const pieChartConfig = {
  decimals: '0',
  theme: 'fusion',
  chartBottomMargin: 0,
  showPlotBorder: 3,
  plotBorderColor: '#ffffff',
  labelFontSize: 10,
  legendItemFontSize: 13,
  legendPosition: 'bottom-left',
  plotHighlightEffect: false,
  enableSlicing: 0,
  showPercentValues: '1',
  showLegend: '1',
  showValues: '0',
  showValuesInLegend: '1',
};


