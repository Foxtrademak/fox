import { memo } from 'react';
import type { ChartPoint } from '../../lib/statistics';

export interface CandleShapeProps {
  x?: number;
  y?: number;
  width?: number;
  height?: number;
  payload?: ChartPoint;
}

export const CandleShape = memo(({ x, y, width, height, payload }: CandleShapeProps) => {
  if (
    payload === undefined || 
    payload.isStart || 
    payload.isFuture || 
    x === undefined || 
    y === undefined || 
    width === undefined || 
    height === undefined || 
    isNaN(x) || 
    isNaN(y) || 
    isNaN(width) || 
    isNaN(height)
  ) return null;
  
  const open = payload.open ?? 0;
  const close = payload.close ?? 0;
  const high = payload.high ?? 0;
  const low = payload.low ?? 0;

  const isBullish = close >= open;
  const color = isBullish ? '#22c55e' : '#ff3b30';
  
  const diff = high - low || 1;
  const ratio = height / diff;
  
  const bodyTopY = y + (high - Math.max(open, close)) * ratio;
  const bodyBottomY = y + (high - Math.min(open, close)) * ratio;
  const bodyHeight = Math.max(Math.abs(bodyBottomY - bodyTopY), 2);
  
  const centerX = x + width / 2;

  return (
    <g>
      {/* Top Wick */}
      <line 
        x1={centerX} 
        y1={y} 
        x2={centerX} 
        y2={bodyTopY} 
        stroke={color} 
        strokeWidth={1} 
      />
      {/* Bottom Wick */}
      <line 
        x1={centerX} 
        y1={bodyBottomY} 
        x2={centerX} 
        y2={y + height} 
        stroke={color} 
        strokeWidth={1} 
      />
      {/* Candle Body */}
      <rect
        x={x}
        y={bodyTopY}
        width={width}
        height={bodyHeight}
        fill={isBullish ? 'rgba(34, 197, 94, 0.2)' : color}
        stroke={color}
        strokeWidth={1}
        rx={1}
      />
    </g>
  );
});
