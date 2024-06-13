'use client';
import { FormEvent } from "react";
import { signIn } from "@/auth/auth"
import  {Input} from "@/components/ui/input";
import { Label } from "@/components/ui/label"
import { Button } from "@/components/ui/button";
import  { useRouter } from "next/navigation";

export function Form(){
    return (
        <div className="flex items-center flex-col w-auto gap-8 font-sans">
        <h1 className='text-2xl font-sans font-normal	'>
          Login
        </h1>
        <div className=" bg-slate-900 w-full h-0.5 rounded-sm"> </div>
        <form>
          <Label htmlFor="email">Email</Label>
          <Input name="email"  type="email" placeholder="Email"></Input>
          <div className=" bg-slate-900 h-0.5 rounded-sm"> </div>

          <Button className="my-5" type="submit">Login</Button>
        </form>
      </div>
    );

}


