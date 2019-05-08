import React, { Fragment, useEffect, useState } from 'react';
import StorageInfo from '../components/StorageInfo';
import DownloadItem from '../components/DownloadItem';

const DownloadManager = () => {
  const [downloadList, setDownloadList] = useState([]);

  useEffect(() => {
    if (window.storage) window.storage.list().then((list) => {
      console.log(list)
      setDownloadList(list);
    });
  }, []);

  return (
    <Fragment>
      <ul className="list-group">
        {downloadList.map(({ appMetadata }, index) => (
          <DownloadItem
            title={appMetadata.title}
            key={`download_${index}_${appMetadata.title}`}
            done
            id={appMetadata.id}
          />
        ))}
      </ul>
      <StorageInfo max={2000} current={500} />
    </Fragment>
  );
};

export default DownloadManager;

// TODO pass the available movies as props
// should be array of objects
// with image url, title, tagline, functions?
