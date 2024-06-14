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

// Example utility function for classNames, replace with your actual implementation
function classNames(...classes: string[]) {
  return classes.filter(Boolean).join(" ");
}

interface User {
  id: number;
  username: string;
  job_title: string;
  team_name: string;
  overall_average: number;
}

interface AddNewMemberProps {
  teamId: number; // Assuming you pass the team ID as a prop
}

export default function AddNewMember({ teamId }: AddNewMemberProps) {
  const [open, setOpen] = React.useState(false);
  const [value, setValue] = React.useState("");

  const [users, setUsers] = React.useState<User[]>([]); // State to hold users data
  const [loading, setLoading] = React.useState(false); // Loading state indicator

  // Function to fetch users data
  const fetchUsers = async () => {
    setLoading(true);
    try {
      const response = await fetch("/api/users"); // Replace with your actual API endpoint
      if (!response.ok) {
        throw new Error("Failed to fetch users");
      }
      const data = await response.json();
      setUsers(data); // Update state with fetched users data
    } catch (error) {
      console.error("Error fetching users:", error);
    } finally {
      setLoading(false);
    }
  };

  React.useEffect(() => {
    fetchUsers(); // Fetch users data on component mount
  }, []); // Dependency array to run effect only once

  // Function to handle adding a member to the team
  const handleAddMember = async (userId: number) => {
    try {
      const response = await fetch("/api/add-member", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({ teamId, userId }), // Pass teamId and userId to backend
      });

      if (!response.ok) {
        throw new Error("Failed to add team member");
      }

      // Handle success as needed (e.g., refresh data)
      // Example: Reload data after addition
      window.location.reload(); // Replace with more sophisticated handling if needed

    } catch (error) {
      console.error("Error adding team member:", error);
      // Handle error state if necessary
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
            users.find((user) => user.id.toString() === value)?.username
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
            {!loading &&
              users.length > 0 && (
                <CommandGroup>
                  {users.map((user) => (
                    <CommandItem
                      key={user.id}
                      value={user.id.toString()}
                      onSelect={(currentValue) => {
                        setValue(currentValue === value ? "" : currentValue);
                        setOpen(false);
                      }}
                    >
                      <Check
                        className={classNames(
                          "mr-2 h-4 w-4",
                          value === user.id.toString() ? "opacity-100" : "opacity-0"
                        )}
                      />
                      {user.username}
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
            onClick={() => handleAddMember(parseInt(value))}
          >
            Add to Team
          </Button>
        )}
      </PopoverContent>
    </Popover>
  );
}
