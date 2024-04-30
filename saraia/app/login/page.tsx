import { Button } from "@/components/ui/button"
import Image from "next/image";
import LoginPage from "../loginform/page";

const Login: React.FC = () => {
  return (
    <div className="bg-gradient-custom h-screen flex justify-center items-center bg-gradient-to-b from-blue-950 to-cyan-500">
      <div id="LoginContainer" className='bg-slate-50 w-2/3 h-5/6 rounded-lg flex justify-center'>
        <div id="Login-Right" className="flex justify-center items-center md:w-1/2 p-8">
          <LoginPage />
        </div>
        <div id="Login-Left" className="flex justify-center items-center md:w-1/2">
            <Image className="hidden md:block" src="/SaraIa_Login.svg" alt="EquipoUmizoomi" width={500} height={500} />
        </div>
        
      </div>
    </div>
  );
};

export default Login;