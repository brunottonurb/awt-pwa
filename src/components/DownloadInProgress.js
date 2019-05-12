import React from 'react';
import PropTypes from 'prop-types';

const DownloadInProgress = ({ title, dateStarted, progress }) => (
  <li className="list-group-item">
    {title}
    <br />
    <small>{dateStarted}</small>
    <hr />
    <div className="progress" style={{ marginBottom: '0.5rem' }}>
      <div
        className="progress-bar progress-bar-striped progress-bar-animated"
        role="progressbar"
        aria-valuenow={progress * 100}
        aria-valuemin="0"
        aria-valuemax="100"
        style={{ width: `${progress * 100}%` }}
      />
    </div>
  </li>
);

DownloadInProgress.propTypes = {
  title: PropTypes.string.isRequired,
  dateStarted: PropTypes.string.isRequired,
  progress: PropTypes.number.isRequired,
}

export default DownloadInProgress;
