import React from 'react'

const Advertisement = () => {
  return (
    <div className="ads-restaurant-frame">
      <video 
        className={"ads-video"}
        autoPlay={true}
        loop
        muted
        playsInline
        data-video-meadia="" 
      >
        <source type="video/mp4" src="video/burak-ads.mp4" />
      </video>
    </div>
  );
}

export default Advertisement