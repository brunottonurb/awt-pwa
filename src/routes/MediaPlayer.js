import React, { useEffect, useRef, useContext } from 'react';
import { Store } from '../Store';

const MediaPlayer = ({ match, history }) => {
  const videoEl = useRef(null); // reference to the <video> element

  const {
    state: {
      player,
      storage,
      videos,
    },
  } = useContext(Store);
  const metadata = videos.find((video => video.id === match.params.id)); // get id from URL, metadata from datastore

  useEffect(() => {
    // make linter happy
    const videoElement = videoEl.current;
    // attach player to video tag
    player.attach(videoElement);

    if (match.params.mode === 'stream') {
      player.load(metadata.manifestUri); // maybe I should catch errors here TODO
    } else { // mode === 'offline'
      // get offlineUri from storage
      storage.list().then((list) => {
        const offlineVideo = list.find(video => video.appMetadata.id === match.params.id);
        player.load(offlineVideo.offlineUri);
      });
    }
    return () => {
      // detach player from element when component unmounts
      player.detach(videoElement);
    };
  }, [match, metadata, player, storage]); // run this effect only when it is first mounted or these values change

  return (
    <div className="card bg-light">
      <div className="card-header">
        {metadata ? metadata.title : '404'}
        <button
          type="button"
          className="close"
          aria-label="Close"
          onClick={history.goBack}
        >
          <span aria-hidden="true">&times;</span>
        </button>
      </div>
      <div className="card-body">
        {metadata ? (
          <video
            ref={videoEl}
            style={{ width: '100%', maxHeight: '80vh' }}
            poster={metadata.poster}
            controls
            autoPlay
          />
        ) : 'Video not found.'}
      </div>
    </div>
  );
};

export default MediaPlayer;
