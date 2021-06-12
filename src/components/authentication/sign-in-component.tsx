import * as yup from 'yup';
import { yupResolver } from '@hookform/resolvers/yup';
import React from 'react';
import { useForm } from 'react-hook-form'
import { Button } from '../button';

/**
 * Signin form values.
 */
export interface SignInFormValues {
    email: string;
    password: string;
}

/**
 * Signin form props.
 */
export interface SignInFormProps {
    showSignUp: boolean;
    onSubmit(data: SignInFormValues): void;
    handleSignUp(): void;
}

/**
 * 
 */
const signInSchema = yup.object().shape({
    email: yup.string().required('Ce champ est requis').email('Ce champ doit contenir une adresse mail'),
    password: yup.string().required('Vous devez écrire votre mot de passe.').min(8, 'Mot de passe trop court').typeError('Mot de passe invalide'),
});

/**
 * Signin form component.
 * 
 * @param onSubmit When the form is submitted
 */
export const SignIn: React.FC<SignInFormProps> = ({ showSignUp, onSubmit, handleSignUp }) => {
    const { register, formState: {errors}, handleSubmit } = useForm<SignInFormValues>({
        defaultValues: { email: '', password: '' },
        resolver: yupResolver(signInSchema),
        mode: 'onBlur'
    });    

    return (
        <form onSubmit={handleSubmit(data => onSubmit(data))}>
            <div className="flex flex-col justify-center items-center mx-auto lg:mt-4 mt-2">
                <div>
                    <input className="border border-black m-2 p-4 w-80 rounded focus:outline-none text-gray-800" {...register('email')} type="text" name="email" placeholder="Adresse Email" />
                    {errors.email && <small>{errors.email.message}</small>}
                </div>
                <div>
                    <input className="border border-black m-2 p-4 w-80 mt-8 rounded focus:outline-none text-gray-800" {...register('password')} type="password" name="password" placeholder="Mot de passe" />
                    {errors.password && <small>{errors.password.message}</small>}
                </div>

                <button className="border border-black mt-8 p-2 rounded bg-secondary-dark w-60 waves-effect mb-12 lg:mb-0" type="submit">Connexion</button>
                <Button onClick={handleSignUp}>
                    {showSignUp ? `S'inscrire` : `Se connecter`}
                </Button>
            </div>

        </form>
    );
}
