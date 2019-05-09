import React, { Fragment, useEffect, useState } from 'react';
import StorageInfo from '../components/StorageInfo';
import DownloadItem from '../components/DownloadItem';
import DownloadInProgress from '../components/DownloadInProgress';

const DownloadManager = () => {
  const [downloadList, setDownloadList] = useState([]);
  const [shouldRenderProgress, setShouldRenderProgress] = useState(false);

  useEffect(() => {
    window.storage.list().then(setDownloadList); // get finished downloads
    const updateInterval = setInterval(() => { // check for ongoing downloads every second because shaka is missing lots of functionality
      const isDownloadInProgress = window.storage.getStoreInProgress();
      if (shouldRenderProgress !== isDownloadInProgress) {
        window.storage.list().then(setDownloadList); // update downloads
        setShouldRenderProgress(isDownloadInProgress);
      }
    }, 1000);
    return () => {
      clearInterval(updateInterval);
    };
  }, [shouldRenderProgress]);

  const removeMedia = async (offlineUri) => {
    await window.storage.remove(offlineUri);
    window.storage.list().then(setDownloadList);
  } 

  return (
    <Fragment>
      <ul className="list-group">
        {shouldRenderProgress && <DownloadInProgress />}
        {downloadList.reverse().map(({ appMetadata, offlineUri }, index) => ( // last one first
          <DownloadItem
            title={appMetadata.title}
            key={`download_${index}_${appMetadata.title}`}
            done
            id={appMetadata.id}
            removeMedia={() => removeMedia(offlineUri)}
            downloadedOn={appMetadata.downloaded}
          />
        ))}
      </ul>
      <StorageInfo max={2000} current={500} />
    </Fragment>
  );
};

export default DownloadManager;
