import { useLocation } from 'react-router-dom';
import { useEffect } from 'react';

const specialPages = new Set(['/', '/account', '/profile', '/settings']);

function useRouteTracking() {
  const location = useLocation();

  useEffect(() => {
    const currentPath = location.pathname;
    if (specialPages.has(currentPath)) { 
      console.log(`Пользователь перешел на специальную страницу: ${currentPath}`);
      cheakAcces();
    }
  }, [location.pathname]); 

  // Функция для получения данных учетной записи (пример)
  const cheakAcces = async () => {
    try {
      const response = await fetch('/api/account'); // Замените на ваш API endpoint
      const data = await response.json();
      console.log('Данные учетной записи:', data);
      // Обработайте полученные данные
    } catch (error) {
      console.error('Ошибка при получении данных учетной записи:', error);
    }
  };

  return null; // Хук ничего не возвращает
}

export default useRouteTracking;