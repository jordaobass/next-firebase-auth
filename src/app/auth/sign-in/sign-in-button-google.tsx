'use client'

import { auth } from '@/lib/firebase'; // ajuste o caminho conforme necessário
import { GoogleAuthProvider, signInWithPopup } from 'firebase/auth';
import { useState } from 'react';
import { Button } from '@/components/ui/button';
import Image from "next/image";
import githubIcon from "@/assets/svg/github-icon.svg"; // ajuste conforme sua biblioteca de UI

interface SignInWithGoogleProps {
    onSignUpSuccess: () => void; // Define a função que será passada
}

const SignInWithGoogle : React.FC<SignInWithGoogleProps> = ({ onSignUpSuccess }) => {
    const [error, setError] = useState('');

    const handleGoogleSignIn = async () => {
        const provider = new GoogleAuthProvider();

        try {
            const result = await signInWithPopup(auth, provider);
            const user = result.user;


            const token = await user.getIdToken();
            localStorage.setItem('authToken', token);
            onSignUpSuccess();
        } catch (err) {
            const error = err as Error;
            setError(error.message);
            console.error('Erro ao fazer login com Google:', err);
        }
    };

    return (
        <div>
            {error && <p className="text-red-500">{error}</p>}
            <Button onClick={handleGoogleSignIn} className="w-full" variant="outline">
                <Image src={githubIcon} alt="" className="mr-2 size-4 dark:invert"/>
                Cadastrar com Google
            </Button>


        </div>
    );
};

export default SignInWithGoogle;
