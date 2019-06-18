import React from 'react';
import PropTypes from 'prop-types';
import { NavLink } from 'react-router-dom';

const DownloadItem = ({
  id,
  removeMedia,
  title,
  downloadedOn,
  language,
  subtitles,
  quality,
}) => (
  <li className="list-group-item">
    {title}
    <br />
    <small>downloaded on: {downloadedOn}</small>
    <br />
    <small>language: {language}</small>
    <br />
    <small>subtitles: {subtitles}</small>
    <br /> 
    <small>quality: {quality}p</small>
    <hr />
    <div className="d-flex justify-content-between">
      <NavLink
        className="btn btn-primary"
        to={`/offline/${id}`}
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
