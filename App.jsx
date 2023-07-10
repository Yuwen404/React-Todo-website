import { useState } from 'react';
import './App.scss';
import PropTypes from 'prop-types';

function App() {
  const [newItem, setNewItem] = useState('');
  const [todos, setTodos] = useState([]);

  // Event handler for input value change
  function handleNewItemChange(e) {
    setNewItem(e.target.value);
  }

  // Event handler for add button click
  function handleAddButton(e) {
    e.preventDefault();
    if (newItem.trim() !== '') {
      setTodos((currentTodos) => [
        ...currentTodos,
        { id: crypto.randomUUID(), title: newItem, completed: false },
      ]);
      console.log(todos);
      setNewItem('');
    }
  }

  function handleCheckboxClick(todoId) {
    setTodos((currentTodos) =>
      currentTodos.map((todo) =>
        todo.id === todoId ? { ...todo, completed: !todo.completed } : todo
      )
    );
  }

  function handleDeleteButton(todoId) {
    setTodos((currentTodos) =>
      currentTodos.filter((todo) => todo.id !== todoId)
    );
  }

  return (
    <>
      {/* NewItemInput component */}
      <NewItemInput newItem={newItem} onNewItemChange={handleNewItemChange} />

      {/* AddButton component */}
      <AddButton onAdd={handleAddButton} />

      {/* TodoList component */}
      <TodoList
        todos={todos}
        handleCheckboxClick={handleCheckboxClick}
        handleDeleteButton={handleDeleteButton}
      />
    </>
  );
}

function NewItemInput({ newItem, onNewItemChange }) {
  return (
    <label className="new-item-label" htmlFor="newItem">
      <h1>New Todo</h1>
      <input
        value={newItem}
        id="newItem"
        className="todo-input"
        type="text"
        onChange={onNewItemChange}
      />
    </label>
  );
}

NewItemInput.propTypes = {
  newItem: PropTypes.string.isRequired,
  onNewItemChange: PropTypes.func.isRequired,
};

function AddButton({ onAdd }) {
  return (
    <div className="container">
      <button className="add-button" onClick={onAdd}>
        Add
      </button>
    </div>
  );
}

AddButton.propTypes = {
  onAdd: PropTypes.func.isRequired,
};

function TodoList({ todos, handleCheckboxClick, handleDeleteButton }) {
  return (
    <div className="todo-list">
      <h1 className="todo-list-header">Todo List</h1>
      <ul className="todo-list-items">
        {todos.map((todo) => (
          <div className="newtodo" key={todo.id}>
            <label>
              <li
                className={`todo-list-item ${todo.completed ? 'completed' : ''}`}
              >
                <input
                  checked={todo.completed}
                  type="checkbox"
                  className="checkbox-input"
                  onChange={() => handleCheckboxClick(todo.id)}
                />
                {todo.title}
              </li>
            </label>
            <button
              className="delete-button"
              onClick={() => handleDeleteButton(todo.id)}
            >
              Delete
            </button>
          </div>
        ))}
      </ul>
    </div>
  );
}

TodoList.propTypes = {
  todos: PropTypes.array.isRequired,
  handleCheckboxClick: PropTypes.func.isRequired,
  handleDeleteButton: PropTypes.func.isRequired,
};

export default App;
