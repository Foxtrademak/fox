import { useMemo } from 'react';

export interface MarketSession {
  name: string;
  start: number;
  end: number;
  active: boolean;
  timeDisplay: string;
}

export function useMarketSessions(currentTime: Date) {
  const sessions = useMemo(() => {
    const getSessionStatus = (start: number, end: number, current: number) => {
      if (start < end) return current >= start && current < end;
      return current >= start || current < end; // For sessions crossing midnight
    };

    const currentHour = currentTime.getHours();
    const formatTime = (hour: number) => `${hour.toString().padStart(2, '0')}:00`;

    return [
      { 
        name: 'London', 
        start: 11, 
        end: 19, 
        active: getSessionStatus(11, 19, currentHour),
        timeDisplay: `${formatTime(11)} - ${formatTime(19)}`
      },
      { 
        name: 'New York', 
        start: 16, 
        end: 0, 
        active: getSessionStatus(16, 0, currentHour),
        timeDisplay: `${formatTime(16)} - 00:00`
      },
      { 
        name: 'Tokyo', 
        start: 3, 
        end: 12, 
        active: getSessionStatus(3, 12, currentHour),
        timeDisplay: `${formatTime(3)} - ${formatTime(12)}`
      },
      { 
        name: 'Sydney', 
        start: 1, 
        end: 10, 
        active: getSessionStatus(1, 10, currentHour),
        timeDisplay: `${formatTime(1)} - ${formatTime(10)}`
      }
    ];
  }, [currentTime]);

  return sessions;
}
