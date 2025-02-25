import { useState, useEffect, useCallback, useRef } from 'react';
import { useApi } from '../context/ApiContext';

const useFetchFile = (IsVideo) => {
  const { baseUrl } = useApi();
  const [data, setData] = useState(null);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState(null);
  const [controller, setController] = useState(null);
  const mediaSourceRef = useRef(null);
  const sourceBufferRef = useRef(null);

  useEffect(() => {
    if(IsVideo){
    const mediaSource = new MediaSource();
    mediaSourceRef.current = mediaSource;
    setData({ url: URL.createObjectURL(mediaSource) });

    mediaSource.addEventListener('sourceopen', () => {
      const mimeType = 'video/mp4; codecs="avc1.64001e, mp4a.40.2"';
      sourceBufferRef.current = mediaSource.addSourceBuffer(mimeType);
    });

    return () => {
      if (mediaSourceRef.current) {
        mediaSourceRef.current.endOfStream();
        URL.revokeObjectURL(mediaSourceRef.current.url);
      }
    };
    }

  }, []);

  const fetchData = useCallback(async (id, rangeStart, rangeEnd) => {
    if (!id) {
      setLoading(false);
      return;
    }

    setLoading(true);
    setError(null);
    const newController = new AbortController();
    setController(newController);

    try {
      const path = `${baseUrl}${id}`;
			const options = {
				signal: newController.signal,
			};
      if(rangeEnd !== undefined && rangeStart !== undefined){
        options.headers = {
          ...options.headers,
          Range: `bytes=${rangeStart}-${rangeEnd}`
        };
      }
      const response = await fetch(path, options);

      if (!response.ok) {
        const errorData = await response.json(); // Попытка получить данные об ошибке из ответа
        const errorMessage = errorData.message || response.statusText;
        throw new Error(errorMessage);
      }

      if(IsVideo){
        const arrayBuffer = await response.arrayBuffer();
      
         // Добавляем данные в SourceBuffer
        if (sourceBufferRef.current && !sourceBufferRef.current.updating) {
          sourceBufferRef.current.appendBuffer(arrayBuffer);
        }
      }else{
        const blob = await response.blob(); // Получаем файл как Blob
        const url = URL.createObjectURL(blob); // Создаем URL для Blob
  
        setData({ url });
      }
      
    } catch (err) {
      if (err.name !== 'AbortError') { // Игнорируем ошибку прерывания запроса
        setError(err.message);
      }
    } finally {
      setLoading(false);
    }
  }, []);


  useEffect(() => {
    fetchData();
    return () => {
      if (controller) {
        controller.abort();
      }
    };
  }, [fetchData]);


  const cancelFetch = () => {
    if (controller) {
      controller.abort();
      setLoading(false);
      setError('Request cancelled');
    }
  };


  return { data, loading, error, fetchData, cancelFetch };
};

export default useFetchFile;