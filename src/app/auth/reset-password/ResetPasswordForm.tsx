"use client";

import { useState, useEffect } from "react";
import { useSearchParams  } from "next/navigation";
import { z } from "zod";
import {Label} from "@/components/ui/label";
import {Input} from "@/components/ui/input";
import {SubmitHandler, useForm} from "react-hook-form";
import {zodResolver} from "@hookform/resolvers/zod";
import {Button} from "@/components/ui/button";
import {Loader2} from "lucide-react";
import {ConfirmPasswordReset} from "@/app/auth/reset-password/action";


interface FormDataResetPassword {
    password: string;
    password_confirmation: string;
}

const schema = z.object({
    password: z.string().min(6, 'A senha deve ter pelo menos 6 caracteres'),
    //.regex(/[A-Z]/, { message: "A senha deve conter pelo menos uma letra maiúscula." })
    //.regex(/[a-z]/, { message: "A senha deve conter pelo menos uma letra minúscula." })
    //.regex(/[0-9]/, { message: "A senha deve conter pelo menos um número." })
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


export default function ResetPasswordForm  ()  {

    const searchParams = useSearchParams();
    const oobCode = searchParams.get("oobCode");
    const [error, setError] = useState("");
    const [success, setSuccess] = useState(false);


    const {register, handleSubmit, formState: {errors, isSubmitting}} = useForm<FormDataResetPassword>({
        resolver: zodResolver(schema),
        mode: "onChange",
    });

    useEffect(() => {
        if (!oobCode) {
            setError("Código de redefinição não fornecido.");
        }
    }, [oobCode]);

    const onSubmit: SubmitHandler<FormDataResetPassword> = async (data) => {

        if (!oobCode) return;

        try {
            await ConfirmPasswordReset(oobCode as string, data.password_confirmation);
            setSuccess(true);
        } catch (err) {
            const error = err as { message?: string };
            setError("Erro ao redefinir a senha. Tente novamente."+ error);
        }
    };

    return (
        <div className="space-y-4">
            <h1>Redefinir Senha</h1>
            {error && <p style={{color: 'red'}}>{error}</p>}
            {success && <p>Senha redefinida com sucesso!</p>}
            <form onSubmit={handleSubmit(onSubmit)}>
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

                <Button className="w-full" type="submit" disabled={isSubmitting}>
                    {isSubmitting ? (
                        <Loader2 className="size-4 animate-spin"/>
                    ) : (
                        'Redefinir Senha'
                    )}
                </Button>
            </form>
        </div>
    );
};


