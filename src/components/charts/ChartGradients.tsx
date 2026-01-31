export const ChartGradients = () => (
  <defs>
    {/* Positive Gradient (Green) */}
    <linearGradient id="barGradientPositive" x1="0" y1="0" x2="0" y2="1">
      <stop offset="0%" stopColor="#22c55e" stopOpacity={0.8} />
      <stop offset="100%" stopColor="#22c55e" stopOpacity={0.2} />
    </linearGradient>

    {/* Negative Gradient (Red) */}
    <linearGradient id="barGradientNegative" x1="0" y1="0" x2="0" y2="1">
      <stop offset="0%" stopColor="#ef4444" stopOpacity={0.8} />
      <stop offset="100%" stopColor="#ef4444" stopOpacity={0.2} />
    </linearGradient>

    {/* Alternative names for compatibility if needed */}
    <linearGradient id="barGradientPositiveDaily" x1="0" y1="0" x2="0" y2="1">
      <stop offset="0%" stopColor="#22c55e" stopOpacity={0.8} />
      <stop offset="100%" stopColor="#22c55e" stopOpacity={0.2} />
    </linearGradient>
    <linearGradient id="barGradientNegativeDaily" x1="0" y1="0" x2="0" y2="1">
      <stop offset="0%" stopColor="#ef4444" stopOpacity={0.8} />
      <stop offset="100%" stopColor="#ef4444" stopOpacity={0.2} />
    </linearGradient>
  </defs>
);
