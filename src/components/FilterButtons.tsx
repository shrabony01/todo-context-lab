import React from 'react';
import type { FilterType } from '../types/todo';
import { useFilter } from '../context/FilterContext';

const FILTERS: { label: string; value: FilterType }[] = [
  { label: 'All', value: 'all' },
  { label: 'Active', value: 'active' },
  { label: 'Completed', value: 'completed' },
];

export const FilterButtons: React.FC = () => {
  const { filter, setFilter } = useFilter();

  return (
    <div className="filter-bar">
      {FILTERS.map((f) => (
        <button
          key={f.value}
          onClick={() => setFilter(f.value)}
          className={`filter-btn ${filter === f.value ? 'selected' : ''}`}
        >
          {f.label}
        </button>
      ))}
    </div>
  );
};