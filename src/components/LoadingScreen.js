import React from 'react';

const LoadingScreen = () => (
  <div className="container" style={{ height: '100vh' }}>
    <div className="row h-100 justify-content-center align-items-center">
      <div className="spinner-grow" role="status">
        <span className="sr-only">Loading...</span>
      </div>
    </div>
  </div>
);

export default LoadingScreen;
