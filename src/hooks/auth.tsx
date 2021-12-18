import React, { createContext, useContext, useEffect, useState } from 'react';
import { Alert } from 'react-native';
import * as AuthSession from 'expo-auth-session';
import * as AppleAuthentication from 'expo-apple-authentication';
import AsyncStorage from '@react-native-async-storage/async-storage';

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
  signInWithGoogle(): Promise<void>;
  signInWithApple(): Promise<void>;
  signOut(): Promise<void>;
  isLoading: boolean;
}

interface AuthorizationResponse {
  params: {
    access_token: string;
  },
  type: string;
}

const AuthContext = createContext({} as AuthContextData);

function AuthProvider({ children }: AuthProviderProps) {
  const [user, setUser] = useState<User>({} as User);
  const [isLoading, setIsLoading] = useState<boolean>(true);

  const userStorageKey = '@gofinances:user';

  async function signInWithGoogle() {
    try {
      const { CLIENT_ID } = process.env;
      const { REDIRECT_URI } = process.env;

      const RESPONSE_TYPE = 'token';
      const SCOPE = encodeURI('profile email');

      const authUrl = `https://accounts.google.com/o/oauth2/v2/auth?client_id=${CLIENT_ID}&redirect_uri=${REDIRECT_URI}&response_type=${RESPONSE_TYPE}&scope=${SCOPE}`;

      const { type, params } = await AuthSession.startAsync({ authUrl }) as AuthorizationResponse;

      if(type !== 'success') {
        throw new Error('Failed to sign Google');
      }

      const response = await fetch(`https://www.googleapis.com/oauth2/v1/userinfo?alt=json&access_token=${params.access_token}`);
      const userInfo = await response.json();

      setUser({
        id: userInfo.id,
        email: userInfo.email,
        name: userInfo.given_name,
        photo: userInfo.picture
      })

      await AsyncStorage.setItem(userStorageKey, JSON.stringify({
        id: userInfo.id,
        email: userInfo.email,
        name: userInfo.given_name,
        photo: userInfo.picture
      }));

    } catch (error) {
      throw new Error('Não foi possível conectar com a conta Google.');
    }
  }

  async function signInWithApple() {
    try {
      const credential = await AppleAuthentication.signInAsync({
        requestedScopes: [
          AppleAuthentication.AppleAuthenticationScope.FULL_NAME,
          AppleAuthentication.AppleAuthenticationScope.EMAIL,
        ]
      });

      if(!credential) {
        throw new Error('Failed to sign in with Apple');
      }

      const name = credential.fullName!.givenName!;

      const userInfo: User = {
        id: String(credential.user),
        name,
        email: credential.email!,
        photo: `https://ui-avatars.com/api/?name=${name}&length=1`
      }

      setUser(userInfo);

      await AsyncStorage.setItem(userStorageKey, JSON.stringify(userInfo));
    } catch (error) {
      Alert.alert('Não foi possível acessar com a Apple');
    }
  }

  async function signOut() {
    try {
      await AsyncStorage.removeItem(userStorageKey);
      setUser({} as User);
    } catch (error) {
      throw new Error('Erro ao tentar sair');
    }
  }

  useEffect(() => {
    async function loadData() {
      const userStoraged  = await AsyncStorage.getItem(userStorageKey);
      
      if(userStoraged) {
        const userLogged = JSON.parse(userStoraged) as User;
        setUser(userLogged);
      }

      setIsLoading(false);
    }

    loadData();
  }, [])

  return (
    <AuthContext.Provider value={{ isLoading, user, signInWithGoogle, signInWithApple, signOut }}>
      {children}
    </AuthContext.Provider>
  )
}

function useAuth() {
  const context = useContext(AuthContext);

  if(!context) {
    throw new Error('useAuth only available in AuthContext');
  }

  return context;
}

export { AuthProvider, useAuth };