import React, { useState } from 'react';
import { Button } from "@/components/ui/button";
import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogFooter,
  DialogHeader,
  DialogTitle,
  DialogTrigger,
  DialogClose,
} from "@/components/ui/dialog";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { getSession } from 'next-auth/react';

export default function CreateTeamModal() {

  const [teamName, setTeamName] = useState('');

  const handleSubmit = async (event: React.FormEvent<HTMLFormElement>) => {
    event.preventDefault();

    if (!teamName) {
      alert("Team Name is required");
      return;
    }

    try {
      const response = await fetch('/api/createateam', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json'
        },
        body: JSON.stringify({
          name: teamName,
      }),
      });

      if (response.ok) {
        alert("Team added successfully!");
        setTeamName('');  // Reset the form input
      } else {
        const errorData = await response.json();
        alert(`Failed to add team: ${errorData.error}`);
      }
    } catch (error) {
      console.error("Error adding team:", error);
      alert("Failed to add team. Please try again.");
    }
  };

  return (
    <Dialog>
      <DialogTrigger asChild>
        <Button variant="default">Create a Team</Button>
      </DialogTrigger>
      <DialogContent className="sm:max-w-[425px] bg-slate-50">
        <DialogHeader>
          <DialogTitle>Add a new team</DialogTitle>
          <DialogDescription>
            Add the following details for your new team
          </DialogDescription>
        </DialogHeader>
        <form onSubmit={handleSubmit}>
          <div className="grid gap-4 py-4">
            <div className="grid grid-cols-4 items-center gap-4">
              <Label htmlFor="name" className="text-right">
                Team Name
              </Label>
              <Input
                id="name"
                value={teamName}
                onChange={(e) => setTeamName(e.target.value)}
                className="col-span-3"
              />
            </div>
          </div>
          <DialogFooter>
            <DialogClose asChild>
              <Button type="button" variant="secondary">
                Close
              </Button>
            </DialogClose>
            <Button type="submit">Add new team</Button>
          </DialogFooter>
        </form>
      </DialogContent>
    </Dialog>
  );
}
