import { http, HttpHandler, HttpResponse } from 'msw';

import Mock from './WDIDMock';
import { DateLib } from '@/libs';

const howHandler: HttpHandler[] = [];
/**
 *  HowManyTimes 목록 가져오기
 *  Return HowManyTimes 목록
 */
howHandler.push(
  http.get('/howmany', () => {
    const { HowManyTimes } = Mock;
    const result = HowManyTimes.sort(
      (a, b) => DateLib.parseDateStr(a.date).getTime() - DateLib.parseDateStr(b.date).getTime(),
    )
      .slice(0, 30)
      .reverse();
    return HttpResponse.json(result);
  }),
);

export default howHandler;
