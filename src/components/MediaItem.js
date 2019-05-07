import React from 'react';
import PropTypes from 'prop-types';

const MediaItem = ({
  title,
  tagline,
  onClickPlay,
  onClickDownload,
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
            <button type="button" className="btn btn-secondary" onClick={onClickDownload}>Download</button>
            <button type="button" className="btn btn-primary" onClick={onClickPlay}>Watch now!</button>
          </div>
        </div>
      </div>
    </div>
  </div>
);

MediaItem.propTypes = {
  title: PropTypes.string.isRequired,
  tagline: PropTypes.string.isRequired,
  onClickDownload: PropTypes.func.isRequired,
  onClickPlay: PropTypes.func.isRequired,
  imgSrc: PropTypes.string.isRequired,
};

export default MediaItem;
