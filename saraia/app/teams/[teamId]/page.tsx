import {Miembro , columns } from "./columns"
import { DataTable } from "./data-table"
import Sidebar from "@/components/sidebar/Sidebar"

type TeamName = {
  teamName: string;
};

type UserTeamsProps = {
  initialTeamNames: TeamName[];
};

const API_URL = '/api/teamdata';

async function getData(TeamId : number): Promise<Miembro[]> {
  try {
    const response = await fetch(`${API_URL}?teamid=${TeamId}`);
    console.log(response);
    if (!response.ok) {
      throw new Error('Failed to fetch data');
    }
    const tabledata = await response.json();
    
    return tabledata;
  } catch (error) {
    console.error('Error fetching data:', error);
    return [];
  }
}



export default async function Teams({
    params,
}: {
  params: {teamId: number};
}) {
  const data = await getData(params.teamId)
  console.log(data);

  return (
    <div  id="container" className="flex ">
        <Sidebar />
        <div className=" flex-col flex gap-10 my-5 mx-10 flex-1">
            
            <h1 className="text-3xl font-sans font-bold">Team Details</h1>
            <DataTable columns={columns} data={data} />

        </div>
    </div>


  )
}


