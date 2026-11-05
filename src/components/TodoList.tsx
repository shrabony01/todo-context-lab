import React, { useMemo } from 'react';
import { useTodos } from '../context/TodoContext';
import { useFilter } from '../context/FilterContext';
import { TodoItem } from './TodoItem';

export const TodoList: React.FC = () => {
  const { todos } = useTodos();
  const { filter } = useFilter();

  const filteredTodos = useMemo(() => {
    switch (filter) {
      case 'active':
        return todos.filter((t) => !t.completed);
      case 'completed':
        return todos.filter((t) => t.completed);
      case 'all':
      default:
        return todos;
    }
  }, [todos, filter]);

  if (todos.length === 0) {
    return <p className="empty-message">No tasks yet! Add one above.</p>;
  }

  return (
    <ul className="todo-list">
      {filteredTodos.map((todo) => (
        <TodoItem key={todo.id} todo={todo} />
      ))}
    </ul>
  );
};