'use client'

import Link from "next/link"
import {
    DropdownMenu,
    DropdownMenuTrigger,
    DropdownMenuContent,
    DropdownMenuItem,
    DropdownMenuSeparator
} from "@/components/ui/dropdown-menu"
import {Avatar, AvatarImage, AvatarFallback} from "@/components/ui/avatar"
import {AnvilIcon} from "lucide-react";
import {useAuth} from '@/context/auth-context';
import {useEffect} from "react";
import {redirect} from "next/navigation";

export default function HeaderAuth() {
    const {user, loading, logout} = useAuth();

    useEffect(() => {
        console.log("1 useEffect");
        console.log("LOADING:" + loading);
        console.log("user:" + user);
        if (!loading && !user) {
            redirect('/auth/sign-up');
        }

    }, [user, loading]);

    if (loading) {
        return <p>Carregando...</p>;
    }

    return (

        <>

            <header className="flex h-20 w-full shrink-0 items-center px-4 md:px-6">
                <Link href="#" className="mr-6 flex items-center" prefetch={false}>
                    <AnvilIcon className="h-6 w-6"/>
                    <span className="sr-only">Nexttag Inc</span>
                </Link>
                <nav className="hidden lg:flex">
                    <ul className="flex items-center space-x-4">
                        <li>
                            <Link href="#" className="text-sm font-medium hover:underline underline-offset-4"
                                  prefetch={false}>
                                Home
                            </Link>
                        </li>

                    </ul>
                </nav>
                <div className="ml-auto">
                    <DropdownMenu>
                        <DropdownMenuTrigger asChild>
                            <Avatar className="h-9 w-9">
                                <AvatarImage src="/placeholder-user.jpg" alt="@shadcn"/>
                                <AvatarFallback>{user?.firstLetter}</AvatarFallback>
                                <span className="sr-only">Toggle user menu</span>
                            </Avatar>
                        </DropdownMenuTrigger>
                        <DropdownMenuContent>
                            {/*<DropdownMenuItem>My Account</DropdownMenuItem>
                        <DropdownMenuItem>Settings</DropdownMenuItem>*/}
                            <DropdownMenuSeparator/>
                            <DropdownMenuItem onClick={logout}>Logout</DropdownMenuItem>
                        </DropdownMenuContent>
                    </DropdownMenu>
                </div>
            </header>


        </>

    )
}