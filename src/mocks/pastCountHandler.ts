import { http, HttpHandler, HttpResponse } from 'msw';

import PastMock from './PastMock';
import { DateLib } from '@/libs';

const pastCountHandler: HttpHandler[] = [];
/**
 *  HowManyTimes 목록 가져오기
 *  Return HowManyTimes 목록
 */
pastCountHandler.push(
  http.get('/pastcount', () => {
    const { PastCount } = PastMock;
    const result = PastCount.sort(
      (a, b) => DateLib.parseDateStr(a.date).getTime() - DateLib.parseDateStr(b.date).getTime(),
    )
      .slice(0, 30)
      .reverse();
    return HttpResponse.json(result);
  }),
);

export default pastCountHandler;
