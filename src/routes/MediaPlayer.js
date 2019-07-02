import React, { useEffect, useRef, useContext } from 'react';
import { Store } from '../Store';
import { confirmAlert } from 'react-confirm-alert';
import 'react-confirm-alert/src/react-confirm-alert.css';
import Cookies from 'universal-cookie';

const cookies = new Cookies();
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

    const saveVideoPlaybackTime = () => {
      if (videoElement.currentTime !== 0) {
          cookies.set("videoPlaybackTime:"+ metadata.id,videoElement.currentTime);
       }
    };

    videoElement.addEventListener('pause', saveVideoPlaybackTime);
    videoElement.addEventListener('ended', saveVideoPlaybackTime);

    const playVideo = (playState) => {

      let playbackTime = cookies.get(`videoPlaybackTime:${metadata.id}`);
      if (!!playbackTime && parseInt(playbackTime) !== 0) {
          confirmAlert({
            title:'Resume Playback?',
            message: 'Would you like to resume this video where you left off?',
            buttons: [
              {
                label: 'Yes',
                onClick: () =>  fetchAndPlayVideo(playState, playbackTime)   
              },
              {
                label: 'No',
                //reset saved playbackTime to 0
                onClick: () => 
                {
                  cookies.set("videoPlaybackTime:"+ metadata.id,0);
                  playbackTime=0;
                  fetchAndPlayVideo(playState, playbackTime)  
                }             
              }
            ]
          });
      } else {
        fetchAndPlayVideo(playState, playbackTime);
      }
    }

    const fetchAndPlayVideo = (playState, playbackTime) => 
    {
      playState==='stream' ? player.load(metadata.manifestUri, playbackTime) : storage.list().then((list) => { 
        // get offlineUri from storage
        const offlineVideo = list.find(video => video.appMetadata.id === match.params.id);
        player.load(offlineVideo.offlineUri, playbackTime); 
    });
  }


    player.attach(videoElement);

    if (match.params.mode === 'stream') {
      playVideo('stream');
    } else { // mode === 'offline'
      playVideo('offline');
    }
    return () => {
      // detach player from element when component unmounts
      player.detach(videoElement);
      saveVideoPlaybackTime();
      videoElement.removeEventListener('pause', saveVideoPlaybackTime);
      videoElement.removeEventListener('ended', saveVideoPlaybackTime);
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
