# Todo Application (React Context API)

## Overview
This application is a responsive, client-side Todo management tool built with **React** and **TypeScript**. The application leverages the **React Context API** for global state management—eliminating prop drilling and removing the need for external state management libraries. State persistence is implemented via the browser's `localStorage` API, and component rendering performance is optimized using React memoization hooks.

---

## Technical Features

### 1. State Architecture & Context Management
The application divides domain responsibilities across three decoupled React contexts:
- **`TodoContext`**: Coordinates the state array of todo items using a dedicated `useReducer` pattern. Actions include task creation (`ADD_TODO`), status toggling (`TOGGLE_TODO`), inline editing (`EDIT_TODO`), single deletion (`DELETE_TODO`), and batch clearance (`CLEAR_COMPLETED`). All array transitions strictly preserve state immutability.
- **`FilterContext`**: Holds the active visibility filter (`'all' | 'active' | 'completed'`). It allows views to conditionally project the underlying list without mutating source data.
- **`ThemeContext`**: Controls the application-wide display theme (`'light' | 'dark'`), applying CSS classes to modify component color schemes.
- **`AppProviders`**: A higher-order composition component that encapsulates the provider hierarchy, keeping root initialization logic organized within `App.tsx`.

### 2. User Interface & Components
- **`TodoInput`**: Controlled form component providing task capture with whitespace validation.
- **`TodoList` & `TodoItem`**: Displays the active dataset matching the applied filter. Supports inline editing with dynamic toggle mode, keyboard event handling (`Enter` to confirm, `Escape` to cancel), and completion toggling via circular check indicators.
- **`FilterButtons`**: Centered segment control for filtering visibility and triggering bulk clearance of completed tasks.
- **`ThemeToggleButton`**: Header control to switch dynamically between light and dark palettes.

### 3. Persistence & Rehydration
- Todos and theme preferences synchronize with `localStorage` on every change via `useEffect`.
- Initial state hydration occurs lazily within hook initializers, avoiding hydration mismatch errors and redundant disk reads.

### 4. Performance Optimization & Type Safety
- **Memoization**: Context payload objects and derived filtered lists are wrapped in `useMemo`. Action handler functions are wrapped in `useCallback` to prevent unwanted re-renders across consumers.
- **Strict Typing**: Standardized interfaces (`Todo`, `TodoContextType`, `FilterContextType`, `ThemeContextType`) and discriminated union action types are centralized in `src/types/todo.ts` to enforce compile-time safety with zero TypeScript errors.