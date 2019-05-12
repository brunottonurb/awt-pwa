import React from 'react';
import PropTypes from 'prop-types';
import { NavLink } from 'react-router-dom';

const MediaItem = ({
  id,
  onClickDownload,
  poster,
  tagline,
  title,
}) => (
  <div className="col-md-6" style={{ marginBottom: '1rem' }}>
    <div className="card bg-dark text-white" style={{ background: 'black' }}>
      <img
        className="card-img-top"
        src={poster}
        alt={`image_${title}`}
        style={{ minHeight: '10rem', opacity: '0.4', borderRadius: '.25rem' }}
      />
      <div className="card-img-overlay d-flex justify-content-between flex-column">
        <h5 className="card-title">{title}</h5>
        <p className="card-text">{tagline}</p>
        <div className="text-right">
          <div className="btn-group" role="group">
            <button
              className="btn btn-secondary"
              onClick={onClickDownload}
              type="button"
            >
              Download
            </button>
            <NavLink
              className="btn btn-primary"
              exact
              role="button"
              to={`/stream/${id}`}
            >Watch now!</NavLink>
          </div>
        </div>
      </div>
    </div>
  </div>
);

MediaItem.propTypes = {
  title: PropTypes.string.isRequired,
  tagline: PropTypes.string.isRequired,
  id: PropTypes.string.isRequired,
  poster: PropTypes.string.isRequired,
  onClickDownload: PropTypes.func.isRequired,
};

export default MediaItem;
