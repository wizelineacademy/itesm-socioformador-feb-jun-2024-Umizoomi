import {Projecto , columns } from "./columns"
import { DataTable } from "./data-table"
import Sidebar from "@/components/sidebar/Sidebar"

async function getData(): Promise<Projecto[]> {
  // Fetch data from your API here.
  return [
    {
      nombre: "Umizoomi",
      area: "Software",
      equipo: "Kraken Alejandro",
    }, 
    {
        nombre: "Development Team Alpha",
        area: "Software Development",
        equipo: "Alpha Coders",
    },  {
        nombre: "Marketing Mavericks",
        area: "Marketing",
        equipo: "Marketing Wizards",
      },
      {
        nombre: "Finance Force",
        area: "Finance",
        equipo: "Money Masters",
      },
      {
        nombre: "Customer Success Champions",
        area: "Customer Success",
        equipo: "Success Squad",
      },
      {
        nombre: "Operations Optimizers",
        area: "Operations",
        equipo: "Ops Geniuses",
      },
      {
        nombre: "Design Dream Team",
        area: "Design",
        equipo: "Creative Creators",
      },
      {
        nombre: "Sales Superstars",
        area: "Sales",
        equipo: "Sales Titans",
      },
      {
        nombre: "Human Resources Heroes",
        area: "HR",
        equipo: "HR Guardians",
      },
      {
        nombre: "Product Management Pros",
        area: "Product Management",
        equipo: "Product Visionaries",
      },
      {
        nombre: "Quality Assurance Squad",
        area: "Quality Assurance",
        equipo: "QA Heroes",
      }
    // ...
  ]
}

export default async function DemoPage() {
  const data = await getData()

  return (
    <div  id="container" className="flex ">
        <Sidebar />
        <div className=" flex-col flex gap-10 my-5 mx-10 flex-1">
            
            <h1 className="text-3xl font-sans font-bold">Teams</h1>
            <DataTable columns={columns} data={data} />

        </div>
    </div>


  )
}
