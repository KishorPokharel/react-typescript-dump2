import { useMutation, useQueryClient } from '@tanstack/react-query';
import { CACHE_KEY_TODOS } from '../constants';
import todoService, { Todo } from '../services/todoService';

interface AddTodoContext {
  previousTodos: Todo[];
}

const useAddTodo = (onAdd: () => void) => {
  const queryClient = useQueryClient();
  return useMutation<Todo, Error, Todo, AddTodoContext>({
    mutationFn: todoService.post,
    onMutate: (newTodo) => {
      const previousTodos = queryClient.getQueryData<Todo[]>(['todos']) || [];
      queryClient.setQueryData<Todo[]>(CACHE_KEY_TODOS, (todos = []) => [
        newTodo,
        ...todos,
      ]);
      onAdd();
      return { previousTodos };
    },
    onSuccess: (savedTodo, newTodo) => {
      // approach 1: invalidate
      // queryClient.invalidateQueries({
      //   queryKey: ['todos'],
      // });
      // approach 2: update data in cache
      queryClient.setQueryData<Todo[]>(CACHE_KEY_TODOS, (todos) => {
        return todos?.map((todo) => (todo === newTodo ? savedTodo : todo));
      });
    },
    onError: (error, newTodo, context) => {
      if (!context) return;
      queryClient.setQueryData<Todo[]>(CACHE_KEY_TODOS, context.previousTodos);
    },
  });
};

export default useAddTodo;
