"use client";

import { Miembro, columns } from "./columns";
import { DataTable } from "./data-table";
import Sidebar from "@/components/sidebar/Sidebar";
import { useEffect, useState } from 'react';

type TeamName = {
  teamName: string;
};

type UserTeamsProps = {
  initialTeamNames: TeamName[];
};

const API_URL = '/api/teammates';

async function getData(teamId: number): Promise<Miembro[]> {
  try {
    const response = await fetch(`${API_URL}?teamid=${teamId}`);
    if (!response.ok) {
      throw new Error('Failed to fetch data');
    }
    const data = await response.json();
    return data.rows; // Extract and return only the rows array
  } catch (error) {
    console.error('Error fetching data:', error);
    return [];
  }
}

export default function Teams({ params }: { params: { teamId: number } }) {
  const [tabledata, setTableData] = useState<Miembro[]>([]);

  useEffect(() => {
    const fetchData = async () => {
      const fetchedData = await getData(params.teamId);
      setTableData(fetchedData);
    };
    fetchData();
  }, [params.teamId]);

  return (
    <div id="container" className="flex">
      <Sidebar />
      <div className="flex-col flex gap-10 my-5 mx-10 flex-1">
        <h1 className="text-3xl font-sans font-bold">Team Details</h1>
        <DataTable columns={columns} data={tabledata} />
      </div>
    </div>
  );
}
