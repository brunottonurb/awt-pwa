import React, { Fragment } from 'react';
import MediaItem from '../components/MediaItem';
import videos from '../data/videos';

const MediaBrowser = () => {
  return (
    <Fragment>
      <form className="form-inline" style={{ paddingBottom: '1rem' }}>
        <input className="form-control" type="text" placeholder="Search" />
        <div className="form-check form-check-inline">
          <input className="form-check-input" type="checkbox" value="" id="defaultCheck1" />
          <label className="form-check-label" htmlFor="defaultCheck1">
            Show downloaded only
          </label>
        </div>
      </form>
      <div className="row">
        {videos.map((props, index) => <MediaItem {...props} key={`media_${index}_${props.title}`} />)}
      </div>
    </Fragment>
  );
};

export default MediaBrowser;
