"use client";

import {signOut} from "next-auth/react";

export default function signOutBtnCustom() {
    return <button onClick={() => signOut()}>Sign Out</button>;  
}