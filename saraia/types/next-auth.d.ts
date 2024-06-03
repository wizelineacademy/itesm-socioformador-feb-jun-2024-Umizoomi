// next-auth.d.ts
import NextAuth from "next-auth";

declare module "next-auth" {
    interface User {
        id: number;
        name?: string | null;
        email?: string | null;  
    }

    interface Session {
        user: {
            id: number | undefined;
            name: string | undefined;
            email: string | undefined;    
        };
    }

    interface AdapterUser extends User {}

    interface JWT {
        id: number;
        email: string;
        name?: string;
    }
}
