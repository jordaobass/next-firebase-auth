'use client'

import { Label } from "@/components/ui/label";
import { Input } from "@/components/ui/input";
import { signInWithEmailAndPasswordAction } from "@/app/auth/sign-in/action";
import { useRouter } from "next/navigation";
import { Button } from "@/components/ui/button";
import { Separator } from "@/components/ui/separator";
import githubIcon from '@/assets/svg/github-icon.svg';
import logoIcon from '@/assets/svg/logo.svg';
import Link from "next/link";
import { AlertTriangle, Loader2 } from "lucide-react";
import { Alert, AlertDescription, AlertTitle } from "@/components/ui/alert";
import Image from "next/image";
import React, {useEffect, useState, useTransition} from 'react';
import SignUpWithGoogle from "@/app/auth/sign-up/sign-up-button-google";
//import {useFormState} from "@/hooks/use-form-state";

export const SignInForm = () => {
    const router = useRouter();

    //const [errors, setError] = useState<string | null>(null);
    const [message, setMessage] = useState<string | null>(null);
    //const [loading, setLoading] = useState(false);
    const [success, setSucess] = useState(false);
    const [isPending, startTransition] = useTransition();


    const handleSubmit = async (event: React.FormEvent<HTMLFormElement>) => {
        event.preventDefault();

        const form = event.currentTarget;
        const data = new FormData(form);

        startTransition(async () => {
        try {
            const result = await signInWithEmailAndPasswordAction(data);
            setSucess(result.success);
            if(result.success){
                localStorage.setItem('authToken', result.token);
            }else{

                setMessage(result.errors)
            }
        } catch (err) {
            console.error("ERRO signin", err);
            const errorMessage = (err as { message?: string }).message || "Erro ao fazer login.";
            setMessage(errorMessage)
          //  setError(errorMessage);
        } finally {
       //     setLoading(false);
        }
        });
    };

/*    const [{ errors, message, success }, handleSubmit, isPending] = useFormState(
        async (data: FormData) => {
            const result = await signInWithEmailAndPasswordAction(data);

            if (result.success) {
                localStorage.setItem('authToken', JSON.stringify(result.token));
                return { success: true, message: null, errors: null };
            } else {
                return {
                    success: false,
                    message: result.message,
                    errors: result.errors
                };
            }
        },
    );*/

    const handleRedirect = () => {
        router.push('/'); // Redireciona para a página principal
    };

    useEffect(() => {
        if (success) {
            router.push('/');
        }
    }, [success, router]);


    return (
        <div className="space-y-4">
            <Image src={logoIcon} alt="Logo" className="size-28 w-full"/>

            <form onSubmit={handleSubmit} className="space-y-4">
                {!success && message && (
                    <Alert variant="destructive">
                        <AlertTriangle className="size-4"/>
                        <AlertTitle>Falha ao fazer login!</AlertTitle>
                        <AlertDescription>
                            <p>{message}</p>
                        </AlertDescription>
                    </Alert>
                )}

                <div className="space-y-1">
                    <Label htmlFor="email">E-mail</Label>
                    <Input name="email" type="email" id="email"/>

               {/*     {errors?.email && (
                        <p className="text-xs font-medium text-red-500 dark:text-red-400">
                            {errors.email[0]}
                        </p>
                    )}*/}
                </div>

                <div className="space-y-1">
                    <Label htmlFor="password">Senha</Label>
                    <Input name="password" type="password" id="password"/>

             {/*       {errors?.password && (
                        <p className="text-xs font-medium text-red-500 dark:text-red-400">
                            {errors.password[0]}
                        </p>
                    )}*/}

                    <Link
                        href="/auth/forgot-password"
                        className="text-xs font-medium text-foreground hover:underline"
                    >
                        Esqueceu sua senha?
                    </Link>
                </div>

                <Button className="w-full" type="submit" disabled={isPending}>
                    {isPending ? (
                        <Loader2 className="size-4 animate-spin"/>
                    ) : (
                        'Entrar com e-mail'
                    )}
                </Button>

                <Button className="w-full" variant="link" size="sm" asChild>
                    <Link href="/auth/sign-up">Criar uma nova conta</Link>
                </Button>
            </form>

            <Separator/>

            <form>
                <Button type="submit" className="w-full" variant="outline">
                    <Image src={githubIcon} alt="GitHub Icon" className="mr-2 size-4 dark:invert"/>
                    Entrar com GitHub
                </Button>
            </form>

            <SignUpWithGoogle onSignUpSuccess={handleRedirect}/>
        </div>
    );
}
