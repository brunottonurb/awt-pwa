import React, { useEffect, useRef } from 'react';

const manifestUri = 'https://storage.googleapis.com/shaka-demo-assets/angel-one/dash.mpd';

const MediaPlayer = ({ match, history }) => {
  const videoEl = useRef(null);

  useEffect(() => {
    const player = new window.shaka.Player(videoEl.current);

    const onError = (error) => {
      console.error('Error code', error.code, 'object', error);
    }

    player.addEventListener('error', ({ detail }) => onError(detail));
    player.load(manifestUri).catch(onError);
}, []);

  return (
    <div className="card bg-light">
      <div className="card-header">
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
        video id: {match.params.id}
        <video
          ref={videoEl}
          width="100%"
          poster="//shaka-player-demo.appspot.com/assets/poster.jpg"
          controls
          autoPlay
        />
      </div>
    </div>
  );
};

export default MediaPlayer;
