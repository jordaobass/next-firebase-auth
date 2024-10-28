import HeaderAuth from "@/components/header-auth";
import {AuthProvider} from "@/context/auth-context";
import React from "react";


export default function AuthLayout({
                                       children,
                                   }: Readonly<{
    children: React.ReactNode
}>) {

    return (
        <>
            <AuthProvider>
                <HeaderAuth/>
                <div className="flex min-h-screen flex-col items-center justify-center px-4 bg-gray-100">
                    {children}
                </div>

            </AuthProvider>
        </>
    )
}