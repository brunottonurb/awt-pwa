import React, {
  Fragment,
  useContext,
  useEffect,
  useRef,
  useState,
} from 'react';
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

  const [downloadInProgress, setDownloadInProgress] = useState({ content: null, progress: 0 });

  const handleEvent = event => {
    setDownloadInProgress(event.detail);
  };
  useEffect(() => {
    window.addEventListener('storage-progress', handleEvent);
    return () => { // clean up when unmounting
      window.removeEventListener('storage-progress', handleEvent);
    };
  }, []);

  const { content, progress } = downloadInProgress;
  const debounced = useRef(debounce(() => {
    // todo this can happen even if the component is not mounted
    // that is bad apparently
    setDownloadInProgress({
      content: null,
      progress: 0,
    });
    updateList();
  }, 1000));
  useEffect(() => { 
    content && debounced.current();
  });

  return (
    <Fragment>
      <ul className="list-group">
        {content &&
          <DownloadInProgress title={content.appMetadata.title} progress={progress} dateStarted={content.appMetadata.downloaded} />}
        {dbIndex.reverse().map(({ appMetadata, offlineUri }, index) => (
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
