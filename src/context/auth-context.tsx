"use client"

import React, {createContext, useContext, useEffect, useState} from 'react';
import {jwtDecode} from 'jwt-decode';
import {signOut} from "@firebase/auth";
import {auth} from '@/lib/firebase';

interface DecodedToken {
    user_id: string;
    email: string;
    exp: number;
    firstLetter: string;
}

interface AuthContextType {
    user: DecodedToken | null;
    loading: boolean;
    logout: () => Promise<void>;
}

const AuthContext = createContext<AuthContextType | undefined>(undefined);

export const AuthProvider: React.FC<{ children: React.ReactNode }> = ({children}) => {
    const [user, setUser] = useState<DecodedToken | null>(null);
    const [loading, setLoading] = useState(true);

    useEffect(() => {
        const token = localStorage.getItem("authToken");

        if (token) {
            try {
                const decoded: DecodedToken = jwtDecode(token);

                const currentTime = Math.floor(Date.now() / 1000);

                if (decoded.exp > currentTime) {
                    console.log("Token valido");
                    const userAux = {
                        user_id: decoded.user_id,
                        email: decoded.email,
                        exp: decoded.exp,
                        firstLetter: decoded.email.charAt(0)
                    }
                    setUser(userAux);
                } else {
                    console.warn("Token expirado.");
                    setUser(null);
                }
            } catch (error) {
                console.error("Erro ao decodificar o token:", error);
                setUser(null);
            }
        } else {
            setUser(null);
        }
        setLoading(false);
    }, []);

    const logout = async () => {
        try {
            await signOut(auth);
            localStorage.removeItem('authToken'); // Remove o token do localStorage
            setUser(null); // Define user como null
        } catch (error) {
            console.error('Erro ao fazer logout:', error);
        }
    };


    return (
        <AuthContext.Provider value={{user, loading, logout}}>
            {children}
        </AuthContext.Provider>
    );
};

export const useAuth = () => {
    const context = useContext(AuthContext);
    if (!context) {
        throw new Error('useAuth deve ser utilizado dentro de um AuthProvider.');
    }
    return context;
};
