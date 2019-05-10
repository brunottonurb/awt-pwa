import React, { Fragment, useContext } from 'react';
import { Store } from '../Store';

const DownloadInProgress = () => {
  const { state } = useContext(Store);
  const { downloadInProgress } = state;

  return (
    <Fragment>
      {downloadInProgress.content && (
        <li className="list-group-item">
          {downloadInProgress.content.appMetadata.title}
          <br />
          <small>{downloadInProgress.content.appMetadata.downloadedOn}</small>
          <hr />
          <div className="progress" style={{ marginBottom: '0.5rem' }}>
            <div
              className="progress-bar progress-bar-striped progress-bar-animated"
              role="progressbar"
              aria-valuenow={downloadInProgress.progress * 100}
              aria-valuemin="0"
              aria-valuemax="100"
              style={{ width: `${downloadInProgress.progress * 100}%` }}
            />
          </div>
        </li>
      )}
    </Fragment>
  );
};

export default DownloadInProgress;
