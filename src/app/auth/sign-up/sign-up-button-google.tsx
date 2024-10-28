import { auth } from '@/lib/firebase';
import { GoogleAuthProvider, signInWithPopup } from 'firebase/auth';
import { useState } from 'react';
import { Button } from '@/components/ui/button';

import Image from "next/image";
import googleIcon from '@/assets/svg/google-icon.svg'


interface SignUpWithGoogleProps {
    onSignUpSuccess: () => void;
}

const SignUpWithGoogle : React.FC<SignUpWithGoogleProps> = ({ onSignUpSuccess }) => {

    const [error, setError] = useState('');


    const handleGoogleSignUp = async () => {
        const provider = new GoogleAuthProvider();

        try {
            const result = await signInWithPopup(auth, provider);
            const user = result.user;

            const token = await user.getIdToken();
            localStorage.setItem('authToken', token);

            console.log('Usuário cadastrado com Google:', user);
            onSignUpSuccess();

        } catch (err) {
            const error = err as Error;
            setError(error.message);
            console.error('Erro ao cadastrar com Google:', error.message);
        }
    };

    return (
        <div>
            {error && <p className="text-red-500">{error}</p>}
            <Button onClick={handleGoogleSignUp} className="w-full" variant="outline">
                <Image src={googleIcon} alt="" className="mr-2 size-4 dark:invert"/>
                Cadastrar com Google
            </Button>
        </div>
    );
};

export default SignUpWithGoogle;