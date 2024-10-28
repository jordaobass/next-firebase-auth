"use client"

import {Label} from "@/components/ui/label";
import {Input} from "@/components/ui/input";
import {Button} from "@/components/ui/button";
import Link from "next/link";
import React, {useState} from "react";
import {z} from 'zod';

import {RequestNewPassword} from "@/app/auth/forgot-password/action";
import {useForm} from "react-hook-form";
import {zodResolver} from "@hookform/resolvers/zod";
import {Loader2} from "lucide-react";

import AlertComponent from "@/components/alert-component";

interface ResetPasswordFormData {
    email: string;
}

const schema = z.object({
    email: z.string().email('E-mail inválido'),
})

export const ForgotPasswordForm = () => {

    const {register, handleSubmit, formState: {errors, isSubmitting}} = useForm<ResetPasswordFormData>({
        resolver: zodResolver(schema),
        mode: "onChange", // Para fornecer feedback de validação em tempo real enquanto o usuário está digitando
    });

    const [error, setError] = useState('');
    const [success, setSuccess] = useState(false);

    const handleResetPassword = async (data: ResetPasswordFormData) => {
        try {
            const email = data.email || '';
            const result = await RequestNewPassword(email)
            setSuccess(result.success);
        } catch {
            setError("nao foi possivel recuperar a senha");
            setSuccess(false);
        }
    };


    return (

        <form onSubmit={handleSubmit(handleResetPassword)} className="space-y-4">

            {success && (
                <AlertComponent
                    title="Sucesso!"
                    description="Se os dados estiverem corretos voce recebera o email para troca de senha"
                />
            )}

            {error && (
                <AlertComponent
                    title="Falha"
                    description="Falha ao tentar recuperar a senha"
                />
            )}

            <div className="space-y-1">
                <Label htmlFor="email">E-mail</Label>
                <Input {...register('email')} type="email" id="email"/>

                {errors.email && (
                    <p className="text-xs font-medium text-red-500 dark:text-red-400">
                        {errors.email.message}
                    </p>
                )}
            </div>

            <Button className="w-full" type="submit" disabled={isSubmitting}>
                {isSubmitting ? (
                    <Loader2 className="size-4 animate-spin"/>
                ) : (
                    '   Recuperar senha'
                )}
            </Button>

            <Button className="w-full" variant="link" size="sm" asChild>
                <Link href="/auth/sign-in">Em vez disso, faça login</Link>
            </Button>
        </form>
    );
}