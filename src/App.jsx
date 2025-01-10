import React, { useState, useEffect } from 'react';
import { v4 as uuidv4 } from 'uuid';
import Navbar from './components/Navbar';
import Footer from './components/Footer';

const Home = () => {
  const [todo, setTodo] = useState('');
  const [deadline, setDeadline] = useState('');
  const [todos, setTodos] = useState([]);
  const [editingIndex, setEditingIndex] = useState(null);
  const [showCompleted, setShowCompleted] = useState(true);

  useEffect(() => {
    const storedTodos = JSON.parse(localStorage.getItem('todos'));
    if (storedTodos) {
      setTodos(storedTodos);
    }
  }, []);

  useEffect(() => {
    if (todos.length > 0) {
      localStorage.setItem('todos', JSON.stringify(todos));
    }
  }, [todos]);

  const handleAddTodo = () => {
    if (todo.trim() && deadline.trim()) {
      const newTodo = {
        id: uuidv4(),
        task: todo,
        deadline,
        createdAt: new Date().toLocaleString(),
        isChecked: false,
      };
      setTodos([...todos, newTodo]);
      setTodo('');
      setDeadline('');
    }
  };

  const handleCheckboxChange = (index) => {
    const updatedTodos = [...todos];
    updatedTodos[index].isChecked = !updatedTodos[index].isChecked;
    setTodos(updatedTodos);
  };

  const handleDeleteTodo = (id) => {
    const updatedTodos = todos.filter((todo) => todo.id !== id);
    setTodos(updatedTodos);
  };

  const handleEditTodo = (index) => {
    const todoToEdit = todos[index];
    setTodo(todoToEdit.task);
    setDeadline(todoToEdit.deadline);
    setEditingIndex(index);
  };

  const handleSaveEdit = () => {
    if (todo.trim() && deadline.trim() && editingIndex !== null) {
      const updatedTodos = [...todos];
      updatedTodos[editingIndex] = {
        ...updatedTodos[editingIndex],
        task: todo,
        deadline,
      };
      setTodos(updatedTodos);
      setTodo('');
      setDeadline('');
      setEditingIndex(null);
    }
  };

  const filteredTodos = showCompleted
    ? todos
    : todos.filter((todo) => !todo.isChecked);

  return (
    <>
      <Navbar />
      <div className="min-h-[83vh] flex justify-center items-center">
        <div className="flex flex-col lg:flex-row w-full max-w-5xl bg-white rounded-lg shadow-lg overflow-hidden">
          <div className="w-full lg:w-1/2 p-6">
            <h2 className="text-xl font-bold text-gray-700 mb-4">
              {editingIndex !== null ? 'Edit Todo' : 'Add Todo'}
            </h2>
            <div className="space-y-4">
              <div>
                <input
                  type="text"
                  placeholder="Enter your task"
                  value={todo}
                  onChange={(e) => setTodo(e.target.value)}
                  className="w-full p-3 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500"
                />
              </div>
              <div>
                <input
                  type="date"
                  value={deadline}
                  onChange={(e) => setDeadline(e.target.value)}
                  className="w-full text-gray-400 p-3 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500"
                />
              </div>
              <div>
                <button
                  onClick={editingIndex !== null ? handleSaveEdit : handleAddTodo}
                  className="w-full py-3 bg-blue-500 text-white rounded-md hover:bg-blue-600 focus:outline-none focus:ring-2 focus:ring-blue-500"
                >
                  {editingIndex !== null ? 'Save Edit' : 'Add Todo'}
                </button>
              </div>
            </div>
          </div>
          <div className="w-full lg:w-1/2 p-6 border-t lg:border-t-0 lg:border-l border-gray-200">
            <div className="flex items-center justify-between mb-4">
              <h2 className="text-xl font-bold text-gray-700">Todo List</h2>
              <div className="flex items-center space-x-2">
                <input
                  type="checkbox"
                  checked={showCompleted}
                  onChange={() => setShowCompleted(!showCompleted)}
                  className="form-checkbox"
                />
                <label className="text-gray-600">Show Completed Todos</label>
              </div>
            </div>
            <ul className="space-y-4">
              {filteredTodos.length > 0 ? (
                filteredTodos.map((todo, index) => (
                  <li
                    key={todo.id}
                    className={`flex items-center space-x-4 p-3 rounded-md shadow-sm ${todo.isChecked ? 'bg-green-100' : 'bg-gray-50'
                      }`}
                  >
                    <input
                      type="checkbox"
                      checked={todo.isChecked}
                      onChange={() => handleCheckboxChange(index)}
                      className="form-checkbox"
                    />
                    <div>
                      <h3 className="font-semibold text-gray-800">{todo.task}</h3>
                      <p className="text-sm text-gray-600">
                        Created at: {todo.createdAt}
                      </p>
                      <p className="text-sm text-gray-600">
                        Will Finish Till: {todo.deadline}
                      </p>
                    </div>
                    <button
                      onClick={() => handleEditTodo(index)}
                      className="text-yellow-500 hover:text-yellow-600"
                    >
                      Edit
                    </button>
                    <button
                      onClick={() => handleDeleteTodo(todo.id)}
                      className="text-red-500 hover:text-red-600"
                    >
                      Delete
                    </button>
                  </li>
                ))
              ) : (
                <li className="text-gray-500">No tasks to display.</li>
              )}
            </ul>
          </div>
        </div>
      </div>
      <Footer />
    </>
  );
};

export default Home;
