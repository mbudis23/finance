'use client';

import { ReactNode, useEffect, useState } from "react";
import { useRouter } from "next/navigation";

interface ProtectedLayoutProps {
    children: ReactNode;
    token: string | null;
}

export default function ProtectedLayout( {children, token} : ProtectedLayoutProps){
    const router = useRouter();
    const [loading, setLoading] = useState(true);
    const [isAuthenticated, setIsAuthenticated] = useState(false);

    useEffect(()=>{
        const checkAuth = () => {
            if(!token){
                console.log('Token not found, redirecting to login');
                router.push("login");
            } else {
                setIsAuthenticated(true);
                setLoading(false);
            }
        }
        checkAuth();
    }, [token, router]);
    if (loading) {
        return (
            <div>Loading....</div>
        )
    }
    if (!isAuthenticated){
        return null;
    }
    return(
        <>
            {children}
        </>
    )
}