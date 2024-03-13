import React from 'react';
import { Link } from 'react-router-dom';
import server from './constanta';
const Nav = () => (
  <>
    
      <nav className="navbar p-3">
        <p>
          <Link className="nav-link" to="/">
            Главная
          </Link>
        </p>
        <a
          className="nav-link btn btn-dark text-white"
          href={`${server}/admin`}
          target='_blank'
        >
          👉 Админ панель
        </a>
      </nav>
  </>
);

export default Nav;
