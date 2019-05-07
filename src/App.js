import React, { useEffect, useState } from 'react';
import { HashRouter as Router, Route } from 'react-router-dom';
import './App.css';
import Nav from './components/Nav';
import MediaBrowser from './routes/MediaBrowser';
import DownloadManager from './routes/DownloadManager';

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

  useEffect(() => {
    const shaka = window.shaka;
    shaka.polyfill.installAll();
    setIsShakaSupported(shaka.Player.isBrowserSupported());
    const indexedDB = window.indexedDB || window.mozIndexedDB || window.webkitIndexedDB || window.msIndexedDB;
    setIsIndexedDbSupported(!!indexedDB);
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
            component={() => <p>testing player</p>}
            exact
            path="/stream/:id"
          />
        </main>
      </div>
    </Router>
  );
}

export default App;
