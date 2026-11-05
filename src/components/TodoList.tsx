import React, { useMemo } from 'react';
import { useTodos } from '../context/TodoContext';
import { useFilter } from '../context/FilterContext';
import { TodoItem } from './TodoItem';

export const TodoList: React.FC = () => {
  const { todos, clearCompleted } = useTodos();
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

  const activeCount = todos.filter((t) => !t.completed).length;
  const completedCount = todos.filter((t) => t.completed).length;

  return (
  <div className="todo-list-container todo-list-card">
    <ul className="todo-list">
      {filteredTodos.map((todo) => (
        <TodoItem key={todo.id} todo={todo} />
      ))}
    </ul>

    {todos.length > 0 && (
      <footer className="todo-footer">
        <span className="todo-count">
          <strong>{activeCount}</strong> {activeCount === 1 ? 'item' : 'items'} left
        </span>
        {completedCount > 0 && (
          <button onClick={clearCompleted} className="clear-completed-btn">
            Clear Completed ({completedCount})
          </button>
        )}
      </footer>
    )}
  </div>
);
};