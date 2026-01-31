import { ResponsiveContainer } from 'recharts';
import { useTradeChart } from '../../hooks/useTradeChart';
import { LineChartView } from './LineChartView';
import { CandleChartView } from './CandleChartView';

/**
 * Responsibility: Handle the conditional rendering of different chart types.
 * Smart Component: Pulls viewMode from useTradeChart.
 */
export function ChartRenderer() {
  const { viewMode } = useTradeChart();

  return (
    <div className="w-full relative z-10 flex-1 min-h-0">
      <ResponsiveContainer width="100%" height="100%">
        {viewMode === 'line' ? (
          <LineChartView key="line-view" />
        ) : (
          <CandleChartView key="candle-view" />
        )}
      </ResponsiveContainer>
    </div>
  );
}
