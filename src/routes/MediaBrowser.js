import React, { Fragment, useContext, useState } from 'react';
import { Store } from '../Store';
import MediaItem from '../components/MediaItem';

const MediaBrowser = ({ history }) => {
  const {
    state: {
      dbIndex,
      storage,
      videos,
    },
   } = useContext(Store);
  const [searchTerm, setSearchTerm] = useState('');

  const downloadVideo = (videoId) => {
    if (!storage.getStoreInProgress()) { // only one download at a time with shaka
      if (dbIndex.find(v => v.appMetadata.id === videoId)) { // check if already in storage
        if (!window.confirm('Are you sure you want download this again?')) {
          return;
        }
      }
      const video = videos.find(v => v.id === videoId);
      storage.store(video.manifestUri, {
        downloaded: Date(),
        id: video.id,
        title: video.title,
      });
      history.push('/downloads');
    } else alert('Download already in Progress!');
  };

  return (
    <Fragment>
      <form className="input-group" style={{ paddingBottom: '1rem' }}>
        <input
          className="form-control"
          type="text"
          placeholder="Search"
          onChange={e => setSearchTerm(e.target.value)}
          value={searchTerm}
        />
        {searchTerm && <div className="input-group-append">
          <button
            className="btn btn-outline-secondary"
            onClick={() => setSearchTerm('')}
          >
            Clear
          </button>
        </div>}
      </form>
      <div className="row">
        {videos.filter(video => video.title.includes(searchTerm)).map((video, index) => (
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
