import React from 'react';
import { useForm } from 'react-hook-form';

const RegForm = () => {
  const { register, handleSubmit, formState: { errors } } = useForm();
  const onSubmit = (data) => console.log(data);

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
        <label htmlFor="email">Email:</label>
        <input
          type="email"
          id="email"
          {...register("email", { required: true, pattern: /^[^\s@]+@[^\s@]+\.[^\s@]+$/ })}
        />
        {errors.email && <span>Введите корректный email.</span>}
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

export default RegForm;