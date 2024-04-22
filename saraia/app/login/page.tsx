import { Button } from "@/components/ui/button"
import Image from "next/image";
import LoginForm from "../loginform/page";

const Login: React.FC = () => {
  return (
    <div className="bg-gradient-custom h-screen flex justify-center items-center bg-gradient-to-b from-blue-950 to-cyan-500">
      <div id="LoginContainer" className='bg-slate-50 w-2/3 h-5/6 rounded-lg flex'>
        <div id="Login-Left" className="flex justify-center items-center">
          <div className=" bg-slate-100 shadow-md h-2/3 w-2/3">
            <Image src="/UmizoomiN.png" alt="EquipoUmizoomi" width={500} height={500} />
          </div>
        </div>
        <div id="SeparationLine" className="h-auto flex bg-gradient-to-b from-blue-400 to-blue-900 w-1 my-12">
        </div>
        <div id="Login-Right" className="flex justify-center items-center w-full lg:w-1/2 p-8">
          <LoginForm />
        </div>
      </div>
    </div>
  );
};

export default Login;