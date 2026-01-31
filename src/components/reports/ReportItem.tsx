import React from 'react';
import type { CombinedItem } from '../../hooks/useReportData';
import { TradeReportItem } from './items/TradeReportItem';
import { WithdrawalReportItem } from './items/WithdrawalReportItem';

interface ReportItemProps {
  item: CombinedItem;
  theme: 'light' | 'dark';
}

/**
 * Responsibility: Orchestrating the rendering of different report item types.
 * Acts as a Dispatcher between TradeReportItem and WithdrawalReportItem.
 */
export const ReportItem = React.memo(({ item, theme }: ReportItemProps) => {
  if (item.type === 'trade') {
    return <TradeReportItem trade={item.data} theme={theme} />;
  }

  return <WithdrawalReportItem withdrawal={item.data} theme={theme} />;
});
