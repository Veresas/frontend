import React from 'react';
import { useForm } from 'react-hook-form';
import useServerRequest from '../hooks/useServerRequest';
import { setJwtInCookie } from '../modules/Coookie';
const LoginForm = () => {
  const { register, handleSubmit, formState: { errors } } = useForm();
  const { error, loading, makeRequest } = useServerRequest();
  const onSubmit = async (data) =>{
    try{
        const response = await makeRequest('/acc/login', 'POST', data); // Ждем ответа
        const token = response.token;
        await setJwtInCookie(token);
        
    }catch (err){
        console.error("Ошибка регистрации:", err);
        alert(`Ошибка регистрации: ${err.message}`); // Или более сложная обработка ошибок    
    }
  } 

  if (loading) {
    return <div>Загрузка...</div>;
  }
  if (error) {
    return <div>Ошибка: {error.message}</div>;
  }

  return (
    <form onSubmit={handleSubmit(onSubmit)}>
      <div>
        <label htmlFor="name">Имя:</label>
        <input
          type="text"
          id="name"
          {...register("name", { required: true, minLength: 3 })}
        />
        {errors.name && <span>Имя обязательно и должно содержать минимум 3 символа.</span>}
      </div>
      
      <div>
        <label htmlFor="password">Пароль:</label>
        <input
          type="password"
          id="password"
          {...register("password", { required: true, minLength: 6 })}
        />
        {errors.password && <span>Пароль обязательно и должен содержать минимум 6 символов.</span>}
      </div>
      <button type="submit">Зарегистрироваться</button>
    </form>
  );
};

export default LoginForm