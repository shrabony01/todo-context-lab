import React from 'react';
import { ThemeProvider, useTheme } from './context/ThemeContext';
import { FilterProvider } from './context/FilterContext';
import { TodoProvider } from './context/TodoContext';
import { ThemeToggleButton } from './components/ThemeToggleButton';
import { TodoInput } from './components/TodoInput';
import { TodoList } from './components/TodoList';
import { FilterButtons } from './components/FilterButtons';
import './App.css';

const AppProviders: React.FC<{ children: React.ReactNode }> = ({ children }) => (
  <ThemeProvider>
    <FilterProvider>
      <TodoProvider>{children}</TodoProvider>
    </FilterProvider>
  </ThemeProvider>
);

const MainContent: React.FC = () => {
  const { theme } = useTheme();

  return (
    <div className={`app-container ${theme}`}>
      <div className="card">
        <header className="app-header">
          <h1>Todo App</h1>
          <ThemeToggleButton />
        </header>
        <TodoInput />
        <TodoList />
        <FilterButtons />
      </div>
    </div>
  );
};

export default function App(): React.ReactElement {
  return (
    <AppProviders>
      <MainContent />
    </AppProviders>
  );
}