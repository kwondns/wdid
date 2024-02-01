import { http, HttpHandler, HttpResponse } from 'msw';
import { uuid } from '@supabase/supabase-js/dist/main/lib/helpers';

import PastMock from './PastMock';
import PresentMock from './PresentMock';
import { PastType } from '@/types';

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

pastHandler.push(
  http.post<never, PastType.PastCreateType>('/past', async ({ request }) => {
    const { title, content, startTime, endTime } = await request.json();
    const { Past } = PastMock;
    const { Present } = PresentMock;
    const now = new Date().toString();
    try {
      Past.push({ id: uuid(), title, startTime, endTime, content, created_at: now, updated_at: now });
      Present[0].title = '';
      Present[0].content = '';
      Present[0].startTime = '';
      Present[0].endTime = '';
      return new HttpResponse(null, { status: 200, statusText: 'Created' });
    } catch (e) {
      return new HttpResponse(null, { status: 500, statusText: 'Failed Request' });
    }
  }),
);

export default pastHandler;
