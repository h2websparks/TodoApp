import React, { useState } from 'react';
import { Link } from 'react-router-dom';

const Footer = () => {
  const [isMenuOpen, setIsMenuOpen] = useState(false);

  const toggleMenu = () => {
    setIsMenuOpen(!isMenuOpen);
  };

  return (
    <footer className="flex py-6 items-center justify-center bg-blue-900 text-white">
      <div className="flex justify-center items-center">Created with <img className="w-10 m-2" src="heart.png" alt="" /> by Mohd Hamza</div>
    </footer>
  );
};

export default Footer;
