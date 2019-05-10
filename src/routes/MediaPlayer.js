import React, { useEffect, useRef, useContext } from 'react';
import { Store } from '../Store';

const MediaPlayer = ({ match, history }) => {
  const videoEl = useRef(null); // reference to the <video> element

  const { state } = useContext(Store);
  const { videos } = state;
  const metadata = videos.find((video => video.id === match.params.id)); // get id from URL, metadata from datastore

  useEffect(() => {
    const player = new window.shaka.Player(videoEl.current); // initialize player on component mount

    const onError = (error) => { // log errors
      console.error('Error code', error.code, 'object', error);
    }

    player.addEventListener('error', ({ detail }) => onError(detail));
    if (match.params.mode === 'stream') {
      player.load(metadata.manifestUri).catch(onError);
    } else { // mode === 'offline'
      // get offlineUri from storage
      window.storage.list().then((list) => {
        const offlineVideo = list.find(video => video.appMetadata.id === match.params.id);
        player.load(offlineVideo.offlineUri); // start playing from storage
      });
    }
    return () => player.destroy(); // clean up when the component is unmounted.
  }, [match,metadata]); // run this effect only when it is first mounted or these values change

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
