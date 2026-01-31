import { ComposedChart, Bar, XAxis, YAxis, CartesianGrid, Tooltip } from 'recharts';
import { type ChartPoint } from '../../lib/statistics';
import { CandleShape } from './CandleShape';
import { CandleTooltip } from './CandleTooltip';
import { useTradeChart } from '../../hooks/useTradeChart';

/**
 * Responsibility: Rendering the Candlestick Chart for OHLC data visualization.
 * Smart Component: Pulls data, domain, and gap from useTradeChart.
 */
export function CandleChartView() {
  const { activeData: data, stats } = useTradeChart();
  const { yDomain, candleGap } = stats;

  return (
    <ComposedChart 
      data={data} 
      margin={{ top: 5, right: 10, left: -20, bottom: 40 }}
      barGap={0}
      barCategoryGap={candleGap}
    >
      <CartesianGrid strokeDasharray="1 1" stroke="rgba(255,255,255,0.05)" vertical={true} />
      <XAxis 
        dataKey="displayDate" 
        fontSize={8} 
        tickLine={false} 
        axisLine={false}
        tick={{ fill: 'rgba(255,255,255,0.4)', fontWeight: 700 }}
        dy={15}
        height={30}
        type="category"
        interval="preserveStartEnd"
        minTickGap={25}
      />
      <YAxis 
        orientation="right"
        fontSize={8}
        tickLine={false}
        axisLine={false}
        tick={{ fill: 'rgba(255,255,255,0.3)', fontWeight: 800 }}
        domain={yDomain}
        tickFormatter={(value) => `$${Math.round(value).toLocaleString()}`}
        width={45}
      />

      <Tooltip 
        cursor={{ stroke: '#22c55e', strokeWidth: 1, strokeDasharray: '4 4' }}
        content={<CandleTooltip />}
      />
      <Bar
        dataKey={(d: ChartPoint) => [d.low ?? 0, d.high ?? 0]}
        isAnimationActive={false}
        shape={<CandleShape />}
      />
    </ComposedChart>
  );
}
