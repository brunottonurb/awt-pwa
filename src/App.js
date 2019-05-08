import React, { useEffect, useState } from 'react';
import { HashRouter as Router, Route } from 'react-router-dom';
import './App.css';
import Nav from './components/Nav';
import MediaBrowser from './routes/MediaBrowser';
import DownloadManager from './routes/DownloadManager';
import MediaPlayer from './routes/MediaPlayer';

const routes = [
  {
    label: 'Media',
    key: 'media',
    path: '/media',
    exact: true,
    component: MediaBrowser,
  },
  {
    label: 'Downloads',
    key: 'downloads',
    path: '/downloads',
    exact: true,
    component: DownloadManager,
  },
];

const App = () => {
  const [isShakaSupported, setIsShakaSupported] = useState(true);
  const [isIndexedDbSupported, setIsIndexedDbSupported] = useState(true);

  useEffect(() => { // on app mount
    const shaka = window.shaka;
    shaka.polyfill.installAll(); // install shaka polyfills
    setIsShakaSupported(shaka.Player.isBrowserSupported()); // display warning if shaka not supported 
    const indexedDB = window.indexedDB || window.mozIndexedDB || window.webkitIndexedDB || window.msIndexedDB;
    setIsIndexedDbSupported(!!indexedDB); // display warning if indexedDB not supported
    if (!indexedDB) return;

    window.storage = new shaka.offline.Storage(); // initialize shaka storage
  }, []);

  return (
    <Router onUpdate={() => window.scrollTo(0, 0)}>
      <div className="App">
        <Nav routes={routes} />
        <main className="container">
          {!(isShakaSupported && isIndexedDbSupported) && (
            <div className={`alert ${!isIndexedDbSupported ? 'alert-danger' : 'alert-warning'}`} role="alert">
              <h4 className="alert-heading">Browser not supported!</h4>
              <hr />
              {!isShakaSupported && <p className="mb-0">Your Browser is not supported as it does not support the Shaka Player</p>}
              {!isIndexedDbSupported && <p className="mb-0">IndexedDB not supported! Offline viewing is disabled.</p>}
            </div>
          )}
          <Route
            component={() => <p>todo welcome</p>}
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
        </main>
      </div>
    </Router>
  );
}

export default App;
