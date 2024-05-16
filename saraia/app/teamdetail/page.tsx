import {Miembro , columns } from "./columns"
import { DataTable } from "./data-table"
import Sidebar from "@/components/sidebar/Sidebar"

async function getData(): Promise<Miembro[]> {
  const currDate = new Date();
  return [
    {
      name: "Phoenix",
      grade: 9.2,
      position: "Designer",
      date: currDate
      },
      {
      name: "Storm",
      grade: 7.8,
      position: "Tester",
      date: currDate
      },
      {
      name: "Cerberus",
      grade: 8.9,
      position: "Security Analyst",
      date: currDate
      },
      {
      name: "Chimera",
      grade: 9.5,
      position: "Data Scientist",
      date: currDate
      },
      {
      name: "Manticore",
      grade: 8.1,
      position: "Project Manager",
      date: currDate
      },
      {
      name: "Hydra",
      grade: 7.9,
      position: "Content Writer",
      date: currDate
      },
      {
      name: "Griffin",
      grade: 8.7,
      position: "Marketing Specialist",
      date: currDate
      },
      {
      name: "Basilisk",
      grade: 9.0,
      position: "Sales Manager",
      date: currDate
      },
      {
      name: "Siren",
      grade: 8.4,
      position: "Customer Support",
      date: currDate
      },
      {
      name: "Centaur",
      grade: 8.3,
      position: "Business Analyst",
      date: currDate
      }
  ]

}

export default async function Teams() {
  const data = await getData()

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
