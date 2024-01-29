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
    HowManyTimes.sort((a, b) => DateLib.parseDateStr(a.date).getTime() - DateLib.parseDateStr(b.date).getTime());
    return HttpResponse.json(HowManyTimes);
  }),
);

export default howHandler;
