import React, { Fragment } from 'react';
import MediaItem from '../components/MediaItem';

const MediaBrowser = () => (
  <Fragment>
    <div className="row">
      {[
        {
          title: 'Eyes Burning',
          tagline: 'No time for blinking.',
          onClickPlay: () => { },
          onClickDownload: () => { },
          imgSrc: 'test.png',
        },
        {
          title: 'Clever Title',
          tagline: 'Makes everybody laught',
          onClickPlay: () => { },
          onClickDownload: () => { },
          imgSrc: 'test.png',
        },
        {
          title: 'Texas Ricecracker Massacre',
          tagline: 'Lorem Ipsum dopoewjrofhoiewc hveoi em doeewc hoi',
          onClickPlay: () => { },
          onClickDownload: () => { },
          imgSrc: 'test.png',
        },
        {
          title: 'Mission Failed',
          tagline: 'All you had to do was follow the damn train!',
          onClickPlay: () => { },
          onClickDownload: () => { },
          imgSrc: 'test.png',
        },
      ].map((props, index) => <MediaItem {...props} key={`media_${index}_${props.title}`} />)}
    </div>
  </Fragment>
);

export default MediaBrowser;

// TODO pass the available movies as props
// should be array of objects
// with image url, title, tagline, functions?
