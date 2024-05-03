"use client"

import { ColumnDef } from "@tanstack/react-table"
import { MdArrowForwardIos } from "react-icons/md";
 
import { Button } from "@/components/ui/button"

// This type is used to define the shape of our data.
// You can use a Zod schema here if you want.
export type Projecto = {
  nombre: string
  area: string
  equipo: string
}

export const columns: ColumnDef<Projecto>[] = [
    {
        accessorKey: "nombre",
        header: "Nombre",
      },
      {
        accessorKey: "area",
        header: "Area",
      },
      {
        accessorKey: "equipo",
        header: "Equipo",
      },
    
    {
        id:"actions",
        cell: ({row}) => {
            const equipo = row.original

            return (
                <Button variant="outline" size="icon">
                    <MdArrowForwardIos className="h-4 w-4" />
                </Button>
            )
        }
    },

]
