import type { FC, PropsWithChildren } from 'react';

import Cookies from 'js-cookie';
import { Navigate } from 'react-router-dom';

import { useJWT } from 'src/hooks/use-jwt';

import { TOKEN } from 'src/constants/env';

export const ProtectedRoute: FC<PropsWithChildren> = ({ children }) => {
  const { actions } = useJWT();
  const token = Cookies.get(TOKEN.AUTH_TOKEN);

  if (!token || !actions.validateJWT(token)) return <Navigate to="/sign-in" />;
  return <>{children}</>;
};
