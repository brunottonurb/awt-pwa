import React, { Fragment } from 'react';
import StorageInfo from '../components/StorageInfo';
import DownloadItem from '../components/DownloadItem';

const DownloadManager = () => (
  <Fragment>
    <ul className="list-group" style={{ marginTop: '1rem' }}>
      {[
        {
          title: 'Rickey Rat',
          progress: 27,
          done: false,
          downloading: true,
          onClickPause: () => { },
          onClickCancel: () => { },
          onClickWatch: () => { },
          onClickDelete: () => { },
        },
        {
          title: 'El Duderino',
          progress: 80,
          done: false,
          downloading: false,
          onClickPause: () => { },
          onClickCancel: () => { },
          onClickWatch: () => { },
          onClickDelete: () => { },
        },
        {
          title: 'More Coffee Please',
          done: true,
          onClickPause: () => { },
          onClickCancel: () => { },
          onClickWatch: () => { },
          onClickDelete: () => { },
        },
        {
          title: 'Ciao Ragazza',
          done: true,
          onClickPause: () => { },
          onClickCancel: () => { },
          onClickWatch: () => { },
          onClickDelete: () => { },
        }
      ].map((props, index) => <DownloadItem {...props} key={`download_${index}_${props.title}`} />)}
    </ul>
    <StorageInfo max={2000} current={500} />
  </Fragment>
);

export default DownloadManager;

// TODO pass the available movies as props
// should be array of objects
// with image url, title, tagline, functions?
