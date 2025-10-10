import {
  barConfig,
  stackBarConfig,
  stackBarConfigWithLegend,
  pieChartConfig,
  lineChartConfig,
  heatMapConfig,
} from './fusionConfig';

export const mockBarData = {
  chart: { ...stackBarConfig, maxBarHeight: 30 },
  data: [
    { label: 'Type A', value: '880000', color: '#0082FA' },
    { label: 'Type B', value: '730000', color: '#0082FA' },
    { label: 'Type C', value: '590000', color: '#0082FA' },
    { label: 'Type D', value: '520000', color: '#0082FA' },
    { label: 'Type E', value: '330000', color: '#0082FA' },
  ],
};

export const mockColumnData = {
  chart: barConfig,
  data: [
    { label: 'A', value: '120', color: '#3B82F6' },
    { label: 'B', value: '90', color: '#3B82F6' },
    { label: 'C', value: '60', color: '#3B82F6' },
    { label: 'D', value: '30', color: '#3B82F6' },
  ],
};

export const mockDoughnutData = {
  chart: pieChartConfig,
  data: [
    { label: 'Miscellaneous', value: '234', color: '#424C5D' },
    { label: 'E-Mail', value: '24', color: '#1EC62D' },
    { label: 'Legal History', value: '158', color: '#2591F2' },
    { label: 'Documents', value: '58', color: '#FFBB21' },
  ],
};

export const mockStackedColumnData = {
  chart: stackBarConfigWithLegend,
  categories: [
    { category: [{ label: 'Legal T' }, { label: 'Finance T' }, { label: 'Sales T' }, { label: 'XY Team' }] },
  ],
  dataset: [
    { seriesname: 'Signed', color: '007ef3', data: [{ value: '121' }, { value: '135' }, { value: '123' }, { value: '145' }] },
    { seriesname: 'Pending', color: 'ffc80b', data: [{ value: '131' }, { value: '154' }, { value: '283' }, { value: '131' }] },
    { seriesname: 'Not sent', color: '7e8b9f', data: [{ value: '131' }, { value: '154' }, { value: '98' }, { value: '131' }] },
  ],
};

export const mockLineData = {
  chart: { ...lineChartConfig, numberScaleValue: '1000' },
  categories: [
    { category: [{ label: 'Jan' }, { label: '15 Jan' }, { label: 'Feb' }, { label: '15 Feb' }, { label: 'Mar' }, { label: '15 Mar' }, { label: 'Apr' }] },
  ],
  dataset: [
    { data: [{ value: '15123', color: '#0082FA' }, { value: '14233', color: '#0082FA' }, { value: '25507', color: '#0082FA' }, { value: '9110', color: '#0082FA' }, { value: '15529', color: '#0082FA' }, { value: '20803', color: '#0082FA' }, { value: '19202', color: '#0082FA' }] },
    { data: [{ value: '13400', color: '#0082FA' }, { value: '12800', color: '#0082FA' }, { value: '22800', color: '#0082FA' }, { value: '12400', color: '#0082FA' }, { value: '15800', color: '#0082FA' }, { value: '19800', color: '#0082FA' }, { value: '21800', color: '#0082FA' }] },
  ],
};

export const mockHeatmapData = {
  chart: heatMapConfig,
  rows: { row: [{ id: 'expired', label: 'Expired' }, { id: 'completed', label: 'Completed' }, { id: 'planned', label: 'Planned' }] },
  columns: { column: [{ id: 'u1', label: 'User A' }, { id: 'u2', label: 'User B' }, { id: 'u3', label: 'User C' }] },
  dataset: [
    {
      data: [
        { rowid: 'expired', columnid: 'u1', value: '1' },
        { rowid: 'expired', columnid: 'u2', value: '8.5' },
        { rowid: 'expired', columnid: 'u3', value: '9.3' },
        { rowid: 'completed', columnid: 'u1', value: '9.2' },
        { rowid: 'completed', columnid: 'u2', value: '8.3' },
        { rowid: 'completed', columnid: 'u3', value: '7.3' },
        { rowid: 'planned', columnid: 'u1', value: '9.1' },
        { rowid: 'planned', columnid: 'u2', value: '8.6' },
        { rowid: 'planned', columnid: 'u3', value: '7.2' },
      ],
    },
  ],
  colorrange: { gradient: '1' },
};

export const mockPieData = {
  chart: pieChartConfig,
  data: [
    { label: 'A', value: '35', color: '#6366F1' },
    { label: 'B', value: '25', color: '#10B981' },
    { label: 'C', value: '20', color: '#F59E0B' },
    { label: 'D', value: '20', color: '#EF4444' },
  ],
};

export const mockAreaData = {
  chart: { ...lineChartConfig, drawAnchors: true },
  categories: [
    { category: [{ label: 'Jan' }, { label: 'Feb' }, { label: 'Mar' }, { label: 'Apr' }, { label: 'May' }] },
  ],
  dataset: [
    { data: [{ value: '20' }, { value: '35' }, { value: '30' }, { value: '40' }, { value: '45' }] },
  ],
};


