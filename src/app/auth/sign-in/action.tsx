'use server';

import {signInWithEmailAndPassword} from "firebase/auth";
import {auth} from "@/lib/firebase";

export const signInWithEmailAndPasswordAction = async (data: FormData) => {
    try {

        const email = data.get("email")?.toString() || "";
        const password = data.get("password")?.toString() || "";

        console.log("executando metodo");
        const userCredential  = await signInWithEmailAndPassword(auth, email, password);
        const token = await userCredential.user.getIdToken();
        /*console.log("credenciais :",userCredential);*/
        console.log("Sucesso");
        return {success: true, message: null, errors: null, token: token};
    } catch (e) {
        console.error(e)

        const errorMessage = (e as { message?: string }).message || "Erro ao fazer login.";

        return {success: false, message: errorMessage, errors: null, token: ""};
    }
};