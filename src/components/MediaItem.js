import React from 'react';
import PropTypes from 'prop-types';

const MediaItem = ({
  title,
  tagline,
  id,
  imgSrc,
}) => (
  <div className="col-md-6" style={{ marginBottom: '1rem' }}>
    <div className="card bg-dark text-white">
      <img className="card-img-top" src={imgSrc} alt={`image_${title}`} />
      <div className="card-img-overlay d-flex justify-content-between flex-column">
        <h5 className="card-title">{title}</h5>
        <p className="card-text">{tagline}</p>
        <div className="text-right">
          <div className="btn-group" role="group" aria-label="Basic example">
            <a className="btn btn-secondary" href={`/#/download/${id}`} role="button">Download</a>
            <a className="btn btn-primary" href={`/#/stream/${id}`} role="button">Watch now!</a>
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
  imgSrc: PropTypes.string.isRequired,
};

export default MediaItem;
