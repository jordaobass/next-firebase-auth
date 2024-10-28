'use client'

import {Label} from "@/components/ui/label";
import {Input} from "@/components/ui/input";
import {signInWithEmailAndPasswordAction} from "@/app/auth/sign-in/action";
import {useRouter} from "next/navigation";
import {Button} from "@/components/ui/button";
import {Separator} from "@/components/ui/separator";
import githubIcon from '@/assets/svg/github-icon.svg';

import Link from "next/link";
import {AlertTriangle,  Loader2, Star} from "lucide-react";
import {Alert, AlertDescription, AlertTitle} from "@/components/ui/alert";
import Image from "next/image";
import React, {useCallback, useEffect, useState, useTransition} from 'react';
import SignUpWithGoogle from "./sign-in-button-google";


export const SignInForm = () => {
    const router = useRouter();

    const [message, setMessage] = useState<string | null>(null);
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
                if (result.success) {
                    localStorage.setItem('authToken', result.token);
                } else {

                    setMessage(result.errors)
                }
            } catch (err) {
                console.error("ERRO signin", err);
                const errorMessage = (err as { message?: string }).message || "Erro ao fazer login.";
                setMessage(errorMessage)

            } finally {
            }
        });
    };

    const handleRedirect = useCallback(() => {
        router.push('/'); // Redireciona para a página principal
    }, [router]);

    useEffect(() => {
        if (success) {
            handleRedirect();
        }
    }, [success, router]);

    return (
        <div className="space-y-4">
            <Star className="size-28 w-full"/>

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
                </div>

                <div className="space-y-1">
                    <Label htmlFor="password">Senha</Label>
                    <Input name="password" type="password" id="password"/>

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
