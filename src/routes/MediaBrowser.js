import React, { Fragment } from 'react';
import MediaItem from '../components/MediaItem';
import videos from '../data/videos';

const downloadMedia = (video) => { // function is called when download is clicked
  window.storage.store(video.manifestUri, {
    title: video.title,
    downloaded: Date(),
    id: video.id,
  }); // start downloading
} 

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
        {videos.map((video, index) => (
          <MediaItem
            {...video}
            key={`media_${index}_${video.title}`}
            onClickDownload={() => downloadMedia(video)}
          />
        ))}
      </div>
    </Fragment>
  );
};

export default MediaBrowser;
