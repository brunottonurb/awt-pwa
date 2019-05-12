import React, { useEffect, useContext, Fragment } from 'react';
import { HashRouter as Router, Route } from 'react-router-dom';
import { Store } from './Store';
import Nav from './components/Nav';
import DownloadManager from './routes/DownloadManager';
import Home from './routes/Home';
import MediaBrowser from './routes/MediaBrowser';
import MediaPlayer from './routes/MediaPlayer';

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
];

const App = () => { 
  const { state, dispatch } = useContext(Store);

  const init = async () => {
    // fetch video data
    const data = await fetch('data/videos.json');
    const dataJSON = await data.json();

    // init shaka
    const shaka = window.shaka;
    shaka.polyfill.installAll();

    // initialize shaka storage
    window.storage = new shaka.offline.Storage();

    // make shaka dispatch progress events so that we can have a progress bar when downloading
    // this will probably no longer be necessary in the next version of shaka
    const progressCallback = (content, progress) => window.dispatchEvent(new CustomEvent("storage-progress", { detail: { content, progress }}));
    window.storage.configure({ progressCallback });   

    // store indexedDB index in store
    const dbIndex = await window.storage.list();
    dispatch({
      type: 'UPDATE_DB_INDEX',
      dbIndex,
    });

    // start app
    return dispatch({
      type: 'INIT_DONE',
      videos: dataJSON,
      isInit: true,
      isSupported: shaka.Player.isBrowserSupported() && shaka.offline.Storage.support(),
    });
  };

  useEffect(() => {
    !state.isInit && init();
  });

  const { isInit, isSupported } = state;

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
            </Fragment>
          )}
        </main>
      </div>
    </Router>
  );
}

export default App;
