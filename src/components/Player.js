import React from 'react';
import PropTypes from 'prop-types';

const Player = ({
  videoUrl,
}) => (
  <div className="card" style="margin-top: 0.5rem;">
    <div className="card-header">
      <button type="button" className="close" aria-label="Close">
        <span aria-hidden="true">×</span>
      </button>
    </div>
    <div className="card-body">
      <video id="video" style={{ width: '100%', maxHeight: '80vh' }} poster="//shaka-player-demo.appspot.com/assets/poster.jpg" controls />
    </div>
  </div>
);

Player.propTypes = {
  videoUrl: PropTypes.string.isRequired,
};

export const Player;
