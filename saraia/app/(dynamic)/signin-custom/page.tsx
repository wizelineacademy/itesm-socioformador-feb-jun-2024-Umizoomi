import SignOutBtnCustom from "@/components/signout-btn-custom";
import SignInBtnCustom from "@/components/signin-btn-custom";
import {auth} from "@/lib/auth"

export const dynamic = 'force-dynamic'

export default async function Page(){ 
    const session = await auth();

    if(session){ 
        return (
            <div>
                <div>Signed in as: {session.user.name}</div>
                <SignOutBtnCustom />
            </div>
        )
    }

    return <div>
            <h1>Sign in Custom</h1>
            <SignInBtnCustom provider={{id: "github", name: "Github"}} />    
    </div>  

}