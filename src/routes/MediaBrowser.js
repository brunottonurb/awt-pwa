import React, { Fragment } from 'react';
import MediaItem from '../components/MediaItem';

const MediaBrowser = () => (
  <Fragment>
    <div className="row">
      {[
        {
          title: 'Gugugu',
          tagline: 'Gagaga',
          id: '001',
          imgSrc: 'test.png',
        },
        {
          title: 'Clever Title',
          tagline: 'Makes everybody laught',
          id: '002',
          imgSrc: 'test.png',
        },
        {
          title: 'Texas Ricecracker Massacre',
          tagline: 'Lorem Ipsum dopoewjrofhoiewc hveoi em doeewc hoi',
          id: '003',
          imgSrc: 'test.png',
        },
        {
          title: 'Mission Failed',
          tagline: 'All you had to do was follow the damn train!',
          id: '004',
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
