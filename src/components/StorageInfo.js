import React, { useEffect, useState } from 'react';

const getStorageEstimate = async () => {
  return navigator.storage.estimate().then(({ quota, usage }) => ({ quota: Math.round(quota/1000000), usage: Math.round(usage/1000000) }));
}

const StorageInfo = () => {
  const [storageInfo, setStorageInfo] = useState({ usage: 0, quota: 100 })

  useEffect(() => {
    // AFAIK it's impossible to listen to 'storage' events on the same page.
    // These events are only fire if changes are made to indexedDB in another tab,
    // so I just added an interval to check the storage estimate every x seconds.
    if ('storage' in navigator && 'estimate' in navigator.storage) {
      const storageEstimateInterval = setInterval(() => {
        getStorageEstimate().then(setStorageInfo);
      }, 5000);
      getStorageEstimate().then(setStorageInfo);
      return () => clearInterval(storageEstimateInterval);
    }
  }, []);

  return (
    <div className="card" style={{ marginTop: '1rem' }}>
      <div className="card-body">
        You have {storageInfo.quota}MB of accessible storage and currently use {storageInfo.usage}MB.
        <div className="progress" style={{ height: '2rem' }}>
          <div className="progress-bar bg-info" role="progressbar" style={{ width: `${storageInfo.usage/storageInfo.quota*100}%` }} aria-valuenow={storageInfo.usage} aria-valuemin="0" aria-valuemax={storageInfo.quota}></div>
        </div>
      </div>
    </div>
  );
};

export default StorageInfo;
