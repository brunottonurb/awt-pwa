import React, { Fragment, useEffect, useState, useContext } from 'react';
import { Store } from '../Store';
import StorageInfo from '../components/StorageInfo';
import DownloadItem from '../components/DownloadItem';
import DownloadInProgress from '../components/DownloadInProgress';

const DownloadManager = () => {
  const [downloadList, setDownloadList] = useState([]);
  const { state } = useContext(Store);
  const { isDownloadInProgress } = state;
  
  useEffect(() => {
    window.storage.list().then(setDownloadList); // get finished downloads
  }, []);

  const removeMedia = async (offlineUri) => {
    await window.storage.remove(offlineUri);
    window.storage.list().then(setDownloadList);
  };

  return (
    <Fragment>
      <ul className="list-group">
        {isDownloadInProgress && <DownloadInProgress />}
        {downloadList.map(({ appMetadata, offlineUri }, index) => ( // last one first
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
