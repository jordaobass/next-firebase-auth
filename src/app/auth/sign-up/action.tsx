'use server'

import { auth } from '@/lib/firebase';
import { createUserWithEmailAndPassword, updateProfile } from 'firebase/auth';

export const signInWithEmailAndPasswordAction = async (email: string,
                                                       password: string,
                                                       name: string,
                                                       ) => {

    //const { email, password, displayName } = await request.json();

    try {
        const userCredential = await createUserWithEmailAndPassword(auth, email, password);
        const user = userCredential.user;
        await updateProfile(user, {
            displayName: name,
        });
        const token = await userCredential.user.getIdToken();
        return {
            success: true,
            message: 'Usuario criado com sucesso!',
            errors: null,
            token
        }
    } catch (error) {
        return {
            success: false,
            message: 'Erro inesperado',
            errors: error,
            token: ""
        }
    }


}