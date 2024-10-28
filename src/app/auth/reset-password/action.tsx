'use server';

import {auth} from "@/lib/firebase";
import {confirmPasswordReset} from "firebase/auth";

export const ConfirmPasswordReset = async (oobCode: string, newPassword: string,) => {

    try {
        const result = await confirmPasswordReset(auth, oobCode as string, newPassword);
        console.log(result);
        return {success: true, message: null, errors: null};
    } catch (err) {
        const error = err as { message?: string };
        return {success: false, message: "nao foi possivel confirmar a troca de senha", errors: error};
    }

}