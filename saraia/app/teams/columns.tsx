"use client";

import { ColumnDef } from "@tanstack/react-table";
import { MdArrowForwardIos } from "react-icons/md";
import { Button } from "@/components/ui/button";
import { useRouter } from "next/navigation";


export type Projecto = {
  nombre: string;
  id: string;
};

// Define a new functional component for the action button
const ActionButton = ({ id }: { id: string }) => {
  const router = useRouter();
  const handleClick = () => {
    router.push(`/teams/${id}`);
  };

  return (
    <Button variant="outline" size="icon" onClick={handleClick}>
      <MdArrowForwardIos className="h-4 w-4" />
    </Button>
  );
};

export const columns: ColumnDef<Projecto>[] = [
  {
    accessorKey: "nombre",
    header: "Nombre",
  },

  {
    id: "actions",
    cell: ({ row }) => {
      return <ActionButton id={row.original.id} />;
    },
  },
];
