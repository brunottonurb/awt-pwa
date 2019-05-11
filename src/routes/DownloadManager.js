import React, { Fragment, useEffect, useContext, useRef } from 'react';
import debounce from 'lodash/debounce';
import { Store } from '../Store';
import StorageInfo from '../components/StorageInfo';
import DownloadItem from '../components/DownloadItem';
import DownloadInProgress from '../components/DownloadInProgress';

const DownloadManager = () => {
  const { state, dispatch } = useContext(Store);
  const { dbIndex } = state;

  const updateList = async () => {
    const newDbIndex = await window.storage.list();
    dispatch({ type: 'UPDATE_DB_INDEX', dbIndex: newDbIndex });
  };

  useEffect(() => {
    updateList();
  }, []);

  const removeMedia = async (offlineUri) => {
    await window.storage.remove(offlineUri);
    await updateList();
  };

  const inProgress = window.storage.getStoreInProgress();

  const debounced = useRef(debounce(updateList, 1000));
  useEffect(() => { 
    inProgress && debounced.current();
  });
    
  return (
    <Fragment>
      <ul className="list-group">
        {inProgress && <DownloadInProgress />}
        {dbIndex.map(({ appMetadata, offlineUri }, index) => ( // todo reorder with css
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
