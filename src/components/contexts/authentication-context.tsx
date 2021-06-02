import React, { useEffect, useState } from 'react';
import { Status, useQuery } from '../../hooks/query-hooks';
import { Config } from '../../util/config';
import { LocalStorageKey } from '../../util/local-storage';
import { UserData } from '../../util/types/data-types';
import { UserResponse } from '../../util/types/response-types';

/**
 * Authentication context state.
 */
export type AuthenticationContextState = {
  authUser: UserData;
  setAuthUser(authUser: UserData): void;
}

/**
 * Authentication context.
 * 
 * This context is used to manipulate the authenticated user.
 */
export const AuthenticationContext = React.createContext<AuthenticationContextState>({ authUser: null, setAuthUser: null });

/**
 * Authentication context provider.
 */
export const AuthenticationContextProvider: React.FC = (props) => {
  const [authUser, setAuthUser] = useState<UserData>(null);
  const userInfoQuery = useQuery<UserResponse>();

  useEffect(() => {
    switch (userInfoQuery.status) {
      case Status.INIT:
        userInfoQuery.get(`${Config.API_URL}/users/info`, { headers: { Authorization: `Bearer ${localStorage.getItem(LocalStorageKey.ACCESS_TOKEN)}` } });
        break;
      case Status.SUCCESS:
        setAuthUser(userInfoQuery.response.user);
        break;
      case Status.ERROR:
        console.error(userInfoQuery.errorResponse.errors);
        break;
    }
  }, [userInfoQuery.status]);

  return <AuthenticationContext.Provider value={{ authUser, setAuthUser }}>{props.children}</AuthenticationContext.Provider>
}
