import { OAuthProviderType } from "next-auth/providers/oauth-types";
import {signIn} from "next-auth/react"

export default function SignInBtnCustom({
    provider,
}: {
    provider: {id:OAuthProviderType; name:string};
}) {
    return (
        <button onClick={() => signIn(provider.id)}>
            sign in with {provider.name}
        </button>
    );
}