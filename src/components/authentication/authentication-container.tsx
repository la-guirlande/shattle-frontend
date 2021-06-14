import React, { useContext, useEffect, useState } from 'react';
import { useHistory } from 'react-router-dom';
import { Status, useQuery } from '../../hooks/query-hooks';
import { LocalStorageKey } from '../../util/local-storage';
import { CreationResponse, RefreshTokenResponse, UserInfoResponse } from '../../util/types/response-types';
import { AuthenticationContext } from '../contexts/authentication-context';
import { SignIn, SignInFormValues } from './sign-in-component';
import { SignUp, SignUpFormValues } from './sign-up-component';

export const AuthenticationContainer: React.FC = () => {
    const authenticationContext = useContext(AuthenticationContext);
    const [currentSigninValues, setCurrentSigninValues] = useState<SignInFormValues>(null);
    const [showSignUp, setShowSignUp] = useState<boolean>(true);
    const addUserQuery = useQuery<CreationResponse>();
    const refreshTokenQuery = useQuery<RefreshTokenResponse>();
    const userInfoQuery = useQuery<UserInfoResponse>();
    const history = useHistory();

    useEffect(() => {
        switch (refreshTokenQuery.status) {
            case Status.SUCCESS:
                localStorage.setItem(LocalStorageKey.REFRESH_TOKEN, refreshTokenQuery.response.refresh_token);
                localStorage.setItem(LocalStorageKey.ACCESS_TOKEN, refreshTokenQuery.response.access_token);
                userInfoQuery.get(`http://localhost/users/info`, {
                    headers: { Authorization: `Bearer ${localStorage.getItem(LocalStorageKey.ACCESS_TOKEN)}` }
                });
                break;
        }
    }, [refreshTokenQuery.status]);

    useEffect(() => {
        switch (userInfoQuery.status) {
            case Status.SUCCESS:
                authenticationContext.setAuthUser(userInfoQuery.response.user);
                history.push(`/lobby`);
                break;
        }
    }, [userInfoQuery.status]);

    useEffect(() => {
        switch (addUserQuery.status) {
            case Status.SUCCESS:
                refreshTokenQuery.post(`http://localhost/auth/refreshToken`, currentSigninValues);
                break;
            case Status.ERROR:
                console.log(addUserQuery.errorResponse.errors)
                break;
        }
    }, [addUserQuery.status]);

    const handleShowSign = () => {
        setShowSignUp(!showSignUp);
    }

    const handleSubmitSignInForm = (data: SignInFormValues) => {
        refreshTokenQuery.post(`http://localhost/auth/refreshToken`, data);
    }

    const handleSubmitSignUpForm = (data: SignUpFormValues) => {
        addUserQuery.post(`http://localhost/users`, {
            email: data.email,
            name: data.name,
            password: data.password
        });
        setCurrentSigninValues({ email: data.email, password: data.password });
    }

    return (
        <>
            {showSignUp ?
                <>
                    <h1 className="text-2xl flex flex-col justify-center items-center mx-auto lg:mt-20 mt-8">Connexion</h1>
                    <SignIn onSubmit={handleSubmitSignInForm} handleSignUp={handleShowSign} showSignUp={showSignUp} />
                </>
                :
                <>
                    <h1 className="text-2xl flex flex-col justify-center items-center mx-auto lg:mt-20 mt-8">Inscription</h1>
                    <SignUp onSubmit={handleSubmitSignUpForm} handleSignUp={handleShowSign} showSignUp={showSignUp} />
                </>
            }
        </>
    )
}
