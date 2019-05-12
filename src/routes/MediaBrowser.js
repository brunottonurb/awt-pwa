import React, { Fragment, useContext } from 'react';
import { Store } from '../Store';
import MediaItem from '../components/MediaItem';

const MediaBrowser = ({ history }) => {
  const { state } = useContext(Store);

  const { videos, dbIndex } = state;

  const downloadVideo = (videoId) => {
    if (!window.storage.getStoreInProgress()) { // only one download at a time with shaka
      if (dbIndex.find(v => v.appMetadata.id === videoId)) { // check if already in storage
        if (!window.confirm('Are you sure you want download this again?')) {
          return;
        }
      }
      const video = videos.find(v => v.id === videoId);
      window.storage.store(video.manifestUri, {
        downloaded: Date(),
        id: video.id,
        title: video.title,
      });
      history.push('/downloads');
    } else alert('Download already in Progress!');
  };

  return (
    <Fragment>
      {/* <form className="form-inline" style={{ paddingBottom: '1rem' }}>
        <input className="form-control" type="text" placeholder="Search" />
        <div className="form-check form-check-inline">
          <input className="form-check-input" type="checkbox" value="" id="defaultCheck1" />
          <label className="form-check-label" htmlFor="defaultCheck1">
            Show downloaded only
          </label>
        </div>
      </form> */}
      <div className="row">
        {videos.map((video, index) => (
          <MediaItem
            {...video}
            key={`media_${index}_${video.title}`}
            onClickDownload={() => downloadVideo(video.id)}
          />
        ))}
      </div>
    </Fragment>
  );
};

export default MediaBrowser;
