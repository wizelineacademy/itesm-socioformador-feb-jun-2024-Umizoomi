import MemberCard from "@/components/TeamMemberCard"

import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar"

export default function TeamOrganization(){
    return (
        <MemberCard>
            <Avatar>
  <AvatarImage src="https://github.com/shadcn.png" />
  <AvatarFallback>CN</AvatarFallback>
</Avatar>

        </MemberCard>
    )
}