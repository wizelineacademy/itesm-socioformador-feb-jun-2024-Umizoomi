import { SessionProvider } from "next-auth/react";
import { ReactNode } from "react";
import { auth } from "@/auth/auth";
//export const dynamic = 'force-dynamic'

export default async function Layout({children} : {children: ReactNode}){
    const session = await auth();
    return (
        <SessionProvider session={session}>
            <div>{children}</div>
        </SessionProvider>
    )
}
