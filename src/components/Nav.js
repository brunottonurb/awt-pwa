import React, { useState } from 'react';
import PropTypes from 'prop-types';
import { NavLink } from 'react-router-dom';

const Nav = ({ routes }) => {
  const [open, setOpen] = useState(false);

  return (
    <nav className="navbar navbar-expand-sm navbar-light bg-light fixed-top">
      <a className="navbar-brand" href="/#/">AWT-PWA</a>
      <button
        className="navbar-toggler"
        type="button"
        aria-expanded={open}
        aria-label="Toggle navigation"
        onClick={() => setOpen(!open)}
      >
        <span className="navbar-toggler-icon"></span>
      </button>
      <div className={`collapse navbar-collapse ${open ? 'show': ''}`}>
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
              onClick={() => setOpen(false)}
              className="nav-item nav-link"
              activeClassName="active"
            >
              {label}<span className="sr-only">(current)</span>
            </NavLink>
          ))}
        </div>
      </div>
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
