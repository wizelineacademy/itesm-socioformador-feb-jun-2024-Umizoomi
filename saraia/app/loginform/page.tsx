import {Form} from "./form";
import  {Input} from "@/components/ui/input";

export default function LogisnPage(){
    return (
        <div className="flex items-center flex-col w-auto gap-8 font-sans">
            <h1 className='text-2xl font-sans font-normal	'>
            Login
            </h1>
            <div className=" bg-slate-900 w-full h-0.5 rounded-sm"> </div>
            <Form />

        </div>

    )
}