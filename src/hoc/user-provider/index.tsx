import type { User } from 'src/types/user';
import type { PropsWithChildren } from 'react';

import Cookies from 'js-cookie';
import {
  useMemo,
  useState,
  useEffect,
  useContext,
  useCallback,
  createContext,
  useLayoutEffect,
} from 'react';

import clientApi from 'src/utils/api/base-api';

import { TOKEN } from 'src/constants/env';

import { useAuth } from '../auth-provider';

type UserContextType = {
  currentUser?: User | null;
  clearUser: VoidFunction;
};

export const UserContext = createContext<UserContextType | undefined>(undefined);

export default function UserProvider({ children }: PropsWithChildren) {
  const [currentUser, setCurrentUser] = useState<User | null>();
  const token = Cookies.get(TOKEN.AUTH_TOKEN);
  const { handleLogout } = useAuth();

  useLayoutEffect(() => {
    const authInterceptor = clientApi.interceptors.request.use((config) => {
      config.headers.Authorization = token ? `Bearer ${token}` : config.headers.Authorization;
      return config;
    });

    const unAuthInterceptor = clientApi.interceptors.response.use(
      (response) => response,
      (error) => {
        if (error.response?.status === 401) {
          handleLogout();
        }
        return Promise.reject(error);
      }
    );

    return () => {
      clientApi.interceptors.response.eject(unAuthInterceptor);
      clientApi.interceptors.request.eject(authInterceptor);
    };
  }, [token, handleLogout]);

  useEffect(() => {
    async function fetchMe() {
      try {
        const response = await clientApi.get<User>('/me');
        setCurrentUser(response.data);
      } catch {
        setCurrentUser(null);
      }
    }

    fetchMe();
  }, []);

  const clearUser = useCallback(() => {
    setCurrentUser(null);
  }, []);

  return (
    <UserContext.Provider
      value={useMemo(() => ({ currentUser, clearUser }), [currentUser, clearUser])}
    >
      {children}
    </UserContext.Provider>
  );
}

export function useUser() {
  const context = useContext(UserContext);

  if (context === undefined) {
    throw new Error('useUser must be used inside of a UserProvider');
  }

  return context;
}
