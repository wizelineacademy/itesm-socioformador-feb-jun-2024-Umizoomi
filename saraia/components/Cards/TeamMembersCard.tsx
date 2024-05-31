import React from "react";
import Image from "next/image";

type Props = {
    id_user: number | any;
    username: string | any;
};

const TeamMembersCard = ({id_user, username}: Props) => {
  return (
    <button>
    <div className="flex flex-col items-center mt-6 space-y-4">
      <p className="w-80 py-4 rounded-lg text-white bg-blue-500 ">
        {username}
      </p>
      
      
    </div>
    </button>
  );
};

export default TeamMembersCard;
