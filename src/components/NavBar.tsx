import React from 'react';
import { Link, navigate } from 'gatsby';
import { getUser, isLoggedIn, logout } from '../services/auth.service';

export const NavBar = () => {
  let greetingMessage = '';
  if (isLoggedIn()) {
    greetingMessage = `Hello ${getUser().name}`;
  } else {
    greetingMessage = 'You are not logged in';
  }
  return (
    <div>
      <span>{greetingMessage}</span>
      <nav>
        <Link to='/'>Home</Link>
        {` `}
        <Link to='/login'>Login</Link>
        {` `}
        {isLoggedIn() ? (
          <a
            href='/'
            onClick={(event) => {
              event.preventDefault();
              logout(() => navigate(`/login`));
            }}
          >
            Logout
          </a>
        ) : null}
      </nav>
    </div>
  );
};
