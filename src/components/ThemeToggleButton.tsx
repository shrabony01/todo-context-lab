import React from 'react';
import { useTheme } from '../context/ThemeContext';

export const ThemeToggleButton: React.FC = () => {
  const { theme, toggleTheme } = useTheme();

  return (
    <button className="theme-toggle-btn" onClick={toggleTheme}>
      {theme === 'light' ? '🌙 Switch to Dark' : '☀️ Switch to Light'}
    </button>
  );
};