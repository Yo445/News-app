import React, { createContext, useEffect, useState } from 'react';

export const AuthContext = createContext();

export const AuthProvider = ({ children }) => {
  const [auth, setAuth] = useState({
    // email:'yosef@gmail.com',
    // password:'123',
  });

useEffect(()=>{
  const token =localStorage.getItem('token');
  const email =localStorage.getItem('email');
  if(email){
    setAuth({token, email})
  }

}, []);

  return (
    <AuthContext.Provider value={{ auth, setAuth }}>
      {children}
    </AuthContext.Provider>
  );
};
