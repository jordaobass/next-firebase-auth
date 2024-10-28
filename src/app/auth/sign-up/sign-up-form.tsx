'use client'


import Link from "next/link";

import {Label} from "@/components/ui/label";

import {Input} from "@/components/ui/input";
import {Button} from "@/components/ui/button";
import {Separator} from "@/components/ui/separator";

//import googleIcon from '@/assets/svg/google-icon.svg'
import {zodResolver} from "@hookform/resolvers/zod";
import {SubmitHandler, useForm} from "react-hook-form";
import {z} from "zod";
import {AlertTriangle, Loader2} from "lucide-react";
import {Alert, AlertDescription, AlertTitle} from "@/components/ui/alert";
import {signInWithEmailAndPasswordAction} from "@/app/auth/sign-up/action";
import {useEffect, useState} from "react";
import {useRouter} from "next/navigation";
import SignUpWithGoogle from "@/app/auth/sign-up/sign-up-button-google";

interface FormData {
    name: string;
    email: string;
    password: string;
    password_confirmation: string;
}

const schema = z.object({
    name: z.string().min(1, 'Nome é obrigatório'),
    email: z.string().email('E-mail inválido'),
    password: z.string().min(6, 'A senha deve ter pelo menos 6 caracteres'),
    password_confirmation: z.string().min(6, 'A confirmação de senha deve ter pelo menos 6 caracteres')
}).superRefine((data, ctx) => {
    if (data.password !== data.password_confirmation) {
        ctx.addIssue({
            code: z.ZodIssueCode.custom,
            message: 'As senhas não correspondem',
            path: ['password_confirmation'],
        });
    }
    return true;
});


export default function SignUpForm() {
    const router = useRouter();

    const [message, setMessage] = useState<string | null>(null);
    const [success, setSuccess] = useState(false);

    const {register, handleSubmit, formState: {errors, isSubmitting}} = useForm<FormData>({
        resolver: zodResolver(schema),
        mode: "onChange", // Para fornecer feedback de validação em tempo real enquanto o usuário está digitando
    });

    const onSubmit: SubmitHandler<FormData> = async (data) => {

        const result = await signInWithEmailAndPasswordAction(data.email, data.password, data.name)

        if (result.success) {
            localStorage.setItem('authToken', JSON.stringify(result.token));
            setSuccess(result.success)
        } else {
            setMessage(result.message)
        }
    };

    const handleRedirect = () => {
        router.push('/home'); // Redireciona para a página principal
    };


    useEffect(() => {
        if (success) {
            handleRedirect();
        }
    }, [success, router, handleRedirect]);

    return (

        <div className="space-y-4">
            <form onSubmit={handleSubmit(onSubmit)} className="space-y-4">
                {message && (
                    <Alert variant="destructive">
                        <AlertTriangle className="size-4"/>
                        <AlertTitle>Sign up failed!</AlertTitle>
                        <AlertDescription>
                            <p>Verifique os dados informados</p> <p>{message}</p>
                        </AlertDescription>
                    </Alert>
                )}

                <div className="space-y-1">
                    <Label htmlFor="name">Name</Label>
                    <Input {...register('name')} id="name"/>

                    {errors.name && (
                        <p className="text-xs font-medium text-red-500 dark:text-red-400">
                            {errors.name.message}
                        </p>
                    )}

                    {/*
                                 <Input name="name" id="name"/>
                           {errors?.name && (
                        <p className="text-xs font-medium text-red-500 dark:text-red-400">
                            {errors.name[0]}
                        </p>
                    )}*/}
                </div>

                <div className="space-y-1">
                    <Label htmlFor="email">E-mail</Label>
                    <Input {...register('email')} id="email"/>

                    {errors.email && (
                        <p className="text-xs font-medium text-red-500 dark:text-red-400">
                            {errors.email.message}
                        </p>
                    )}


                </div>

                <div className="space-y-1">
                    <Label htmlFor="password">Senha</Label>
                    <Input  {...register('password')} type="password" id="password"/>

                    {errors.password && (
                        <p className="text-xs font-medium text-red-500 dark:text-red-400">
                            {errors.password.message}
                        </p>
                    )}
                </div>

                <div className="space-y-1">
                    <Label htmlFor="password_confirmation">Confirme sua senha</Label>
                    <Input
                        {...register('password_confirmation')}
                        type="password"
                        id="password_confirmation"
                    />
                    {errors.password_confirmation && (
                        <p className="text-xs font-medium text-red-500 dark:text-red-400">
                            {errors.password_confirmation.message}
                        </p>
                    )}
                </div>

                {/*
                <Button className="w-full" type="submit" disabled={isPending}>
                    {isPending ? (
                        <Loader2 className="size-4 animate-spin"/>
                    ) : (
                        'Cadastrar'
                    )}
                </Button>
                */}

                <Button className="w-full" type="submit" disabled={isSubmitting}>
                    {isSubmitting ? (
                        <Loader2 className="size-4 animate-spin"/>
                    ) : (
                        'Cadastrar'
                    )}
                </Button>

                <Button className="w-full" variant="link" size="sm" asChild>
                    <Link href="/auth/sign-in">Já registrado? Entrar</Link>
                </Button>

                <Separator/>

                {/*       <Button type="submit" className="w-full" variant="outline">
                    <Image src={githubIcon} alt="" className="mr-2 size-4 dark:invert"/>
                    Cadastrar com GitHub
                </Button>*/}

                {/*     <SignInWithGoogle/>*/}

            </form>


            <SignUpWithGoogle onSignUpSuccess={handleRedirect}/>

        </div>
    );
}