    'use client';
    import { FormEvent } from "react";
    import { db } from "@/lib/db";

    export default function Form(){
        const handleSubmit = async (e: FormEvent<HTMLFormElement>) => {
            e.preventDefault();
            const formData = new FormData(e.currentTarget);
            const email = formData.get('email')
            const password = formData.get('password')
            const username = formData.get('username')

            if(email == ""){
              console.error("email no debe estar vacio")
              return
            }

            if(password == ""){
              console.error("password no debe estar vacio")
              return
            }

            if(username == ""){
              console.error("username no debe estar vacio")
              return
            }

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

              <h3>Email</h3>
              <input name="email" className="border border-black text-black" type="email" required></input>
              
              <h3>Username</h3>

              <input name="username" className="border border-black text-black" required></input>

              <h3>Password</h3>
              <input name="password" className="border border-black text-black" type="password" required></input>

              <button type="submit">Register</button>
            </form>
            <div className=" bg-sky-600 w-1/4 h-0.5 rounded-sm"> </div>
          </div>
        );

    }
    
    
    