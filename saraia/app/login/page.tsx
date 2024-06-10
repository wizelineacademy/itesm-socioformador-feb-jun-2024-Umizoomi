import { Button } from "@/components/ui/button"
import Image from "next/image";
import LoginPage from "../loginform/page";
import { getServerSession } from "next-auth";
import { redirect } from "next/navigation";

export default async function Login(){
  const session = await getServerSession();
  if (session) {
    redirect('/');
  }
  return (
    <div className="h-screen flex justify-center items-center bg-custom-dark bg-opacity-95">
      <div id="LoginContainer" className='bg-slate-50 w-5/6 h-5/6 rounded-lg flex justify-center max-w-7xl '>
        <div id="Login-Right" className="flex justify-center items-center lg:w-full">
          <LoginPage />
        </div>
        <div id="Login-Left" className="relative lg:w-full lg:h-full bg-custom-dark">
            <Image className="hidden md:block" src="/Login-Left.svg" alt="EquipoUmizoomi"   layout="fill" objectFit="contain"/>
        </div>
        
      </div>
    </div>
  );
};

