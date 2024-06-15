"use client";
import { Button } from "@/components/ui/button";
import { Miembro, columns } from "./columns";
import { DataTable } from "./data-table";
import Sidebar from "@/components/sidebar/Sidebar";
import { useEffect, useState } from 'react';
import AddNewMember from "@/components/AddNewMember";
import Link from 'next/link'


type TeamName = {
  teamName: string;
};



 

const API_URL = '/api/teammates';
const USER_ID_API_URL = '/api/getSessionId';

async function getData(teamId: number): Promise<Miembro[]> {
  try {
    const response = await fetch(`${API_URL}?teamid=${teamId}`);
    if (!response.ok) {
      throw new Error('Failed to fetch data');
    }
    const data = await response.json();
    return data.rows;
  } catch (error) {
    console.error('Error fetching data:', error);
    return [];
  }
}

async function getUserId(): Promise<string | null> {
  try {
    const response = await fetch(USER_ID_API_URL);
    if (!response.ok) {
      throw new Error('Failed to fetch user ID');
    }
    const data = await response.json();
    return data.userId;
  } catch (error) {
    console.error('Error fetching user ID:', error);
    return null;
  }
}


export default function Teams({ params }: { params: { teamId: number } }) {
  
  const [tabledata, setTableData] = useState<Miembro[]>([]);
  const [userId, setUserId] = useState<string | null>(null);

  useEffect(() => {
    const fetchData = async () => {
      const fetchedData = await getData(params.teamId);
      setTableData(fetchedData);
    };
    fetchData();
  }, [params.teamId]);
  useEffect(() => {
    const fetchUserId = async () => {
      const id = await getUserId();
      setUserId(id);
    };
    fetchUserId();
  }, []);

  return (
    <div id="container" className="flex">
      <Sidebar />
      <div className="flex-col flex gap-10 my-5 mx-10 flex-1">
        <div className="flex justify-between">
          <h1 className="text-3xl font-sans font-bold">Team Details</h1>
          <AddNewMember teamId={params.teamId} />
        </div>
        
        <DataTable columns={columns} data={tabledata} />
        <Button asChild>
        <Link
            href={{
              pathname: '/chat',
              query: { userId: userId as string , teamId: params.teamId},
            }}
          >
            Talk to Sara
          </Link>
        </Button>


      </div>
    </div>
  );
}
