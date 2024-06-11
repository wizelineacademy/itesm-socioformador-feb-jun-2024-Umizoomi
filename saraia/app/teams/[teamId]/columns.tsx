"use client"

import { ColumnDef } from "@tanstack/react-table"
import { MdArrowForwardIos } from "react-icons/md";
import { ArrowUpDown, ChevronDown, MoreHorizontal } from "lucide-react"


import { Button } from "@/components/ui/button"
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuLabel,
  DropdownMenuSeparator,
  DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu"


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
        accessorKey: "username",
        header: "Name",
      },
      {
        accessorKey: "job_title",
        header: "position",
      },
      {
        accessorKey: "team_name",
        header: "Team Name",
      },
      {
        accessorKey: "overall_avarage",
        header: "Grade",
      },
      {
        id: "actions",
        enableHiding: false,
        cell: ({ row }) => {
          const payment = row.original
     
          return (
            <DropdownMenu>
              <DropdownMenuTrigger asChild>
                <Button variant="ghost" className="h-8 w-8 p-0">
                  <span className="sr-only">Open menu</span>
                  <MoreHorizontal className="h-4 w-4" />

                </Button>
              </DropdownMenuTrigger>
              <DropdownMenuContent align="end">
                <DropdownMenuLabel>Actions</DropdownMenuLabel>
                <DropdownMenuItem>Remove</DropdownMenuItem>
                <DropdownMenuSeparator />
                <DropdownMenuItem>Edit member</DropdownMenuItem>
              </DropdownMenuContent>
            </DropdownMenu>
          )
        },
      }
]
