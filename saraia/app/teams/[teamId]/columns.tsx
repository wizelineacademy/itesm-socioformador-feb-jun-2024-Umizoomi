"use client"

import { ColumnDef } from "@tanstack/react-table"
import { MdArrowForwardIos } from "react-icons/md";
 
import { Button } from "@/components/ui/button"

// This type is used to define the shape of our data.
// You can use a Zod schema here if you want.
export type Miembro = {
  name: string
  grade: number
  position: string
  date: Date
}

export const columns: ColumnDef<Miembro>[] = [
    {
        accessorKey: "name",
        header: "Name",
      },
      {
        accessorKey: "grade",
        header: "Grade",
      },
      {
        accessorKey: "position",
        header: "Equipo",
      },
      {
        accessorKey: "date",
        header: "Date Submitted",
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
