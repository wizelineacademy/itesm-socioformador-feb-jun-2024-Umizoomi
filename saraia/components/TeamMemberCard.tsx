
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar"
import { Badge } from "./ui/badge"
export default function MemberCard() {
    return (
        <div className="w-96 border-2 border-slate-50  h-96 rounded-xl flex flex-col items-center gap-5">
            <Avatar className="w-1/4 h-1/4 mt-10">
                <AvatarImage src="https://github.com/shadcn.png" />
                <AvatarFallback>CN</AvatarFallback>
            </Avatar>
            <h1 className=" text-2xl font-sans text-black">Name</h1>
            <Badge variant={"secondary"} className="bg-green-300 font-bold p-2 rounded-lg">Project Manager</Badge>
            <h2 className=" text-2xl font-sans text-black">Team Compatibility</h2>
            <h2 className=" text-xl font-sans text-green-500 font-bold">Very Compatible</h2>



        </div>
    )
}