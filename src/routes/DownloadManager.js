import React, {
  Fragment,
  useContext,
  useEffect,
  useRef,
  useState,
} from 'react';
import { Store } from '../Store';
import StorageInfo from '../components/StorageInfo';
import DownloadItem from '../components/DownloadItem';
import DownloadInProgress from '../components/DownloadInProgress';

const debounce = (func, wait, immediate) => {
	let timeout;
	return function() {
		const context = this, args = arguments;
		const later = function() {
			timeout = null;
			if (!immediate) func.apply(context, args);
		};
		const callNow = immediate && !timeout;
		clearTimeout(timeout);
		timeout = setTimeout(later, wait);
		if (callNow) func.apply(context, args);
	};
};

const DownloadManager = () => {
  const { state: { dbIndex, storage }, dispatch } = useContext(Store);
  const [{ content, progress }, setDownloadInProgress] = useState({ content: null, progress: 0 });

  useEffect(() => {
    if (!storage) return;
    const updateList = async () => {
      const newDbIndex = await storage.list();
      dispatch({ type: 'UPDATE_DB_INDEX', payload: { dbIndex: newDbIndex } });
    };
    updateList();
  }, [dispatch, storage]);
  
  const handleProgressEvent = event => {
    setDownloadInProgress(event.detail);
  };
  
  useEffect(() => {
    window.addEventListener('storage-progress', handleProgressEvent);
    return () => { // clean up when unmounting
      window.removeEventListener('storage-progress', handleProgressEvent);
    };
  }, []);

  const removeMedia = async (offlineUri) => {
    // TODO deleting while a download is in progress messes up the progress bar. thanks shaka
    await storage.remove(offlineUri);
    const newDbIndex = await storage.list();
    dispatch({ type: 'UPDATE_DB_INDEX', payload: { dbIndex: newDbIndex } });
  };
  
  const debounced = useRef(debounce(async () => {
    // todo this can happen even if the component is not mounted
    // this should reload the list of downloads after the progress updates have ceased
    setDownloadInProgress({
      content: null,
      progress: 0,
    });
    const newDbIndex = await storage.list();
    dispatch({ type: 'UPDATE_DB_INDEX', payload: { dbIndex: newDbIndex } });
  }, 1000));

  useEffect(() => {
    content && debounced.current();
  });

  return (
    <Fragment>
      <ul className="list-group">
        {content &&
          <DownloadInProgress title={content.appMetadata.title} progress={progress} dateStarted={content.appMetadata.downloaded} />}
        {dbIndex.reverse().map(({ appMetadata, offlineUri, tracks }, index) => {
          const mainTrack = tracks.find(track => track.type === 'variant');
          const subTrack = tracks.find(track => track.type === 'text');

          return (
            <DownloadItem
              title={appMetadata.title}
              key={`download_${index}_${appMetadata.title}`}
              done
              id={appMetadata.id}
              removeMedia={() => removeMedia(offlineUri)}
              downloadedOn={appMetadata.downloaded}
              language={mainTrack.language}
              subtitles={subTrack ? subTrack.language : 'None'}
              quality={mainTrack.height}
            />
          )})}
      </ul>
      <StorageInfo max={2000} current={500} />
    </Fragment>
  );
};

export default DownloadManager;
