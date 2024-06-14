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
const handleDeleteMember = async (userId: any) => {
  try {
    console.log(userId);
    const response = await fetch("/api/removeuser", {
      method: "DELETE",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify({ userId }),
    });

    if (!response.ok) {
      throw new Error("Failed to delete team member");
    }

    // Handle success as needed (e.g., refresh data)
    // Example: Reload data after deletion
    window.location.reload(); // Replace with more sophisticated handling if needed

  } catch (error) {
    console.error("Error deleting team member:", error);
    // Handle error state if necessary
  }
};



export const columns: ColumnDef<Miembro>[] = [
    {
      accessorKey: "id_user",
      header: "Id",
    },
    {
        accessorKey: "name",
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
          const id = row.getValue("id_user");
     
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
                <DropdownMenuItem >
                <Button variant="ghost" onClick={() => handleDeleteMember(id)}>Remove </Button>
                </DropdownMenuItem>
              </DropdownMenuContent>
            </DropdownMenu>
          )
        },
      }
]
