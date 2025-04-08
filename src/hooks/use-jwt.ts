import Cookies from 'js-cookie';
import { jwtDecode } from 'jwt-decode';
import { useState, useEffect } from 'react';

import { TOKEN } from 'src/constants/env';

export const useJWT = () => {
  const [jwtToken, setJWT] = useState<string | null>();

  const handleSaveJWT = (token: string) => {
    if (token) {
      Cookies.set(TOKEN.AUTH_TOKEN, token);
      setJWT(token);
    }
  };

  const handleRemoveJWT = () => {
    Cookies.remove(TOKEN.AUTH_TOKEN);
    setJWT(null);
  };

  const validateJWT = (token: string) => {
    try {
      jwtDecode(token);
      return true;
    } catch {
      return false;
    }
  };

  useEffect(() => {
    const token = Cookies.get(TOKEN.AUTH_TOKEN);
    setJWT(token || null);
  }, []);

  return { state: { jwtToken }, actions: { handleSaveJWT, handleRemoveJWT, validateJWT } };
};
