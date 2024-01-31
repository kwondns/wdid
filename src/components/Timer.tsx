import { useEffect, useState } from 'react';

export default function Timer() {
  const [time, setTime] = useState(new Date());
  useEffect(() => {
    const now = new Date();
    const timeUntilNextMinute = (60 - now.getSeconds()) * 1000 - now.getMilliseconds();

    // 정각에 맞춰 첫 업데이트를 실행
    const timeoutId = setTimeout(() => {
      setTime(new Date());

      // 그 후 1분마다 업데이트
      const intervalId = setInterval(() => {
        setTime(new Date());
      }, 60 * 1000);

      return () => clearInterval(intervalId);
    }, timeUntilNextMinute);

    return () => clearTimeout(timeoutId);
  }, []);
  return (
    <span className="text-2xl text-rose-300 ">
      {time.toLocaleString('ko-KR', { dateStyle: 'medium', timeStyle: 'short' })}
    </span>
  );
}
