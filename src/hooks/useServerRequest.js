import { useState } from 'react';
import { useApi } from '../context/ApiContext';

const useServerRequest = () => {
  const { baseUrl } = useApi();
  const [data, setData] = useState(null);
  const [error, setError] = useState(null);
  const [loading, setLoading] = useState(false);

  const makeRequest = async (path, method, body) => {
    setLoading(true);
    setError(null);
    setData(null);

    try {
      const url = `${baseUrl}${path}`;
      const options = {
        method: method,
        headers: {
          'Content-Type': 'application/json', //  Измените, если необходимо
        },
      };

      if (body) {
        options.body = JSON.stringify(body);
      }

      const response = await fetch(url, options);

      if (!response.ok) {
        const errorData = await response.json().catch(() => ({ message: 'Ошибка сервера' })); // Обработка ошибок ответа
        throw new Error(errorData.message || response.statusText);
      }

      const responseData = await response.json();
      setData(responseData);
    } catch (err) {
      setError(err);
    } finally {
      setLoading(false);
    }
  };

  return { data, error, loading, makeRequest };
};

export default useServerRequest;