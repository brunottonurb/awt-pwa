import React, { useEffect, useState, useRef } from 'react';
import PropTypes from 'prop-types';
import { NavLink } from 'react-router-dom';

const MediaItem = ({
  id,
  onClickDownload,
  poster,
  tagline,
  title,
}) => {
  const node = useRef();
  const [isDownloadOptionsOpen, setIsDownloadOptionsOpen] = useState(false);
  const handleClickOutside = e => {
    if (node.current.contains(e.target)) {
      return;
    }
    setIsDownloadOptionsOpen(false);
  };
  useEffect(() => {
    if (isDownloadOptionsOpen) {
      document.addEventListener("mousedown", handleClickOutside);
    } else {
      document.removeEventListener("mousedown", handleClickOutside);
    }

    return () => {
      document.removeEventListener("mousedown", handleClickOutside);
    };
  }, [isDownloadOptionsOpen]);

  return(
    <div className="col-md-6" style={{ marginBottom: '1rem' }}>
      <div className="card bg-dark text-white" style={{ background: 'black' }}>
        <img
          alt={`image_${title}`}
          className="card-img-top"
          src={poster}
          style={{ minHeight: '10rem', opacity: '0.4', borderRadius: '.25rem' }}
        />
        <div className="card-img-overlay d-flex justify-content-between flex-column">
          <h5 className="card-title">{title}</h5>
          <p className="card-text">{tagline}</p>
          <div className="d-flex justify-content-between">
            <div className="btn-group" role="group">
              <button
                className="btn btn-secondary"
                onClick={onClickDownload}
                type="button"
                title="Download with default configuration"
              >
                Download
              </button>
              <button
                aria-expanded="false"
                aria-haspopup="true"
                className="btn btn-secondary dropdown-toggle dropdown-toggle-split"
                data-toggle="dropdown"
                id={`dropdown_download_options-${id}`}
                onClick={() => setIsDownloadOptionsOpen(true)}
                type="button"
                title="Download with custom configuration"
              >
                <span className="sr-only">Toggle Download Options Dropdown</span>
              </button>
              <div
                aria-labelledby={`dropdown_download_options-${id}`}
                className={`dropdown-menu dropdown-menu-right"${isDownloadOptionsOpen ? ' show' : ''}`}
                ref={node}
              >
                <form className="px-4">
                  <div className="form-group row">
                    <label className="col-form-label col-form-label-sm" htmlFor={`dropdown_download_options-${id}-language`}>Example label</label>
                    <select
                      className="custom-select custom-select-sm"
                      defaultValue="0"
                      id={`dropdown_download_options-${id}-language`}
                    >
                      <option value="0">Default</option>
                      <option value="1">TODO</option>
                      <option value="2">get</option>
                      <option value="3">options</option>
                    </select>
                  </div>
                  <div className="form-group row">
                    <label className="col-form-label col-form-label-sm" htmlFor={`dropdown_download_options-${id}-subtitles`}>Example label</label>
                    <select
                      className="custom-select custom-select-sm"
                      defaultValue="0"
                      id={`dropdown_download_options-${id}-subtitles`}
                    >
                      <option value="0">Default</option>
                      <option value="1">TODO</option>
                      <option value="2">get</option>
                      <option value="3">options</option>
                    </select>
                  </div>
                  <div className="form-group row">
                    <label className="col-form-label col-form-label-sm" htmlFor={`dropdown_download_options-${id}-quality`}>Example label</label>
                    <select
                      className="custom-select custom-select-sm"
                      defaultValue="0"
                      id={`dropdown_download_options-${id}-quality`}
                    >
                      <option value="0">Default</option>
                      <option value="1">TODO</option>
                      <option value="2">GET</option>
                      <option value="3">options</option>
                    </select>
                  </div>
                  <button
                    className="btn btn-secondary btn-sm"
                    onClick={onClickDownload /* TODO pass params */}
                    type="button"
                  >
                    Download
                  </button>
                </form>
                <div className="dropdown-divider" />
                <NavLink
                  className="dropdown-item"
                  exact
                  to="/configuration"
                >Change Defaults</NavLink>
              </div>
            </div>
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
  );
};

MediaItem.propTypes = {
  id: PropTypes.string.isRequired,
  onClickDownload: PropTypes.func.isRequired,
  poster: PropTypes.string.isRequired,
  tagline: PropTypes.string.isRequired,
  title: PropTypes.string.isRequired,
};

export default MediaItem;
