import React, { useState, useEffect } from 'react';
import PropTypes from 'prop-types';
import { NavLink } from 'react-router-dom';

const Nav = ({ routes }) => {
  const [isOpen, setIsOpen] = useState(false);
  const [isOnline, setIsOnline] = useState(window.navigator.onLine);

  const setIsOnlineTrue = () => setIsOnline(true);
  const setIsOnlineFalse = () => setIsOnline(false);

  useEffect(() => { // listen to online status
    window.addEventListener('online', setIsOnlineTrue);
    window.addEventListener('offline', setIsOnlineFalse);
    return () => { // clean up on component unmount
      window.removeEventListener("online", setIsOnlineTrue);
      window.removeEventListener('offline', setIsOnlineFalse);
    };
  },[]);

  return (
    <nav className="navbar navbar-expand-sm navbar-dark bg-dark fixed-top">
      <a className="navbar-brand" href="/#/">AWT-PWA</a>
      <button
        className="navbar-toggler"
        type="button"
        aria-expanded={isOpen}
        aria-label="Toggle navigation"
        onClick={() => setIsOpen(!isOpen)}
      >
        <span className="navbar-toggler-icon"></span>
      </button>
      <div className={`collapse navbar-collapse ${isOpen ? 'show': ''}`}>
        <div className="navbar-nav">
          {routes.map(({
            exact,
            key,
            label,
            path,
          }) => (
            <NavLink
              key={key}
              exact={exact}
              to={path}
              onClick={() => setIsOpen(false)}
              className="nav-item nav-link"
              activeClassName="active"
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
