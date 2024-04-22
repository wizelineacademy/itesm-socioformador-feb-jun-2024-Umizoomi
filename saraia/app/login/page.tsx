import { Button } from "@/components/ui/button"
import Image from "next/image";
import LoginForm from "../loginform/page";

const Login: React.FC = () => {
  return (
    <div className="bg-gradient-custom flex justify-center items-center h-screen bg-gradient-to-b from-blue-950 to-cyan-500">
      <div id="LoginContainer" className='bg-slate-50 w-2/3 h-5/6 rounded-lg flex items-center justify-center gap-10'>
        <div id="Login-Left" className="flex justify-center items-center">
            <Image src="/UmizoomiN.png" alt="EquipoUmizoomi" width={300 } height={300} />
        </div>
        <div id="SeparationLine" className="w-1 bg-gradient-to-b from-blue-400 to-blue-900 h-2/3 my-12">
          
        </div>
        <LoginForm />
      </div>
    </div>
  );
};

export default Login;