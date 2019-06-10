import React, { useEffect, useContext, Fragment } from 'react';
import { HashRouter as Router, Route } from 'react-router-dom';
import 'bootstrap/dist/css/bootstrap.min.css';
import { Store } from './Store';
import LoadingScreen from './components/LoadingScreen';
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

const App = () => { 
  const { state: { isInit, isSupported }, dispatch } = useContext(Store);

  useEffect(() => {
    !isInit && dispatch({ type: 'INIT', dispatch });
  });

  if (!isInit) return <LoadingScreen />;

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
