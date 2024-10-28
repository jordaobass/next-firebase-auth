"use client";

import {useEffect} from 'react';
import { redirect } from 'next/navigation';
import { useAuth } from '@/hooks/use-auth';

export default function Home() {
  const { user,error, loading } = useAuth();

  useEffect(() => {
    console.log("pagina user", user);
    console.log("pagina loading", loading);
    if (!loading && !user) {
      redirect('/auth/sign-up');
    }
  }, [loading,user, error]);

  return (
      <div>
        {user ? (
            <h1>Bem-vindo, {user.email}</h1>
        ) : (
            <p>Redirecionando...</p>
        )}
      </div>
  );
}
