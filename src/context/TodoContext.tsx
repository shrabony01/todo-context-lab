import React, { createContext, useContext, useReducer, useEffect, useMemo, useCallback } from 'react';
import type { Todo, TodoContextType } from '../types/todo';

const TodoContext = createContext<TodoContextType | null>(null);

type TodoAction =
  | { type: 'ADD_TODO'; payload: { text: string } }
  | { type: 'TOGGLE_TODO'; payload: { id: string } }
  | { type: 'DELETE_TODO'; payload: { id: string } }
  | { type: 'EDIT_TODO'; payload: { id: string; newText: string } }
  | { type: 'CLEAR_COMPLETED' };

function todoReducer(state: Todo[], action: TodoAction): Todo[] {
  switch (action.type) {
    case 'ADD_TODO':
      return [
        ...state,
        {
          id: Date.now().toString(),
          text: action.payload.text,
          completed: false,
        },
      ];

    case 'TOGGLE_TODO':
      return state.map((todo) =>
        todo.id === action.payload.id ? { ...todo, completed: !todo.completed } : todo
      );

    case 'DELETE_TODO':
      return state.filter((todo) => todo.id !== action.payload.id);

    case 'EDIT_TODO':
      return state.map((todo) =>
        todo.id === action.payload.id ? { ...todo, text: action.payload.newText } : todo
      );

    case 'CLEAR_COMPLETED':
      return state.filter((todo) => !todo.completed);

    default:
      return state;
  }
}

export const TodoProvider: React.FC<{ children: React.ReactNode }> = ({ children }) => {
  // Rehydrate state from localStorage using the lazy initialization argument
  const [todos, dispatch] = useReducer(todoReducer, [], () => {
    try {
      const cached = localStorage.getItem('app_todos');
      return cached ? (JSON.parse(cached) as Todo[]) : [];
    } catch {
      return [];
    }
  });

  // Persist to localStorage whenever todos state changes
  useEffect(() => {
    try {
      localStorage.setItem('app_todos', JSON.stringify(todos));
    } catch (err) {
      console.error('Failed to sync todos with localStorage:', err);
    }
  }, [todos]);

  const addTodo = useCallback((text: string) => {
    if (!text.trim()) return;
    dispatch({ type: 'ADD_TODO', payload: { text: text.trim() } });
  }, []);

  const toggleTodo = useCallback((id: string) => {
    dispatch({ type: 'TOGGLE_TODO', payload: { id } });
  }, []);

  const deleteTodo = useCallback((id: string) => {
    dispatch({ type: 'DELETE_TODO', payload: { id } });
  }, []);

  const editTodo = useCallback((id: string, newText: string) => {
    if (!newText.trim()) return;
    dispatch({ type: 'EDIT_TODO', payload: { id, newText: newText.trim() } });
  }, []);

  const clearCompleted = useCallback(() => {
    dispatch({ type: 'CLEAR_COMPLETED' });
  }, []);

  const value = useMemo<TodoContextType>(
    () => ({
      todos,
      addTodo,
      toggleTodo,
      deleteTodo,
      editTodo,
      clearCompleted,
    }),
    [todos, addTodo, toggleTodo, deleteTodo, editTodo, clearCompleted]
  );

  return <TodoContext.Provider value={value}>{children}</TodoContext.Provider>;
};

export const useTodos = (): TodoContextType => {
  const context = useContext(TodoContext);
  if (!context) {
    throw new Error('useTodos must be used within a TodoProvider');
  }
  return context;
};