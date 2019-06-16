import React, { useState, useEffect, useRef } from 'react';
import PropTypes from 'prop-types';
import { NavLink } from 'react-router-dom';

const Nav = ({ routes }) => {
  const [isOpen, setIsOpen] = useState(false);
  const [isOnline, setIsOnline] = useState(false);
  const node = useRef();
  const setIsOnlineTrue = () => setIsOnline(true);
  const setIsOnlineFalse = () => setIsOnline(false);

  useEffect(() => {
    setIsOnline(window.navigator.onLine);
    window.addEventListener('online', setIsOnlineTrue);
    window.addEventListener('offline', setIsOnlineFalse);

    return () => {
      window.removeEventListener('online', setIsOnlineTrue);
      window.removeEventListener('offline', setIsOnlineFalse);
    };
  }, []);

  const handleClickOutside = e => {
    if (node.current.contains(e.target)) {
      return;
    }
    setIsOpen(false);
  };
  useEffect(() => {
    if (isOpen) {
      document.addEventListener("mousedown", handleClickOutside);
    } else {
      document.removeEventListener("mousedown", handleClickOutside);
    }

    return () => {
      document.removeEventListener("mousedown", handleClickOutside);
    };
  }, [isOpen]);

  return (
    <nav className="navbar navbar-expand-sm navbar-dark bg-dark fixed-top">
      <NavLink
        className="navbar-brand"
        exact
        to="/"
      >
        Shaka-O-Matik
      </NavLink>
      <button
        className="navbar-toggler"
        type="button"
        aria-expanded={isOpen}
        aria-label="Toggle navigation"
        onClick={() => setIsOpen(!isOpen)}
      >
        <span className="navbar-toggler-icon"></span>
      </button>
      <div
        className={`collapse navbar-collapse ${isOpen ? 'show': ''}`}
        ref={node}
      >
        <div className="navbar-nav">
          {routes.map(({
            exact,
            key,
            label,
            path,
          }) => (
            <NavLink
              activeClassName="active"
              className="nav-item nav-link"
              exact={exact}
              key={key}
              onClick={() => setIsOpen(false)}
              to={path}
            >
              {label}<span className="sr-only">(current)</span>
            </NavLink>
          ))}
        </div>
      </div>
      {isOnline
        ? <button type="button" className="btn btn-success" disabled>Online</button>
        : <button type="button" className="btn btn-danger" disabled>Offline</button>
      }
    </nav>
  );
};

Nav.propTypes = {
  routes: PropTypes.arrayOf(PropTypes.shape({
    label: PropTypes.string.isRequired,
    key: PropTypes.string.isRequired,
    path: PropTypes.string.isRequired,
    exact: PropTypes.bool,
  })).isRequired,
}

export default Nav;
