import React from 'react';
import { Link } from 'react-router-dom';
function Navbar() {
  return (
    <nav className='navbar'>
        <h1> Soma Code</h1>
      <div className='logo-container'>
        <img src="download.png" alt="Logo" className="logo" />
      </div>
      <ul>
        <li><Link to="/about">Home</Link></li>
        <li><Link to="/questions">Questions</Link></li>
        <li><Link to="/score">Score</Link></li>
        <li><Link to="/feedback">Feedback</Link></li>
    </ul>
    </nav>
  );
}

export default Navbar;
