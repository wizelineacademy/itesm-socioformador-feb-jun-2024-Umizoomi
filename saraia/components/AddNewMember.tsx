import * as React from "react";
import { Check, ChevronsUpDown } from "lucide-react";
import { Button } from "@/components/ui/button";
import {
  Command,
  CommandEmpty,
  CommandGroup,
  CommandInput,
  CommandItem,
  CommandList,
} from "@/components/ui/command";
import {
  Popover,
  PopoverContent,
  PopoverTrigger,
} from "@/components/ui/popover";
import { cn } from "@/lib/utils";

interface User {
  id: string;
  username: string | null;
  job_title: string;
  team_name: string;
  overall_average: number;
}

interface AddNewMemberProps {
  teamId: number;
}

export default function AddNewMember({ teamId }: AddNewMemberProps) {
  const [open, setOpen] = React.useState(false);
  const [value, setValue] = React.useState("");

  const [users, setUsers] = React.useState<User[]>([]);
  const [loading, setLoading] = React.useState(false);

  const fetchUsers = async () => {
    setLoading(true);
    try {
      const response = await fetch("/api/getusersforteam");
      if (!response.ok) {
        throw new Error("Failed to fetch users");
      }
      const data = await response.json();
      setUsers(data.rows.map((user: any) => ({
        id: user.id_user,
        username: user.name,
        job_title: user.job_title,
        team_name: user.team_name,
        overall_average: user.overall_average,
      })));
    } catch (error) {
      console.error("Error fetching users:", error);
    } finally {
      setLoading(false);
    }
  };

  React.useEffect(() => {
    fetchUsers();
  }, []);

  const handleAddMember = async (userId: string) => {
    try {
      const response = await fetch("/api/addmember", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({ teamId, userId }),
      });

      if (!response.ok) {
        throw new Error("Failed to add team member");
      }

      window.location.reload(); // Replace with more sophisticated handling if needed

    } catch (error) {
      console.error("Error adding team member:", error);
    }
  };

  return (
    <Popover open={open} onOpenChange={setOpen}>
      <PopoverTrigger asChild>
        <Button
          variant="outline"
          role="combobox"
          aria-expanded={open}
          className="w-[200px] justify-between"
        >
          {value ? (
            users.find((user) => user.id === value)?.username ?? "User not found"
          ) : (
            "Select user..."
          )}
          <ChevronsUpDown className="ml-2 h-4 w-4 shrink-0 opacity-50" />
        </Button>
      </PopoverTrigger>
      <PopoverContent className="w-[200px] p-0">
        <Command>
          <CommandInput placeholder="Search user..." />
          <CommandList>
            {loading && <CommandEmpty>Loading users...</CommandEmpty>}
            {!loading && users.length === 0 && (
              <CommandEmpty>No users found.</CommandEmpty>
            )}
            {!loading && users.length > 0 && (
              <CommandGroup>
                {users.map((user) => (
                  <CommandItem
                    key={user.id}
                    value={user.id}
                    onSelect={(currentValue) => {
                      setValue(currentValue === value ? "" : currentValue);
                      setOpen(false);
                    }}
                  >
                    <Check
                      className={cn(
                        "mr-2 h-4 w-4",
                        value === user.id ? "opacity-100" : "opacity-0"
                      )}
                    />
                    {user.username ?? "No name"}
                  </CommandItem>
                ))}
              </CommandGroup>
            )}
          </CommandList>
        </Command>
        {value && (
          <Button
            variant="default"
            className="w-full"
            onClick={() => handleAddMember(value)}
          >
            Add to Team
          </Button>
        )}
      </PopoverContent>
    </Popover>
  );
}
