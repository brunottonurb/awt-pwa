import React from 'react';
import PropTypes from 'prop-types';
import { NavLink } from 'react-router-dom';

const DownloadItem = ({
  id,
  removeMedia,
  title,
  downloadedOn
}) => (
  <li className="list-group-item">
    {title}
    <br />
    <small>{downloadedOn}</small>
    <hr />
    <div className="d-flex justify-content-between">
      <NavLink
        className="btn btn-primary"
        href={`/offline/${id}`}
      >Watch</NavLink>
      <button
        type="button"
        className="btn btn-danger"
        onClick={removeMedia}
      >Remove</button>
    </div>
  </li>
);

DownloadItem.propTypes = {
  title: PropTypes.string.isRequired,
  id: PropTypes.string.isRequired,
  removeMedia: PropTypes.func.isRequired,
};

export default DownloadItem;
