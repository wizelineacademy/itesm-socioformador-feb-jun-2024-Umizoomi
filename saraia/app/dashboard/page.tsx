import CommentSection from "@/components/comment_element/CommentSection"
import Image from "next/image"
import Sidebar from "@/components/sidebar/Sidebar"

export default function DashboardPage(){ 
    return (
        <div id="Container " className="mx-10 flex">
            <Sidebar />
            <div id="SectionContainer" className="flex flex-col justify-center content-between flex-1">
                <h1 className="text-4xl w-1/6 font-bold text-blue-600 my-10 items-end">Welcome Back, User </h1>
                <div id="Flex-Container" className="flex justify-center gap-40">
                    <div id="Graph" className="flex flex-col gap-10">
                        <h2 className="text-2xl font-bold">My Graph</h2>
                        <Image  src="/Graph_My.svg" alt="EquipoUmizoomi" width={500} height={500}/>

                    </div>
                    <div id="Comments " className="flex flex-col gap-5 w-1/4 h-2/3">
                        <h1 className="text-xl text-center font-sans font-bold"> Additional Comments</h1>
                        <CommentSection />
                    </div>
                </div>
            </div>
           
          
        </div>
        
    )
}