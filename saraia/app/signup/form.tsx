"use client"
import { useState } from 'react';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Label } from '@/components/ui/label';
import { useRouter } from 'next/navigation';

export default function Form() {
  const [username, setUsername] = useState('');
  const router = useRouter();

  const handleSubmit = async (event : any) => {
    event.preventDefault();

    try {
      const response = await fetch('/api/updateuser', {
        method: 'PUT',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({ username }),
      });

      if (response.ok) {
        router.push('/dashboard');
      } else {
        console.error('Failed to update username');
      }
    } catch (error) {
      console.error('Error updating username:', error);
    }
  };

  return (
    <form onSubmit={handleSubmit}>
      <Label htmlFor="username">Username</Label>
      <Input
        name="username"
        type="text"
        placeholder="Enter your username"
        value={username}
        onChange={(e) => setUsername(e.target.value)}
      />

      <Button className="my-5" type="submit">
        Continue
      </Button>
    </form>
  );
}
