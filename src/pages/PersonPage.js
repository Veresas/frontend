import { useState, useEffect } from 'react'; // импортируем useEffect
import useServerRequest from '../hooks/useServerRequest';

const PersonPage = () => {
  const { reqData, error, loading, makeRequest } = useServerRequest();
  const [myError, setMyError] = useState(null); //состояние для хранения ошибки

  useEffect(() => {
    const fetchData = async () => {
      try {
        await makeRequest('/acc/person', 'POST');
      } catch (err) {
        setMyError(err); //сохраняем ошибку в состояние
      }
    };
    fetchData();
  }, []); // makeRequest в зависимости, чтобы вызов происходил один раз

  return (
    <div>
      {myError && <p>Произошла ошибка: {myError.message}</p>}
    </div>
  );
};

export default  PersonPage;