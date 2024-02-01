import { http, HttpHandler, HttpResponse } from 'msw';

import PresentMock from './PresentMock';

type PresentPatchType = {
  startTime: string;
  endTime?: string;
  title?: string;
  content?: string;
};
const presentHandler: HttpHandler[] = [];
/**
 *  현재 테이블
 *  임시 저장한 내용 불러오기
 */
presentHandler.push(
  http.get('/present', () => {
    const { Present } = PresentMock;
    return HttpResponse.json(Present);
  }),
);

presentHandler.push(
  http.patch<never, PresentPatchType>('/present', async ({ request }) => {
    const { startTime, endTime, title, content } = await request.json();
    PresentMock.Present[0].startTime = startTime;
    try {
      if (endTime) PresentMock.Present[0].endTime = endTime;
      if (title) PresentMock.Present[0].title = title;
      if (content) PresentMock.Present[0].content = content;
      return HttpResponse.json(null, { status: 200, statusText: 'updated' });
    } catch (e) {
      return new HttpResponse(null, { status: 404, statusText: 'Not Found Present.ts' });
    }
  }),
);

export default presentHandler;
