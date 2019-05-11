import React, { useState, useContext } from 'react';
import PropTypes from 'prop-types';
import { Store } from '../Store';
import { NavLink } from 'react-router-dom';

const Nav = ({ routes }) => {
  const [isOpen, setIsOpen] = useState(false);
  const { state } = useContext(Store);

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
      <div className={`collapse navbar-collapse ${isOpen ? 'show': ''}`}>
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
      {state.isOnline
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
