import { http, HttpHandler, HttpResponse } from 'msw';
import { uuid } from '@supabase/supabase-js/dist/main/lib/helpers';

import FutureMock from './FutureMock';

type NewFutureType = {
  box_id: string;
  content: string;
};

type PatchFutureType = {
  content?: string;
  checked?: boolean;
};

const futureHandler: HttpHandler[] = [];
/**
 *  View FutureView 전체 가져오기
 *  Return FutureView
 */
futureHandler.push(
  http.get('/futures', () => {
    const { FutureView } = FutureMock;
    FutureView.sort((a, b) => a.priority - b.priority);
    const temp = [[], [], []] as any;
    FutureView.forEach((futureBox) => {
      switch (futureBox.priority) {
        case 1: {
          temp[0].push(futureBox);
          break;
        }
        case 2: {
          temp[1].push(futureBox);
          break;
        }
        default:
          temp[2].push(futureBox);
      }
    });
    return HttpResponse.json(temp);
  }),
);
/**
 * 새로운 Future.ts 생성하여 Future.ts Table에 넣고 FutureView에도 넣기
 * RequestBody: {
 *   box_id: string;
 *   content: string;
 * }
 */
futureHandler.push(
  http.post<never, NewFutureType>('/futures', async ({ request }) => {
    const newFuture = await request.json();
    const { box_id, content } = newFuture;
    const now = new Date().toString();
    const generatedFuture = { id: uuid(), box_id, checked: false, content, created_at: now, updated_at: now };
    try {
      FutureMock.Future.push(generatedFuture);
      FutureMock.FutureView.find((boxes) => boxes.id === box_id)?.futures.push(generatedFuture);
      return HttpResponse.json(generatedFuture);
    } catch (e) {
      return new HttpResponse(null, { status: 500, statusText: 'Failed Request' });
    }
  }),
);
futureHandler.push(
  http.patch<{ futureId: string }, PatchFutureType>('/futures/:futureId', async ({ params, request }) => {
    const { futureId } = params;
    const { checked, content } = await request.json();
    const targetIndex = FutureMock.Future.findIndex((future) => future.id === futureId);
    const targetViewIndex = FutureMock.FutureView.findIndex(
      (view) => view.id === FutureMock.Future[targetIndex].box_id,
    );
    const targetViewFutureIndex = FutureMock.FutureView[targetViewIndex].futures.findIndex(
      (future) => future.id === futureId,
    );
    try {
      if (checked !== undefined) {
        FutureMock.Future[targetIndex].checked = checked;
        FutureMock.FutureView[targetViewIndex].futures[targetViewFutureIndex].checked = checked;
      } else if (content !== undefined) {
        FutureMock.Future[targetIndex].content = content;
        FutureMock.FutureView[targetViewIndex].futures[targetViewFutureIndex].content = content;
      }
      return HttpResponse.json(null, { status: 200, statusText: 'updated' });
    } catch (e) {
      return new HttpResponse(null, { status: 404, statusText: 'Not Found Future.ts' });
    }
  }),
);

export default futureHandler;
