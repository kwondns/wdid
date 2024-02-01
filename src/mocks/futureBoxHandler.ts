import { http, HttpHandler, HttpResponse } from 'msw';
import { uuid } from '@supabase/supabase-js/dist/main/lib/helpers';

import FutureMock from './FutureMock';

type NewFutureBoxType = {
  title: string;
  priority: 1 | 2 | 3;
};

type PatchFutureBoxType = {
  title?: string;
};

const futureBoxHandler: HttpHandler[] = [];

/**
 * 새로운 FutureBox 생성
 * RequestBody: {
 *   title: string;
 *   priority: 1|2|3;
 * }
 */
futureBoxHandler.push(
  http.post<never, NewFutureBoxType>('/futurebox', async ({ request }) => {
    const newFuture = await request.json();
    const { title, priority } = newFuture;
    const now = new Date().toString();
    const generatedFutureBox = { id: uuid(), title, priority, created_at: now, updated_at: now };
    try {
      FutureMock.FutureBox.push(generatedFutureBox);
      FutureMock.FutureView.push({ ...generatedFutureBox, futures: [] });
      return HttpResponse.json(generatedFutureBox);
    } catch (e) {
      return new HttpResponse(null, { status: 500, statusText: 'Failed Request' });
    }
  }),
);
futureBoxHandler.push(
  http.patch<{ futureBoxId: string }, PatchFutureBoxType>('/futurebox/:futureBoxId', async ({ params, request }) => {
    const { futureBoxId } = params;
    const { title } = await request.json();
    const targetIndex = FutureMock.FutureBox.findIndex((futureBox) => futureBox.id === futureBoxId);
    const targetViewIndex = FutureMock.FutureView.findIndex((view) => view.id === futureBoxId);
    try {
      if (title !== undefined) {
        FutureMock.FutureBox[targetIndex].title = title;
        FutureMock.FutureView[targetViewIndex].title = title;
      }
      return HttpResponse.json(null, { status: 200, statusText: 'updated' });
    } catch (e) {
      return new HttpResponse(null, { status: 404, statusText: 'Not Found Future.ts' });
    }
  }),
);

export default futureBoxHandler;
