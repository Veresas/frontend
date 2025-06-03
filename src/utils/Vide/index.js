import React, { useEffect, useRef, forwardRef } from 'react';
import * as dashjs from 'dashjs';
import { useApi } from '../../context/ApiContext';

export const Video = forwardRef(({ id }, videoRef) => {
  const { baseUrl } = useApi();

  useEffect(() => {
    if (!dashjs) return;

    const url = `${baseUrl}/films/v/${id}/manifest.mpd`;
    const player = dashjs.MediaPlayer().create();
    player.initialize(videoRef.current, url, true);
    player.setAutoPlay(false);
    return () => {
      player.reset();
    };
  }, [id]);

  return (
    <div>
      <video ref={videoRef} muted  controls />
    </div>
  );
});
