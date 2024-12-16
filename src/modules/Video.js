import React, { useState, useEffect } from 'react';
import useFetchFile from '../hooks/useFetchFile';
import './css/Video.css';

const Video = ({ id }) => {
  const { data, loading, fetchData } = useFetchFile();
  const [file, setFile] = useState(null);

  if (id === `t`) {
    id = `6235397-hd_1080_1920_25fps`;
  }

  useEffect(() => {
    const fetchMovies = async () => {
      try {
        const url = `/films/v/${id}.mp4`;
        await fetchData(url);
      } catch (ex) {
        console.error("Error fetching video:", ex);
      }
    };

    fetchMovies();
  }, [id, fetchData]);

  useEffect(() => {
    if (data) {
      setFile(data);
    }
  }, [data]);

  if (file && file.url) {
    return (
      <div className="video-container">
        <div className="video-player">
          <video controls className="video-element">
            <source src={file.url} type="video/mp4" />
            Ваш браузер не поддерживает воспроизведение видео.
          </video>
        </div>
      </div>
    );
  } else {
    return (
      <div className="loading-container">
        <p className="loading-text">Загрузка...</p>
      </div>
    );
  }
};

export default Video;