import { http, HttpHandler, HttpResponse } from 'msw';

import Mock from './WDIDMock';

const didHandler: HttpHandler[] = [];
/**
 *  특정 날짜의 한일 가져오기
 */
didHandler.push(
  http.get<{ date: string }>('/did/:date', ({ params }) => {
    const { WhatDidIDo } = Mock;
    const { date } = params;

    WhatDidIDo.filter((v) => new Date(v.startTime).getDate() === new Date(date).getDate());
    return HttpResponse.json(WhatDidIDo);
  }),
);
export default didHandler;
