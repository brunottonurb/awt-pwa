import React, { Fragment, useState, useEffect, useContext } from 'react';
import { Store } from '../Store';
import MediaItem from '../components/MediaItem';

const MediaBrowser = ({ history }) => {
  const { state } = useContext(Store);

  const { downloadInProgres, videos } = state;

  const downloadVideo = (videoId) => {
    if (!downloadInProgres) {
      const video = videos.find(v => v.id === videoId);
      window.storage.store(video.manifestUri, {
        downloaded: Date(),
        id: video.id,
        title: video.title,
      });
      history.push('/downloads');
    } else alert('Download already in Progress!');
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
            onClickDownload={() => downloadVideo(video.id)}
            allowDownload={!!isOnline}
          />
        ))}
      </div>
    </Fragment>
  );
};

export default MediaBrowser;
