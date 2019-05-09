import React, { Fragment, useState, useEffect } from 'react';
import MediaItem from '../components/MediaItem';
import videos from '../data/videos';

const downloadMedia = (video) => { // function is called when download is clicked
  if (!window.storage.getStoreInProgress()) {
    window.storage.store(video.manifestUri, {
      title: video.title,
      downloaded: Date(),
      id: video.id,
    }); // start downloading
  } else { alert('Download already in Progress!'); }
} 

const MediaBrowser = ({ history }) => {
  const onClickDownload = (video) => {
    downloadMedia(video);
    history.push('/downloads');
  };

  const [isOnline, setIsOnline] = useState(window.navigator.onLine);

  const setIsOnlineTrue = () => setIsOnline(true);
  const setIsOnlineFalse = () => setIsOnline(false);

  useEffect(() => { // listen to online status
    window.addEventListener('online', setIsOnlineTrue);
    window.addEventListener('offline', setIsOnlineFalse);
    return () => { // clean up on component unmount
      window.removeEventListener("online", setIsOnlineTrue);
      window.removeEventListener('offline', setIsOnlineFalse);
    };
  },[]);

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
            onClickDownload={() => onClickDownload(video)}
            allowDownload={!!isOnline}
          />
        ))}
      </div>
    </Fragment>
  );
};

export default MediaBrowser;
