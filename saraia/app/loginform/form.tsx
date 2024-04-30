'use client';
import { FormEvent } from "react";
import { db } from "@/lib/db";
import { signIn } from "next-auth/react";
import  {Input} from "@/components/ui/input";
import { Label } from "@/components/ui/label"
import { Button } from "@/components/ui/button";

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
        <div className="flex items-center flex-col w-auto gap-8 font-sans">
        <h1 className='text-2xl font-sans font-normal	'>
          Login
        </h1>
        <div className=" bg-sky-600 w-full h-0.5 rounded-sm"> </div>
        <form onSubmit={handleSubmit} className="flex flex-col gap-4">
          <Label htmlFor="email">Email</Label>

          <Input name="email"  type="email" placeholder="Email"></Input>
          <Label htmlFor="password">Password</Label>

          <Input name="password" type="password" placeholder="Password"></Input>
          <div className=" bg-sky-600 h-0.5 rounded-sm"> </div>

          <Button type="submit">Login</Button>
        </form>
      </div>
    );

}

