import {auth} from "@/lib/auth";
import { redirect } from "next/navigation";

export const dynamic = 'force-dynamic'


export default async function Page() {
    const session = await auth();
    
    if(!session) {
        redirect("/signin-auto")
    }

    else{
    return <div>{session.user.name}</div>
    }

}