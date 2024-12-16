import React, { useEffect, useState } from 'react';
import { useForm } from 'react-hook-form';
import useServerRequest from '../hooks/useServerRequest';
import { setJwtInCookie, setUsernameCookie } from '../modules/Coookie';
import { useNavigate } from 'react-router-dom';

const LoginForm = () => {
  const { register, handleSubmit, formState: { errors } } = useForm();
  const { error, loading, makeRequest } = useServerRequest();
  const navigate = useNavigate();
  const [go, setGo]= useState(null);

  const onSubmit = async (data) =>{
    try{
        const response = await makeRequest('/A/login', 'POST', data); // Ждем ответа
        await setJwtInCookie(response.token);
        await setUsernameCookie(response.username);
        setGo(true);
    }catch (err){
        console.error("Ошибка регистрации:", err);
        alert(`Ошибка регистрации: ${err.message}`); // Или более сложная обработка ошибок    
    }
  } 
  
  useEffect(() =>{
    if(go){
      navigate("/log")
    }
  }, [go]);
  
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