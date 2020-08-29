import React, { createRef, FormEvent } from 'react';
import './App.css';
import { useLocalStorage } from './hooks/useLocalStorage';

interface Todo {
  id: number;
  name: string;
  isComplete: boolean;
}

function App() {
  const [todos, setTodos] = useLocalStorage<Todo[]>('todos');
  const inputRef = createRef<HTMLInputElement>();

  const addTodo = (event: FormEvent) => {
    event.preventDefault();
    if (inputRef.current?.value !== '') {
      setTodos((todos) => [
        ...todos,
        {
          id: todos.length + 1,
          name: inputRef.current!.value,
          isComplete: false,
        },
      ]);
    }
  };

  const toggleTodo = (todo: Todo) => () => {
    setTodos((todos) =>
      [
        ...todos.filter(({ id }) => id !== todo.id),
        {
          ...todo,
          isComplete: !todo.isComplete,
        },
      ].sort((a, b) => a.id - b.id),
    );
  };

  const deleteTodo = (todo: Todo) => () => {
    setTodos((todos) => todos.filter(({ id }) => id !== todo.id));
  };

  return (
    <form className="App" onSubmit={addTodo}>
      <label>
        Todo
        <input type="text" name="todo" ref={inputRef} />
      </label>
      <button type="submit">Add TODO</button>
      <h1>Todos</h1>
      {todos.length === 0
        ? null
        : todos.map((todo) => (
            <>
              <div
                key={todo.id}
                onClick={toggleTodo(todo)}
                style={{
                  textDecoration: todo.isComplete ? 'line-through' : 'none',
                }}
              >
                {todo.name} {todo.isComplete ? '✔' : '❌'}
              </div>
              <button onClick={deleteTodo(todo)}>Delete</button>
            </>
          ))}
    </form>
  );
}

export default App;
