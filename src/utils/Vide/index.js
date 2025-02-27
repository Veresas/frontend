import React, { useEffect, useRef } from 'react';
import * as dashjs from 'dashjs';
import useServerRequest from '../../hooks/useServerRequest' 
import { useApi } from '../../context/ApiContext';

export const Video = ({ id }) => {
	const videoRef = useRef(null);
	const { baseUrl } = useApi();
	const {reqData, makeRequest} = useServerRequest();
	
  useEffect(() => {
	console.log("dashjs:", dashjs); // Добавьте эту строку
    if (!dashjs) {
        console.error("dashjs is not loaded");
        return; // Прекратить выполнение, если dashjs не загружен
    }
    const url = `${baseUrl}/films/v/${id}/manifest.mpd`;

    const player = dashjs.MediaPlayer().create();
	player.initialize(videoRef.current, url, true);
    player.setAutoPlay(true);

    return () => {
      player.reset();
    };
  }, [id]);

  return (
    <div>
      <video ref={videoRef} controls />
    </div>
  );
};