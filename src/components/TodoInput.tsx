import React, { useState } from 'react';
import { useTodos } from '../context/TodoContext';

export const TodoInput: React.FC = () => {
  const [text, setText] = useState('');
  const { addTodo } = useTodos();

  const handleSubmit = (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    if (text.trim()) {
      addTodo(text);
      setText('');
    }
  };

  return (
    <form onSubmit={handleSubmit} className="todo-input-form">
      <input
        type="text"
        placeholder="What needs to be done?"
        value={text}
        onChange={(e: React.ChangeEvent<HTMLInputElement>) => setText(e.target.value)}
        className="todo-input"
      />
      <button type="submit" className="todo-add-btn">
        Add Todo
      </button>
    </form>
  );
};