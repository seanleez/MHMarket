import { createContext, useEffect, useLayoutEffect, useState } from 'react';
import authApis from '../services/authApis';

interface IAuthorContext {
  currentUser: any;
  updateCurrentUser: () => void;
}

const initObj = {
  currentUser: null,
  updateCurrentUser: () => {
    // any
  },
};

export const AuthorContext = createContext<IAuthorContext>(initObj);
export default function AuthorContextProvider({ children }: any) {
  const [currentUser, setCurrentUser] = useState<any>(null);

  useLayoutEffect(() => {
    updateCurrentUser();
  }, []);

  function updateCurrentUser() {
    // token is undefined when logout
    const token = localStorage.getItem('accessToken') ?? '';
    if (token) {
      (async () => {
        try {
          const res = await authApis.getCurrentUser();
          setCurrentUser(res);
        } catch (error) {
          console.log(error as string);
        }
      })();
    } else {
      setCurrentUser(null);
    }
  }

  const passdownValues = {
    currentUser,
    updateCurrentUser,
  };
  return (
    <AuthorContext.Provider value={passdownValues}>
      {children}
    </AuthorContext.Provider>
  );
}
