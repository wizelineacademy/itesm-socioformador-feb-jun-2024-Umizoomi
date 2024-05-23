// next-auth.d.ts
import NextAuth from "next-auth";

declare module "next-auth" {
    interface User {
        id: string;
        name?: string | null;
        email?: string | null;  
    }

  interface Session {
    user: {
        id: string | undefined;
        name: string | undefined;
        email?: string | undefined;    
    };
  }
  interface AdapterUser extends User {}


  interface JWT {
    id: string;
    email: string;
    name?: string;
  }
}
