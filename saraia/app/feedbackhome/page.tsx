//"use client";
import Sidebar from "@/components/sidebar/Sidebar"
import { useState, useEffect } from 'react';
import TeamMembersCard from "@/components/Cards/TeamMembersCard";
import { TeamMembersGet } from "@/lib/db";

export default async function Home() {
  type SelectedMember = {
    id_user: number | any;
    username: string | any;
};
  //const [selectedMembers, setSelectedMembers] = useState<SelectedMember[]>(
  //  []
  //);;

  //useEffect(() => {
  //  const fetchData = async () => {
  //    try {
  //      const response = await fetch(
  //        "http://localhost:3000/api/team"
  //      );
  //      if (!response.ok) {
  //        throw new Error("Failed to fetch data");
  //      }
  //      const data = await response.json();
  //      setSelectedMembers(data);
  //    } catch (error) {
  //      console.error("Error fetching data:", error);
  //    }
  //  };

  //  fetchData();
  //}, []);
const selectedMembers = await TeamMembersGet()

  return (
    <div id="Container" className="mx-10 flex">
        <Sidebar/>
        <div className="flex flex-col min-h-screen w-screen bg-gray-100 p-4">
            <h1 className="text-4xl font-bold flex justify-center">Feedback</h1>
            <h2 className="text-4xl font-bold mt-4">Proyecto...</h2>
            <h3 className="text-3xl mt-2">Realiza Feedback a tus compañeros de equipo:</h3>
            <div className="flex flex-col items-center mt-6 space-y-4">
                {selectedMembers.map((member, index) => (
                <TeamMembersCard 
                key={index}
                id_user={member.id_user!}
                username={member.username!}
                />
                ))}
            </div>
            <button className="text-white py-4 px-16 rounded-lg mt-auto self-end bg-cyan-600">
                Continuar
            </button>
        </div>
    </div>
  );
} 

//"use client";
//import Sidebar from "@/components/sidebar/Sidebar";
//import { useState } from "react";
//import { GetServerSideProps } from "next";
//import { getTeamMembers } from "@/lib/db";

//export const getServerSideProps: GetServerSideProps = async () => {
//  const teamMembers = await getTeamMembers();
//  return { props: { teamMembers } };
//};

//type Props = {
//  teamMembers: string[];
//};

//const Home = ({ teamMembers }: Props) => {
//  const [selectedMember, setSelectedMember] = useState<number | null>(null);

//  return (
//    <div id="Container" className="mx-10 flex">
//        <Sidebar/>
//        <div className="flex flex-col min-h-screen w-screen bg-gray-100 p-4">
//        <h1 className="text-3xl font-bold flex justify-center">Feedback</h1>
//            <h2 className="text-xl font-bold mt-4">Proyecto...</h2>
//            <h3 className="text-lg mt-2">Realiza Feedback a tus compañeros de equipo:</h3>
//            <div className="flex flex-col items-center mt-6 space-y-4">
//                {teamMembers.map((member, index) => (
//                <button
//                    key={index}
//                    onClick={() => setSelectedMember(index)}
//                    className={`w-64 py-2 rounded-lg text-white ${
//                    selectedMember === index ? 'bg-blue-500' : 'bg-gray-500'
//                    }`}
//                >
//                    {member}
//                </button>
//                ))}
//            </div>
//            <button className="bg-dark-cyan text-white py-2 px-4 rounded-lg mt-auto self-end">
//                Continuar
//            </button>
//        </div>
//    </div>
//  );
//};

//export default Home;