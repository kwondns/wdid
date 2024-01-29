import { http, HttpHandler, HttpResponse } from 'msw';
import { uuid } from '@supabase/supabase-js/dist/main/lib/helpers';

import Mock from './TodoMock';

type NewTodoType = {
  box_id: string;
  content: string;
};

type PatchTodoType = {
  content?: string;
  checked?: boolean;
};

const todoHandler: HttpHandler[] = [];
/**
 *  View TodoView 전체 가져오기
 *  Return TodoView
 */
todoHandler.push(
  http.get('/todos', () => {
    const { TodoView } = Mock;
    TodoView.sort((a, b) => a.priority - b.priority);
    const temp = [[], [], []] as any;
    TodoView.forEach((todoBox) => {
      switch (todoBox.priority) {
        case 1: {
          temp[0].push(todoBox);
          break;
        }
        case 2: {
          temp[1].push(todoBox);
          break;
        }
        default:
          temp[2].push(todoBox);
      }
    });
    return HttpResponse.json(temp);
  }),
);
/**
 * 새로운 Todo 생성하여 Todo Table에 넣고 TodoView에도 넣기
 * RequestBody: {
 *   box_id: string;
 *   content: string;
 * }
 */
todoHandler.push(
  http.post<never, NewTodoType>('/todos', async ({ request }) => {
    const newTodo = await request.json();
    const { box_id, content } = newTodo;
    const now = new Date().toString();
    const generatedTodo = { id: uuid(), box_id, checked: false, content, created_at: now, updated_at: now };
    try {
      Mock.Todo.push(generatedTodo);
      Mock.TodoView.find((boxes) => boxes.id === box_id)?.todos.push(generatedTodo);
      return HttpResponse.json(generatedTodo);
    } catch (e) {
      return new HttpResponse(null, { status: 500, statusText: 'Failed Request' });
    }
  }),
);
todoHandler.push(
  http.patch<{ todoId: string }, PatchTodoType>('/todos/:todoId', async ({ params, request }) => {
    const { todoId } = params;
    const { checked, content } = await request.json();
    const targetIndex = Mock.Todo.findIndex((todo) => todo.id === todoId);
    const targetViewIndex = Mock.TodoView.findIndex((view) => view.id === Mock.Todo[targetIndex].box_id);
    const targetViewTodoIndex = Mock.TodoView[targetViewIndex].todos.findIndex((todo) => todo.id === todoId);
    try {
      if (checked !== undefined) {
        Mock.Todo[targetIndex].checked = checked;
        Mock.TodoView[targetViewIndex].todos[targetViewTodoIndex].checked = checked;
      } else if (content !== undefined) {
        Mock.Todo[targetIndex].content = content;
        Mock.TodoView[targetViewIndex].todos[targetViewTodoIndex].content = content;
      }
      return HttpResponse.json(null, { status: 200, statusText: 'updated' });
    } catch (e) {
      return new HttpResponse(null, { status: 404, statusText: 'Not Found Todo' });
    }
  }),
);

export default todoHandler;
