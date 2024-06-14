import Link from "next/link";
import { Button } from "@/components/ui/button"
import { auth } from "@/auth/auth";
import { redirect } from "next/navigation";
export default async function Login(){
  const session = await auth()
  if(session){
    redirect('/dashboard');
  }
  return (
    <div className="h-screen w-screen flex justify-center items-center bg-custom-dark bg-opacity-95">
      <Button asChild>
        <Link href="/api/auth/signin">Login</Link>
      </Button>
    </div>
  );
};

