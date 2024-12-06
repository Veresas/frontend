import { useState, useEffect, useCallback } from 'react';
import { useApi } from '../context/ApiContext';

const useFetchFile = () => {
  const { baseUrl } = useApi();
  const [data, setData] = useState(null);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState(null);
  const [controller, setController] = useState(null);

  const fetchData = useCallback(async (id) => {
    if (!id) {
      setLoading(false);
      return;
    }

    setLoading(true);
    setError(null);
    const newController = new AbortController();
    setController(newController);

    try {
      const response = await fetch(`${baseUrl}${id}`, { // Замените на ваш endpoint
        signal: newController.signal,
      });

      if (!response.ok) {
        const errorData = await response.json(); // Попытка получить данные об ошибке из ответа
        const errorMessage = errorData.message || response.statusText;
        throw new Error(errorMessage);
      }

      const blob = await response.blob(); // Получаем файл как Blob
      const url = URL.createObjectURL(blob); // Создаем URL для Blob

      setData({ url, blob });
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