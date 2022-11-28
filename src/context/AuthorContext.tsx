import { createContext, useLayoutEffect, useState } from 'react';
import authApis from '../services/authApis';

interface IAuthorContext {
  permissions: any;
  updatePermissions: (action: string, token: string) => void;
}

const initObj = {
  permissions: [],
  updatePermissions: () => {
    // any
  },
};

export const AuthorContext = createContext<IAuthorContext>(initObj);
export default function AuthorContextProvider({ children }: any) {
  const [permissions, setPermissions] = useState<any>(null);

  const updatePermissions = (action: string, token: string) => {
    if (action === 'logout') {
      setPermissions(null);
    } else {
      (async () => {
        try {
          const res = await authApis.getCurrentUser(token);
          console.log(res);
          setPermissions((res as any).permissions);
        } catch (error) {
          console.log(error as string);
        }
      })();
    }
  };
  const passdownValues = {
    permissions,
    updatePermissions,
  };
  return (
    <AuthorContext.Provider value={passdownValues}>
      {children}
    </AuthorContext.Provider>
  );
}
