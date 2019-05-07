import React from 'react';
import PropTypes from 'prop-types';

const StorageInfo = ({ max, current }) => (
  <div className="card" style={{ marginTop: '1rem' }}>
    <div className="card-body">
      You have {max}MB of accessible storage and currently use {current}MB.
      <div className="progress" style={{ height: '2rem' }}>
        <div className="progress-bar bg-info" role="progressbar" style={{ width: `${current/max*100}%` }} aria-valuenow={current} aria-valuemin="0" aria-valuemax={max}></div>
      </div>
    </div>
  </div>
);

StorageInfo.propTypes = {
  max: PropTypes.number.isRequired,
  current: PropTypes.number.isRequired,
};

export default StorageInfo;
