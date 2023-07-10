//make a 404 page

import React from 'react';
import { Link } from 'react-router-dom';
import { isLoggedIn } from './contexts/pocketbase';

function NotFound() {
  return (
    <div>
      <h1>404 - Not Found</h1>
      <p>The page you are looking for does not exist.</p>
      <Link to={isLoggedIn() ? '/home' : '/'}>
        <button className="btn">Return</button>
      </Link>
    </div>
  );
}

export default NotFound;
