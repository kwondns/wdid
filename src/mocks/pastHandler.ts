import { http, HttpHandler, HttpResponse } from 'msw';

import PastMock from './PastMock';

const pastHandler: HttpHandler[] = [];
/**
 *  특정 날짜의 한일 가져오기
 */
pastHandler.push(
  http.get<{ date: string }>('/past/:date', ({ params }) => {
    const { Past } = PastMock;
    const { date } = params;
    const result = Past.filter((v) => new Date(v.startTime).getDate() === new Date(date).getDate());
    return HttpResponse.json(result);
  }),
);
export default pastHandler;
