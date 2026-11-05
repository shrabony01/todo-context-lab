import React, { useState } from 'react';
import type{ Todo } from '../types/todo';
import { useTodos } from '../context/TodoContext';

interface TodoItemProps {
  todo: Todo;
}

export const TodoItem: React.FC<TodoItemProps> = ({ todo }) => {
  const { toggleTodo, deleteTodo, editTodo } = useTodos();
  const [isEditing, setIsEditing] = useState(false);
  const [draftText, setDraftText] = useState(todo.text);

  const handleSave = () => {
    if (draftText.trim()) {
      editTodo(todo.id, draftText);
      setIsEditing(false);
    } else {
      deleteTodo(todo.id);
    }
  };

  const handleKeyDown = (e: React.KeyboardEvent<HTMLInputElement>) => {
    if (e.key === 'Enter') handleSave();
    if (e.key === 'Escape') {
      setDraftText(todo.text);
      setIsEditing(false);
    }
  };

  return (
    <li className={`todo-item ${todo.completed ? 'completed' : ''}`}>
      <input
        type="checkbox"
        checked={todo.completed}
        onChange={() => toggleTodo(todo.id)}
        className="todo-checkbox"
      />

      {isEditing ? (
        <input
          type="text"
          value={draftText}
          onChange={(e: React.ChangeEvent<HTMLInputElement>) => setDraftText(e.target.value)}
          onBlur={handleSave}
          onKeyDown={handleKeyDown}
          autoFocus
          className="todo-edit-input"
        />
      ) : (
        <span
          className="todo-text"
          onDoubleClick={() => setIsEditing(true)}
        >
          {todo.text}
        </span>
      )}

      <div className="todo-actions">
        {!isEditing && (
          <button onClick={() => setIsEditing(true)} className="btn-edit">
            Edit
          </button>
        )}
        <button onClick={() => deleteTodo(todo.id)} className="btn-delete">
          Delete
        </button>
      </div>
    </li>
  );
};