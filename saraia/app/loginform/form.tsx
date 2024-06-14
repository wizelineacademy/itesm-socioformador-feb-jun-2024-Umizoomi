import { FormEvent } from "react";
import { signIn } from "@/auth/auth"
import  {Input} from "@/components/ui/input";
import { Label } from "@/components/ui/label"
import { Button } from "@/components/ui/button";

export function Form(){
    return (
      <form
      action={async (formData) => {
        "use server"
        await signIn("resend", formData)
      }}>
          <Label htmlFor="email">Email</Label>
          <Input name="email"  type="text" placeholder="Email"></Input>
          <div className=" bg-slate-900 h-0.5 rounded-sm"> </div>

          <Button className="my-5" type="submit">Sign in with ReSend</Button>
        </form>
    );

}


