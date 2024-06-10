import Chat from "@/components/chat"
import Sidebar from "@/components/sidebar/Sidebar"
export default function Chatbot() {
    return (
        <div className="flex">
            <Sidebar />
            <Chat  />
        </div>

    )
}