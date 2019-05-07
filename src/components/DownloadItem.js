import React, { Fragment } from 'react';
import PropTypes from 'prop-types';

const DownloadItem = ({
  title,
  progress,
  done,
  downloading,
  onClickPause,
  onClickCancel,
  onClickWatch,
  onClickDelete,
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
            onClick={downloading ? () => onClickPause(true) : () => onClickPause(false)}
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
          <button type="button" className="btn btn-primary">Watch</button>
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
  onClickPause: PropTypes.func.isRequired,
  onClickCancel: PropTypes.func.isRequired,
  onClickWatch: PropTypes.func.isRequired,
  onClickDelete: PropTypes.func.isRequired,
  downloading: PropTypes.bool,
};

DownloadItem.defaultProps = {
  done: false,
  progress: 100,
  downloading: false,
}

export default DownloadItem;
