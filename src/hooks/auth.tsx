import React, { createContext, useContext } from 'react';

interface AuthProviderProps {
  children: React.ReactNode
}

interface User {
  id: string;
  name: string;
  email: string;
  photo?: string;
}

interface AuthContextData {
  user: User;
}

const AuthContext = createContext({} as AuthContextData);

function AuthProvider({ children }: AuthProviderProps) {
  const user: User = {
    id: '123456789',
    name: 'Fernando Maia',
    email: 'fermaia22@gmail.com',
  }

  return (
    <AuthContext.Provider value={{ user }}>
      {children}
    </AuthContext.Provider>
  )
}

function useAuth() {
  const context = useContext(AuthContext);

  return context;
}

export { AuthProvider, useAuth };