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
  const [isInit, setIsInit] = useState(false);
  const [isShakaSupported, setIsShakaSupported] = useState(true);
  const [isIndexedDbSupported, setIsIndexedDbSupported] = useState(true);

  useEffect(() => { // on app mount
    const shaka = window.shaka;
    shaka.polyfill.installAll(); // install shaka polyfills
    setIsShakaSupported(shaka.Player.isBrowserSupported()); // display warning if shaka not supported 
    setIsIndexedDbSupported(shaka.offline.Storage.support()); // display warning if indexedDB not supported

    window.storage = new shaka.offline.Storage(); // initialize shaka storage
    const dispatchProgressEvent = (content, progress) => {
      // create custom event to track download progress
      // this will probably no longer be necessary in the next version of shaka
      const progressEvent = new CustomEvent('custom-progress', { detail: { progress, content } });
      window.dispatchEvent(progressEvent);
    }
    window.storage.configure({ // configure storage to emit progress events that we can subscribe to elsewhere
      progressCallback: dispatchProgressEvent,
    });

    setIsInit(true);
  }, []);

  if (!isInit) return <p>loading...</p>;

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
