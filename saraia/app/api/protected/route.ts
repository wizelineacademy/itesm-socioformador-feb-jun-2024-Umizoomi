import {auth} from "@/lib/auth";
import { NextResponse } from "next/server";

export const dynamic = 'force-dynamic'


export async function GET(){
    const session = await auth();

    
        
    if(!session){
        return NextResponse.json({message: "unauthenticated"}, {status:401})
    
    }

    else{
    return NextResponse.json({name: session?.user.name});

    }


}