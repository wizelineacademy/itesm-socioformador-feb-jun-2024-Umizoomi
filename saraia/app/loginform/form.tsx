'use client';
import { FormEvent } from "react";
import { db } from "@/lib/db";
import { signIn } from "next-auth/react";

export default function Form(){
    const handleSubmit = async (e: FormEvent<HTMLFormElement>) => {
        e.preventDefault();
        
        const formData = new FormData(e.currentTarget);
        signIn('credentials', {
            email: formData.get("email"),
            password: formData.get("password"),
            redirect: false, 
        });
      };
      
    return (
        <div className="flex items-center flex-col w-auto gap-3 font-sans">
        <h1 className='text-xl'>
          Login
        </h1>
        <div className=" bg-sky-600 w-1/4 h-0.5 rounded-sm"> </div>
        <form onSubmit={handleSubmit}className="flex flex-col gap-2 mx-auto max-w-md">
          <input name="email" className="border border-black text-black" type="email"></input>
          <input name="password" className="border border-black text-black" type="password"></input>
          <button type="submit">Login</button>
        </form>
        <div className=" bg-sky-600 w-1/4 h-0.5 rounded-sm"> </div>
      </div>
    );

}


