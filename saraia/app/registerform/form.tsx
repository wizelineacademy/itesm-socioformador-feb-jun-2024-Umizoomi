    'use client';
    import { FormEvent } from "react";
    import { db } from "@/lib/db";

    export default function Form(){
        const handleSubmit = async (e: FormEvent<HTMLFormElement>) => {
            e.preventDefault();
            const formData = new FormData(e.currentTarget);
            const response = await fetch(`/api/auth/register`, {
              method: 'POST',
              body: JSON.stringify({
                email: formData.get('email'),
                password: formData.get('password'),
                username: formData.get('username'),
              })
            });
            console.log({response})
          };
        return (
            <div className="flex items-center flex-col w-auto gap-3 font-sans">
            <h1 className='text-xl'>
              Login
            </h1>
            <div className=" bg-sky-600 w-1/4 h-0.5 rounded-sm"> </div>
            <form onSubmit={handleSubmit} className="flex flex-col gap-2 mx-auto max-w-md">

              <input name="email" className="border border-black text-black" type="email"></input>
              <input name="password" className="border border-black text-black" type="password"></input>
              <input name="username" className="border border-black text-black"></input>

              <button type="submit">Register</button>
            </form>
            <div className=" bg-sky-600 w-1/4 h-0.5 rounded-sm"> </div>
          </div>
        );

    }
    
    
    