import React from 'react';

function SkeletonLoader() {
  return (
    <div className="skeleton-loader">
      <div className="skeleton-image"></div>
      <div className="skeleton-title"></div>
      <div className="skeleton-price"></div>
    </div>
  );
}

export default SkeletonLoader;
