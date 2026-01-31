import React, { useMemo, useState, useEffect } from 'react';
import { useVirtualizer } from '@tanstack/react-virtual';
import type { ReportData, CombinedItem } from './useReportData';

export type VirtualReportItem = 
  | { type: 'header'; date: string; formattedDate: string; dailyPL: number }
  | { type: 'row'; items: CombinedItem[] };

/**
 * Responsibilities:
 * 1. Data Transformation: Flattening report data for virtualization
 * 2. Virtualization Management: Setting up the virtualizer
 * 3. Dynamic Sizing Logic: Estimating item sizes based on type and screen size
 */
export function useReportListVirtualization(
  reportData: ReportData,
  parentRef: React.RefObject<HTMLDivElement | null>
) {
  const { sortedDates, itemsByDate } = reportData;

  // Track window width for responsive virtualization
  const [windowWidth, setWindowWidth] = useState(typeof window !== 'undefined' ? window.innerWidth : 1200);

  useEffect(() => {
    if (typeof window === 'undefined') return;
    
    const handleResize = () => {
      setWindowWidth(window.innerWidth);
    };

    window.addEventListener('resize', handleResize);
    return () => window.removeEventListener('resize', handleResize);
  }, []);

  // Determine items per row based on Tailwind breakpoints
  const itemsPerRow = useMemo(() => {
    if (windowWidth >= 1024) return 3; // lg:grid-cols-3
    if (windowWidth >= 768) return 2;  // md:grid-cols-2
    return 1;                          // grid-cols-1
  }, [windowWidth]);

  // 1. Responsibility: Data Transformation
  const virtualItems = useMemo(() => {
    const items: VirtualReportItem[] = [];
    
    sortedDates.forEach(date => {
      const dayData = itemsByDate[date];
      
      // Add header
      items.push({ 
        type: 'header', 
        date,
        formattedDate: new Date(date).toLocaleDateString('en-US', { 
          weekday: 'short', 
          month: 'short', 
          day: 'numeric', 
          year: 'numeric' 
        }),
        dailyPL: dayData.dailyPL
      });
      
      const dayItems = dayData.items;
      
      for (let i = 0; i < dayItems.length; i += itemsPerRow) {
        items.push({ 
          type: 'row', 
          items: dayItems.slice(i, i + itemsPerRow) 
        });
      }
    });
    
    return items;
  }, [sortedDates, itemsByDate, itemsPerRow]);

  // 3. Responsibility: Dynamic Sizing Logic
  const getScrollElement = React.useCallback(() => 
    parentRef.current?.closest('main') || document.querySelector('main'), 
  [parentRef]);

  const estimateSize = React.useCallback((index: number) => {
    const item = virtualItems[index];
    if (!item) return 0;
    
    if (item.type === 'header') return 80;
    
    // Rows have fixed height based on card size + padding/gaps
    // Desktop/Tablet cards are slightly larger than mobile
    if (windowWidth < 768) return 195; // Mobile row height
    return 215; // Desktop/Tablet row height
  }, [virtualItems, windowWidth]);

  // 2. Responsibility: Virtualization Management
  const rowVirtualizer = useVirtualizer({
    count: virtualItems.length,
    getScrollElement,
    estimateSize,
    overscan: 5,
  });

  return {
    virtualItems,
    rowVirtualizer,
    getTotalSize: () => rowVirtualizer.getTotalSize(),
    getVirtualItems: () => rowVirtualizer.getVirtualItems()
  };
}
