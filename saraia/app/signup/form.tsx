import { useState } from 'react';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Label } from '@/components/ui/label';
import { db } from '@/lib/db';
import { users } from '@/lib/schema';
import { eq } from 'drizzle-orm';
import { auth } from '@/auth/auth';
import { redirect } from 'next/navigation'


export default async function Form() {

  const [username, setUsername] = useState('');
  const session = await auth();

  const handleSubmit = async (event : any) => {
    event.preventDefault();

    try {
        if (session?.user?.id) {
            await db.update(users)
              .set({ name: username })
              .where(eq(users.id, session.user.id));
        }
        redirect('/dashboard')
    } catch (error) {
      console.error('Error creating user:', error);
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
