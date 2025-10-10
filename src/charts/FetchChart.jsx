import React from 'react';
import Chart from './Chart';
import { useChartData } from './useChartData';

const FetchChart = ({ chartType, width = '100%', height = '100%', endpoint, method = 'GET', headers, params, transform, deps }) => {
  const { loading, error, dataSource } = useChartData({ endpoint, method, headers, params, transform, deps });

  if (error) {
    return (
      <div style={{ padding: 12, color: 'crimson', fontSize: 12 }}>
        Failed to load chart data
      </div>
    );
  }

  if (loading || !dataSource) {
    return <div style={{ padding: 12, fontSize: 12 }}>Loading chart…</div>;
  }

  return <Chart type={chartType} width={width} height={height} dataSource={dataSource} />;
};

export default FetchChart;
export { FetchChart };


