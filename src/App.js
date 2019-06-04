import React, { useEffect, useContext, Fragment } from 'react';
import { HashRouter as Router, Route } from 'react-router-dom';
import 'bootstrap/dist/css/bootstrap.min.css';
import shaka from 'shaka-player';
import { Store } from './Store';
import Nav from './components/Nav';
import DownloadManager from './routes/DownloadManager';
import Home from './routes/Home';
import MediaBrowser from './routes/MediaBrowser';
import MediaPlayer from './routes/MediaPlayer';
import Configuration from './routes/Configuration';

const routes = [
  {
    exact: true,
    key: 'media',
    label: 'Media',
    path: '/media',
  },
  {
    exact: true,
    key: 'downloads',
    label: 'Downloads',
    path: '/downloads',
  },
  {
    exact: true,
    key: 'configuration',
    label: 'Configuration',
    path: '/configuration',
  },
];

//default values
 var userPreferredAudioLanguage = 'en-US';
 var userPreferredTextLanguage = 'en-US';

const App = () => { 
  const { state, dispatch } = useContext(Store);
  const { isInit, isSupported } = state;

  const init = async () => {
    // init shaka
    shaka.polyfill.installAll();

    const isShakaPlayerSupported = shaka.Player.isBrowserSupported();
    const isShakaStorageSupported = shaka.offline.Storage.support();

    if (isShakaPlayerSupported && isShakaStorageSupported) {
      // initialize shaka player, not attached to video element for now
      window.player = new shaka.Player();

      // initialize shaka storage
      window.storage = new shaka.offline.Storage();

      // log errors
      const onError = (error) => {
        console.error('Error code', error.code, 'object', error);
      };
      window.player.addEventListener('error', ({ detail }) => onError(detail));

      // make shaka dispatch progress events so that we can have a progress bar when downloading
      const progressCallback = (content, progress) => window.dispatchEvent(new CustomEvent("storage-progress", { detail: { content, progress }}));
      window.player.configure({
        offline: { progressCallback },
        preferredAudioLanguage: userPreferredAudioLanguage,
        preferredTextLanguage: userPreferredTextLanguage,
      });
      // configuring offline directly is deprecated
      // but passing the progressCallback as a player configuration does not work
      window.storage.configure({ progressCallback });

      // get available videos from server
      // and check offline storage (IndexedDB)
      // simultaneously (both are async)
      const [videos, dbIndex] = await Promise.all([
        fetch('data/videos.json').then(response => response.json()),
        window.storage.list(),
      ]);

      // start app
      return dispatch({
        type: 'INIT_DONE',
        videos,
        isInit: true,
        isSupported: isShakaPlayerSupported && isShakaStorageSupported,
        dbIndex,
      });
    }

    // not supported
    return dispatch({
      type: 'INIT_DONE',
      videos: [],
      isInit: true,
      isSupported: false,
      dbIndex: [],
    });
  };

  useEffect(() => {
    !state.isInit && init();
  });


  if (!isInit) return <p>loading...</p>;

  return (
    <Router onUpdate={() => window.scrollTo(0, 0)}>
      <div className="App">
        <Nav routes={routes} />
        <main className="container" style={{ paddingTop: '4.5rem' }}>
          {!isSupported ? (
            <div className="alert alert-danger" role="alert">
              <h4 className="alert-heading">Browser not supported!</h4>
              <hr />
              Unfortunately your browser does not support all required technologies.
            </div>
          ) : (
            <Fragment>
              <Route
                component={Home}
                exact
                path="/"
              />
              <Route
                component={MediaBrowser}
                exact
                path="/media"
              />
              <Route
                component={DownloadManager}
                exact
                path="/downloads"
              />
              <Route
                component={MediaPlayer}
                exact
                path="/:mode(stream|offline)/:id"
              />
              <Route
                component={Configuration}
                exact
                path="/configuration"
              />
            </Fragment>
          )}
        </main>
      </div>
    </Router>
  );
}

export default App;
