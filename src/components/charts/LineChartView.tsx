import { useMemo } from 'react';
import { AreaChart, Area, XAxis, YAxis, CartesianGrid, Tooltip } from 'recharts';
import { useTradeChart } from '../../hooks/useTradeChart';

/**
 * Responsibility: Rendering the Area Chart for equity curve visualization.
 * Smart Component: Pulls data and domain from useTradeChart.
 */
export function LineChartView() {
  const { activeData: data, stats } = useTradeChart();
  const { yDomain } = stats;

  // Calculate gradient stops for the line color (green for up, red for down)
  const lineStops = useMemo(() => {
    if (data.length <= 1) return null;
    return data.map((point, i) => {
      const percentage = (i / (data.length - 1)) * 100;
      let color = '#22c55e'; // Green (Positive)
      
      const currentCap = point.capital;
      const prevPoint = i > 0 ? data[i-1] : null;
      const prevCap = prevPoint ? prevPoint.capital : null;

      if (i > 0 && currentCap !== null && prevCap !== null) {
        if (currentCap < prevCap) {
          color = '#ff3b30'; // Red (Negative)
        }
      } else if (data.length > 1) {
        const firstCap = data[0].capital;
        const secondCap = data[1].capital;
        if (firstCap !== null && secondCap !== null && secondCap < firstCap) {
          color = '#ff3b30';
        }
      }
      
      return (
        <stop key={i} offset={`${percentage}%`} stopColor={color} />
      );
    });
  }, [data]);

  return (
    <AreaChart 
      data={data} 
      margin={{ top: 5, right: 5, left: -25, bottom: 20 }}
    >
      <defs>
        <linearGradient id="colorCapital" x1="0" y1="0" x2="0" y2="1">
          <stop offset="5%" stopColor="#22c55e" stopOpacity={0.2}/>
          <stop offset="95%" stopColor="#22c55e" stopOpacity={0}/>
        </linearGradient>
        <linearGradient id="lineGradient" x1="0" y1="0" x2="1" y2="0">
          {lineStops}
        </linearGradient>
      </defs>
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
        contentStyle={{ 
          backgroundColor: 'rgba(10,10,12,0.95)', 
          border: '1px solid rgba(255,255,255,0.05)',
          borderRadius: '1.2rem',
          fontSize: '10px',
          fontWeight: '900',
          color: '#ffffff'
        }}
        itemStyle={{ color: '#ffffff', padding: '0' }}
        labelStyle={{ color: 'rgba(255,255,255,0.4)', marginBottom: '4px', fontSize: '8px', fontWeight: 'bold' }}
        formatter={(value: number | string | undefined) => [`$${Math.round(Number(value) || 0)}`, 'Balance']}
      />
      <Area 
        type="monotone" 
        dataKey="capital" 
        stroke="url(#lineGradient)" 
        strokeWidth={3}
        fillOpacity={1} 
        fill="url(#colorCapital)" 
        animationDuration={1500}
      />
    </AreaChart>
  );
}
