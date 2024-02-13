import React from 'react';
import { Link } from 'react-router-dom';

function Navbar() {
  return (
    <nav>
      <ul>
        <li><Link to="/questions">Questions</Link></li>
        <li><Link to="/score">Score</Link></li>
        <li><Link to="/feedback">Feedback</Link></li>
        <li><Link to="/about">About</Link></li>
      </ul>
    </nav>
  );
}

export default Navbar;
