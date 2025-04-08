import type { AxiosResponse } from 'axios';
import type { PropsWithChildren } from 'react';
import type { SignIn } from 'src/types/signin';

import { useMemo, useContext, useCallback, createContext } from 'react';

import { useRouter } from 'src/routes/hooks';

import { useJWT } from 'src/hooks/use-jwt';

import clientApi from 'src/utils/api/base-api';

type AuthContextType = {
  authToken?: string | null;
  handleLogin: (data: SignIn) => Promise<AxiosResponse>;
  handleLogout: () => Promise<void>;
};

const AuthContext = createContext<AuthContextType | undefined>(undefined);

export default function AuthProvider({ children }: PropsWithChildren) {
  const { state, actions } = useJWT();
  const router = useRouter();
  const handleLogin = useCallback(
    async (data: SignIn) => {
      const response = await clientApi.post<{ token: string }>('/sign-in', data);
      const { token } = response.data;
      actions.handleSaveJWT(token);
      return response;
    },
    [actions]
  );

  const handleLogout = useCallback(async () => {
    actions.handleRemoveJWT();
    router.push('/sign-in');
  }, [actions, router]);

  return (
    <AuthContext.Provider
      value={useMemo(
        () => ({ authToken: state.jwtToken, handleLogin, handleLogout }),
        [state.jwtToken, handleLogin, handleLogout]
      )}
    >
      {children}
    </AuthContext.Provider>
  );
}

export function useAuth() {
  const context = useContext(AuthContext);

  if (context === undefined) {
    throw new Error('useAuth must be used inside of a AuthProvider');
  }

  return context;
}
