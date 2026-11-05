export interface Todo {
  id: string;
  text: string;
  completed: boolean;
}

export type FilterType = 'all' | 'active' | 'completed';

export type ThemeType = 'light' | 'dark';

export interface TodoContextType {
  todos: Todo[];
  addTodo: (text: string) => void;
  toggleTodo: (id: string) => void;
  deleteTodo: (id: string) => void;
  editTodo: (id: string, newText: string) => void;
  clearCompleted: () => void;
}

export interface FilterContextType {
  filter: FilterType;
  setFilter: (filter: FilterType) => void;
}

export interface ThemeContextType {
  theme: ThemeType;
  toggleTheme: () => void;
}