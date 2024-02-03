export const parseDateStr = (dateStr: string) => {
  const parts = dateStr.split('/').map((part) => parseInt(part, 10));
  return new Date(parts[0], parts[1] - 1, parts[2]);
};

export const fromDate = (startDate: string | Date, endDate: string | Date) => {
  const start = new Date(startDate);
  const end = new Date(endDate);
  const diffMinute = (end.getTime() - start.getTime()) / 60 / 1000;
  if (diffMinute < 1) return '0 분';
  const hour = Math.floor(diffMinute / 60);
  const min = diffMinute % 60;
  let result = '';
  if (hour > 0) result += `${hour}시간 `;
  result += `${Math.round(min)} 분`;
  return result;
};

export const dateFormat = (startDate: string | Date, endDate: string | Date) => {
  const diff = fromDate(startDate, endDate);
  const start = new Date(startDate).toLocaleTimeString('ko-KR', { timeStyle: 'short', hour12: false });
  return `${start} 부터 ${diff}`;
};

export const DateTime = (date: string | Date) =>
  new Date(date).toLocaleString('ko-KR', { dateStyle: 'short', timeStyle: 'short', hour12: false });
