"use client"

import {Projecto , columns } from "./columns"
import { DataTable } from "./data-table"
import Sidebar from "@/components/sidebar/Sidebar"
import { Button } from "@/components/ui/button"
import Link from "next/link"
import { useEffect, useState } from 'react';
import CreateTeamModal from "@/components/Modals/CreateTeamModal"
import { useSession } from "next-auth/react";

type TeamName = {
  teamName: string;
};

type UserTeamsProps = {
  initialTeamNames: TeamName[];
};

const API_URL = '/api/teams';

async function getData(userId : string): Promise<Projecto[]> {
  try {
    const response = await fetch(`${API_URL}?userId=${userId}`);
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

export default function Teams() {
  const { data: session, status } = useSession();
  const userId = session?.user.id;

  const [tabledata, setTableData] = useState<Projecto[]>([]);
  useEffect(() => {
    const fetchData = async () => {
      const fetchedData = await getData(userId as string);

      setTableData(fetchedData);
    };
    fetchData();
  }, [session?.user.id]);
  

  if (status === "authenticated") {
    return (
      <div  id="container" className="flex ">
          <Sidebar />
          <div className=" flex-col flex gap-10 my-5 mx-10 flex-1">
              <div id="Header" className="flex justify-between">
                <h1 className="text-3xl font-sans font-bold">Teams</h1>
                <CreateTeamModal />
              </div>
              <DataTable columns={columns} data={tabledata} />
  
          </div>
      </div>
  
  
    )
  }
  return <a href="/api/auth/signin">Sign in</a>

 
}
