import CommentSection from "@/components/comment_element/CommentSection"
import Sidebar from "@/components/sidebar/Sidebar"

export default function HomePage(){ 
    return (
        <div id="Container" className="mx-10 flex">
            <Sidebar />
            <div id="SectionContainer" className="flex flex-col flex-1 bg-slate-400 p-10">
                <h1 className="text-4xl font-bold text-blue-600 my-10 text-center">Welcome Back, User</h1>
                <div id="Flex-Container" className="flex justify-between">
                    <div className="flex flex-col items-center w-2/3">
                        <h2 className="text-2xl font-bold mb-4">My Graph</h2>
                        <div id="Graph" className="w-full p-10 bg-gray-300 shadow-md"></div>
                    </div>
                    <div id="Comments" className="flex flex-col items-center justify-center w-1/3">
                        <h1 className="text-xl font-sans font-bold text-center">Additional Comments</h1>
                        <div className="w-full flex justify-center">
                            <CommentSection />
                        </div>
                    </div>
                </div>
            </div>
        </div>
    )
}
