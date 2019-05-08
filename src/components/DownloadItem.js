import React, { Fragment } from 'react';
import PropTypes from 'prop-types';

const DownloadItem = ({
  title,
  progress,
  done,
  downloading,
  id,
}) => (
  <li className="list-group-item">
    {title}
    {!done && (
      <div className="progress" style={{ marginBottom: '0.5rem' }}>
        <div
          className={`progress-bar ${downloading ? 'progress-bar-striped progress-bar-animated' : ''}`}
          role="progressbar"
          aria-valuenow={progress}
          aria-valuemin="0"
          aria-valuemax="100"
          style={{ width: `${progress}%` }}
        />
      </div>
    )}
    <div className="d-flex justify-content-between">
      {!done ? (
        <Fragment>
          <button
            type="button"
            className="btn btn-light"
          >
            {downloading ? 'Pause' : 'Resume'}
          </button>
          <button
            type="button"
            className="btn btn-danger"
          >
            Cancel
          </button>
        </Fragment>
        ) : (
        <Fragment>
          <a className="btn btn-primary" href={`/#/offline/${id}`} role="button">Watch</a>
          <button type="button" className="btn btn-danger">Remove</button>
        </Fragment>
      )}
    </div>
  </li>
);

DownloadItem.propTypes = {
  title: PropTypes.string.isRequired,
  done: PropTypes.bool,
  progress: PropTypes.number,
  id: PropTypes.string.isRequired,
  downloading: PropTypes.bool,
};

DownloadItem.defaultProps = {
  done: false,
  progress: 100,
  downloading: false,
}

export default DownloadItem;
