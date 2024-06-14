'use client';

import Sidebar from "@/components/sidebar/Sidebar";
import { useSession } from "next-auth/react";
import Userchart from "@/components/UserChart/userchart";

export default function DashboardPage ()  {
    
    const { data: session, status } = useSession()
    if (status === "authenticated") {
        return (
            
            <div id="Container" className="mx-10 flex">
                    <Sidebar />
                    <div id="SectionContainer" className="flex flex-col justify-center content-between flex-1">
                        <h1 className="text-4xl w-1/6 font-bold text-blue-600 my-10 items-end">
                            {`Welcome Back, ${session.user?.name}`}
                        </h1>
                        <h2 className="text-3xl font-bold">My Graph</h2>
                                <Userchart />

                    </div>
            </div>
        )
        
    }
    return <a href="/api/auth/signin">Sign in</a>

};

