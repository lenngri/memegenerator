import React from 'react';
import NavBar from '../NavBar';
import InfiniteScroller from '../InfiniteScroll';

const OverViewScreen = () => {
  return (
    <div
      style={{
        overflow: 'hidden',
      }}
    >
      <NavBar />
      <InfiniteScroller></InfiniteScroller>
    </div>
  );
};

export default OverViewScreen;
