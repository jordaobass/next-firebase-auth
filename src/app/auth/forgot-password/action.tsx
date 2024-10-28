'use server';

import {sendPasswordResetEmail} from "@firebase/auth";
import {auth} from "@/lib/firebase";

export const RequestNewPassword = async (email: string) => {

    try {
        const result = await sendPasswordResetEmail(auth, email);
        console.log(result);
        return {success: true, message: null, errors: null};
    } catch (err) {
        return {success: true, message: err, errors: null};
    }

}