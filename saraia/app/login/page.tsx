
import { Button } from "@/components/ui/button"

const Login: React.FC = () => {
  return (
    <div className="bg-gradient-custom h-screen flex justify-center items-center">
      <div id="LoginContainer" className='bg-slate-50 w-2/3 h-2/3 rounded-lg '>
        <div id="Login-Left">

        </div>
        <div id="SeparationLine">
          
        </div>
        <div id="LoginRightComponent">
          <Button variant="outline">Button</Button>

        </div>
      </div>
    </div>
  );
};

export default Login;