import { http, HttpHandler, HttpResponse } from 'msw';
import { uuid } from '@supabase/supabase-js/dist/main/lib/helpers';

import Mock from './mock';

type NewTodoBoxType = {
  title: string;
  priority: 1 | 2 | 3;
};

type PatchTodoBoxType = {
  title?: string;
};

const todoBoxHandler: HttpHandler[] = [];

/**
 * 새로운 TodoBox 생성
 * RequestBody: {
 *   title: string;
 *   priority: 1|2|3;
 * }
 */
todoBoxHandler.push(
  http.post<never, NewTodoBoxType>('/todobox', async ({ request }) => {
    const newTodo = await request.json();
    const { title, priority } = newTodo;
    const now = new Date().toString();
    const generatedTodoBox = { id: uuid(), title, priority, created_at: now, updated_at: now };
    try {
      Mock.TodoBox.push(generatedTodoBox);
      Mock.TodoView.push({ ...generatedTodoBox, todos: [] });
      return HttpResponse.json(generatedTodoBox);
    } catch (e) {
      return new HttpResponse(null, { status: 500, statusText: 'Failed Request' });
    }
  }),
);
todoBoxHandler.push(
  http.patch<{ todoBoxId: string }, PatchTodoBoxType>('/todobox/:todoBoxId', async ({ params, request }) => {
    const { todoBoxId } = params;
    const { title } = await request.json();
    const targetIndex = Mock.TodoBox.findIndex((todoBox) => todoBox.id === todoBoxId);
    const targetViewIndex = Mock.TodoView.findIndex((view) => view.id === todoBoxId);
    try {
      if (title !== undefined) {
        Mock.TodoBox[targetIndex].title = title;
        Mock.TodoView[targetViewIndex].title = title;
      }
      return HttpResponse.json(null, { status: 200, statusText: 'updated' });
    } catch (e) {
      return new HttpResponse(null, { status: 404, statusText: 'Not Found Todo' });
    }
  }),
);

export default todoBoxHandler;
