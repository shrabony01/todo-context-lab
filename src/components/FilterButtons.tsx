import React from 'react';
import type { FilterType } from '../types/todo';
import { useFilter } from '../context/FilterContext';
import { useTodos } from '../context/TodoContext';

const FILTERS: FilterType[] = ['all', 'active', 'completed'];

export const FilterButtons: React.FC = () => {
  const { filter, setFilter } = useFilter();
  const { clearCompleted, todos } = useTodos();

  const activeCount = todos.filter((t) => !t.completed).length;
  const hasCompleted = todos.some((t) => t.completed);

  return (
    <footer className="todo-footer">
      <span className="todo-count">
        <strong>{activeCount}</strong> {activeCount === 1 ? 'item' : 'items'} left
      </span>

      <div className="filters">
        {FILTERS.map((f) => (
          <button
            key={f}
            onClick={() => setFilter(f)}
            className={`filter-btn ${filter === f ? 'selected' : ''}`}
          >
            {f.charAt(0).toUpperCase() + f.slice(1)}
          </button>
        ))}
      </div>

      {hasCompleted && (
        <button onClick={clearCompleted} className="clear-completed-btn">
          Clear completed
        </button>
      )}
    </footer>
  );
};