import {useEffect, useState} from "react";
import {jwtDecode} from "jwt-decode";

interface DecodedToken {
    user_id: string;
    email: string;
    exp: number;
    firstLetter: string;
}

export function useAuth() {
    const [user, setUser] = useState<DecodedToken | null>(null);
    const [error, setError] = useState<string | null>(null);
    const [loading, setLoading] = useState(true);

    useEffect(() => {
        const token = localStorage.getItem("authToken");
        console.log("Validando token");
        if (token) {
            try {
                console.log("token:", token);
                const decoded: DecodedToken = jwtDecode(token);

                console.log("decoded", decoded);
                console.log(" Verifica se o token expirou");
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
                    console.log(" setUser(decoded)");
                } else {
                    console.warn("Token expirado.");
                    setUser(null);
                }
            } catch (error) {
                console.error("Erro ao decodificar o token:", error);
                setError("Erro ao decodificar o token.");
                setUser(null);
            }
        } else {
            console.log("token invalido", token);
            setUser(null);
        }
        setLoading(false)
    }, []);

    return {user, error, loading};
}
