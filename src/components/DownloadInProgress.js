import React, { Fragment, useEffect, useState } from 'react';

const DownloadInProgress = () => {
  const [downloadInProgress, setDownloadInProgress] = useState(null);

  useEffect(() => {
    window.addEventListener('custom-progress', setDownloadInProgress); // subscribe to progress events
    return () => { // clean up after yourself
      window.removeEventListener('custom-progress', setDownloadInProgress);
    };
  }, []);

  return (
    <Fragment>
      {downloadInProgress && (
        <li className="list-group-item">
          {downloadInProgress.detail.content.appMetadata.title}
          <br />
          <small>{downloadInProgress.detail.content.appMetadata.downloadedOn}</small>
          <hr />
          <div className="progress" style={{ marginBottom: '0.5rem' }}>
            <div
              className="progress-bar progress-bar-striped progress-bar-animated"
              role="progressbar"
              aria-valuenow={downloadInProgress.detail.progress * 100}
              aria-valuemin="0"
              aria-valuemax="100"
              style={{ width: `${downloadInProgress.detail.progress * 100}%` }}
            />
          </div>
        </li>
      )}
    </Fragment>
  );
};

export default DownloadInProgress;
