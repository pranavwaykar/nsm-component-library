import React from 'react';
import './PageNotFound.scss';

const PageNotFound = ({ noContent = false, onPrimary = () => {} }) => {
  return (
    <div className="page-not-found-comp">
      <div className="pnfc-asset">
        {/* <div className="pnfc-asset-svg" aria-hidden="true" /> */}
      </div>
      {!noContent && (
        <>
          <div className="pnfc-title">Page Not Found</div>
          <div className="pnfc-description">
            The page you are looking for may be removed, renamed or temporarily unavailable.
          </div>
          <button className="pnfc-btn" onClick={onPrimary}>Go Home</button>
        </>
      )}
    </div>
  );
};

export default PageNotFound;


