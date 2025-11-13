import React from 'react';
import Chart from './Chart';
import { useChartData } from './useChartData';

const FetchChart = ({ chartType, endpoint, method = 'GET', headers, params, transform, deps, as, style, hidden, ...rest }) => {
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

  return <Chart as={as} style={style} hidden={hidden} type={chartType} data={dataSource} {...rest} />;
};

export default FetchChart;
export { FetchChart };


