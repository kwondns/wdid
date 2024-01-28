import { http, HttpResponse } from 'msw';
import { uuid } from '@supabase/supabase-js/dist/main/lib/helpers';

import Mock from './mock';

type NewTodoType = {
  box_id: string;
  content: string;
};

type PatchTodoType = {
  content?: string;
  check?: boolean;
};

export const handlers = [
  /**
   *  View TodoView 전체 가져오기
   *  Return TodoView
   */
  http.get('/todos', () => {
    const { TodoView } = Mock;
    TodoView.sort((a, b) => a.priority - b.priority);
    return HttpResponse.json(TodoView);
  }),
  /**
   * 새로운 Todo 생성하여 Todo Table에 넣고 TodoView에도 넣기
   * RequestBody: {
   *   box_id: string;
   *   content: string;
   * }
   */
  http.post<never, NewTodoType>('/todos', async ({ request }) => {
    const newTodo = await request.json();
    const { box_id, content } = newTodo;
    const now = new Date().toString();
    const generatedTodo = { id: uuid(), box_id, check: false, content, created_at: now, updated_at: now };
    try {
      Mock.Todo.push(generatedTodo);
      Mock.TodoView.find((boxes) => boxes.id === box_id)?.todos.push(generatedTodo);
      return HttpResponse.json(generatedTodo);
    } catch (e) {
      return new HttpResponse(null, { status: 500, statusText: 'Failed Request' });
    }
  }),
  http.patch<{ todoId: string }, PatchTodoType>('/todos/:todoId', async ({ params, request }) => {
    const { todoId } = params;
    const { check, content } = await request.json();
    const targetIndex = Mock.Todo.findIndex((todo) => todo.id === todoId);
    try {
      if (check !== undefined) Mock.Todo[targetIndex].check = check;
      else if (content !== undefined) Mock.Todo[targetIndex].content = content;
      return HttpResponse.json(null, { status: 200, statusText: 'updated' });
    } catch (e) {
      return new HttpResponse(null, { status: 404, statusText: 'Not Found Todo' });
    }
  }),
];
