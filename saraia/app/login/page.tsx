import { Button } from "@/components/ui/button"
import Image from "next/image";
import LoginPage from "../loginform/page";

const Login: React.FC = () => {
  return (
    <div className="h-screen flex justify-center items-center bg-custom-dark bg-opacity-95">
      <div id="LoginContainer" className='bg-slate-50 w-5/6 h-3/6 rounded-lg flex justify-center max-w-4xl min-w-s'>
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

export default Login;