import React, { createContext, useContext, useState, useMemo, useCallback } from 'react';
import { FilterType, FilterContextType } from '../types/todo';

const FilterContext = createContext<FilterContextType | null>(null);

export const FilterProvider: React.FC<{ children: React.ReactNode }> = ({ children }) => {
  const [filter, setFilterState] = useState<FilterType>('all');

  const setFilter = useCallback((nextFilter: FilterType) => {
    setFilterState(nextFilter);
  }, []);

  const value = useMemo(() => ({ filter, setFilter }), [filter, setFilter]);

  return <FilterContext.Provider value={value}>{children}</FilterContext.Provider>;
};

export const useFilter = (): FilterContextType => {
  const context = useContext(FilterContext);
  if (!context) {
    throw new Error('useFilter must be used within a FilterProvider');
  }
  return context;
};