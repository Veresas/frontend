import React, { createContext, useContext } from 'react';

const ApiContext = createContext();

export const ApiProvider = ({ children, baseUrl }) => {
  return (
    <ApiContext.Provider value={{ baseUrl }}>
      {children}
    </ApiContext.Provider>
  );
};

export const useApi = () => {
  return useContext(ApiContext);
};