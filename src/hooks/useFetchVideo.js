import { useState, useEffect, useCallback, useRef } from 'react';
import { useApi } from '../context/ApiContext';

const useFetchFile = () => {
  const { baseUrl } = useApi();
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState(null);
  const [controller, setController] = useState(null);
  const mediaSourceRef = useRef(null);
  const sourceBufferRef = useRef(null);
  const videoUrlRef = useRef(null);

  // Инициализация MediaSource
  useEffect(() => {
    const mediaSource = new MediaSource();
    mediaSourceRef.current = mediaSource;
    videoUrlRef.current = URL.createObjectURL(mediaSource);

    mediaSource.addEventListener('sourceopen', () => {
      const mimeType = 'video/mp4; codecs="avc1.64001e, mp4a.40.2"';
      sourceBufferRef.current = mediaSource.addSourceBuffer(mimeType);
    });

    return () => {
      if (mediaSourceRef.current) {
        mediaSourceRef.current.endOfStream();
        URL.revokeObjectURL(videoUrlRef.current);
      }
    };
  }, []);

  // Загрузка фрагмента
  const fetchChunk = useCallback(async (id, rangeStart, rangeEnd) => {
    if (!sourceBufferRef.current) return;

    const path = `${baseUrl}${id}`;
    const response = await fetch(path, {
      headers: { Range: `bytes=${rangeStart}-${rangeEnd}` },
      signal: controller?.signal,
    });

    if (!response.ok) throw new Error('Ошибка загрузки');
    return response.arrayBuffer();
  }, [controller]);

  // Основная функция загрузки
  const fetchData = useCallback(async (id, chunkSize = 1024 * 1024) => { // Чанки по 1 МБ
    setLoading(true);
    try {
      let startByte = 0;
      while (true) {
        const chunk = await fetchChunk(id, startByte, startByte + chunkSize - 1);
        await appendToBuffer(chunk);
        
        startByte += chunkSize;
        // Проверяем, остались ли данные (примерная логика)
        if (chunk.byteLength < chunkSize) break;
      }
      mediaSourceRef.current.endOfStream();
    } catch (err) {
      if (err.name !== 'AbortError') setError(err.message);
    } finally {
      setLoading(false);
    }
  }, []);

  // Добавление данных в буфер
  const appendToBuffer = (chunk) => {
    return new Promise((resolve) => {
      sourceBufferRef.current.addEventListener('updateend', resolve, { once: true });
      sourceBufferRef.current.appendBuffer(chunk);
    });
  };

  return { 
    data: videoUrlRef.current,
    loading, 
    error, 
    fetchData, 
    cancelFetch: () => controller?.abort() 
  };
};

export default useFetchFile;