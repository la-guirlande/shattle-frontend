import React, { useEffect, useState } from 'react';
import { Status, useQuery } from '../../hooks/query-hooks';
import { Config } from '../../util/config';
import { LocalStorageKey } from '../../util/local-storage';
import { UserData } from '../../util/types/data-types';
import { AccessTokenResponse, UserResponse } from '../../util/types/response-types';

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
  const accessTokenQuery = useQuery<AccessTokenResponse>();

  useEffect(() => {
    switch (userInfoQuery.status) {
      case Status.INIT:
        userInfoQuery.get(`${Config.API_URL}/users/info`, { headers: { Authorization: `Bearer ${localStorage.getItem(LocalStorageKey.ACCESS_TOKEN)}` } });
        break;
      case Status.SUCCESS:
        setAuthUser(userInfoQuery.response.user);
        console.log('User', userInfoQuery.response.user.name, 'authenticated with access token');
        break;
      case Status.ERROR:
        console.log(userInfoQuery.code)
        if (userInfoQuery.code === 403) {
          accessTokenQuery.post(`${Config.API_URL}/auth/accessToken`, { refreshToken: localStorage.getItem(LocalStorageKey.REFRESH_TOKEN) });
        } else {
          console.error('Could not authenticate :', userInfoQuery.errorResponse.errors);
        }
        break;
    }
  }, [userInfoQuery.status]);

  useEffect(() => {
    switch (accessTokenQuery.status) {
      case Status.SUCCESS:
        const { access_token } = accessTokenQuery.response;
        localStorage.setItem(LocalStorageKey.ACCESS_TOKEN, access_token);
        userInfoQuery.get(`${Config.API_URL}/users/info`, { headers: { Authorization: `Bearer ${access_token}` } });
        break;
      case Status.ERROR:
        console.log('Could not get new access token :', accessTokenQuery.errorResponse.errors);
        break;
    }
  }, [accessTokenQuery.status]);

  return <AuthenticationContext.Provider value={{ authUser, setAuthUser }}>{props.children}</AuthenticationContext.Provider>
}
