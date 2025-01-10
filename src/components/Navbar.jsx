import React, { useState } from 'react';
import { Link } from 'react-router-dom';

const Navbar = () => {
  const [isMenuOpen, setIsMenuOpen] = useState(false);

  const toggleMenu = () => {
    setIsMenuOpen(!isMenuOpen);
  };

  return (
    <nav className="flex items-center justify-between px-6 py-4 bg-blue-900 text-white">
      <h1 className="text-2xl font-bold cursor-pointer">To-Do App</h1>
      <div className="lg:hidden">
        <button
          onClick={toggleMenu}
          className="text-3xl focus:outline-none"
        >
          {isMenuOpen ? '✖' : '☰'}
        </button>
      </div>
      <ul
        className={`lg:flex lg:space-x-6 absolute lg:static top-20 left-0 w-full bg-blue-900 lg:bg-transparent lg:w-auto transition-all duration-300 ease-in-out ${
          isMenuOpen ? 'block' : 'hidden'
        }`}
      >
        <li>
          <Link to="/" className="text-lg transition hover:text-blue-200 block px-6 py-3">
            Home
          </Link>
        </li>
        <li>
          <Link to="/about" className="text-lg transition hover:text-blue-200 block px-6 py-3">
            About
          </Link>
        </li>
        <li>
          <Link to="/contact" className="text-lg transition hover:text-blue-200 block px-6 py-3">
            Contact
          </Link>
        </li>
      </ul>
    </nav>
  );
};

export default Navbar;
