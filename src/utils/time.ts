import dayjs from 'dayjs';

interface TimeUnit {
  name: string;
  seconds: number;
}

const TIME_UNITS: TimeUnit[] = [
  { name: 'year', seconds: 60 * 60 * 24 * 365 },
  { name: 'month', seconds: 60 * 60 * 24 * 30 },
  { name: 'day', seconds: 60 * 60 * 24 },
  { name: 'hour', seconds: 60 * 60 },
  { name: 'minute', seconds: 60 },
  { name: 'second', seconds: 1 }
];

const calculateElapsedTime = (diffInSeconds: number): string => {
  for (const unit of TIME_UNITS) {
    const betweenTime = Math.floor(diffInSeconds / unit.seconds);
    if (betweenTime > 0) {
      return `${betweenTime} ${unit.name}${betweenTime > 1 ? 's' : ''} ago`;
    }
  }
  return 'now';
};

const elapsedTime = (date: number): string => {
  const start = new Date(date);
  const end = new Date();
  const diffInSeconds = (end.getTime() - start.getTime()) / 1000;
  return calculateElapsedTime(diffInSeconds);
};

const formatUnixNano = (timestamp: number): number => {
  return timestamp / 1000000;
};

const formatUtc = (timestamp: number): string => {
  return dayjs(timestamp).utc().format('MMM D, YYYY HH:mm:ss');
};

export const Time = {
  elapsedTime,
  formatUnixNano,
  formatUtc
};
