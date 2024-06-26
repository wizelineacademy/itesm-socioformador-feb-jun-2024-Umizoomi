'use client'
import { Input } from "./ui/input"
import { Button } from "./ui/button"
import { ScrollArea } from "./ui/scroll-area"
import { Avatar, AvatarImage, AvatarFallback } from "./ui/avatar"
import { SendHorizontalIcon } from 'lucide-react'
import { useState, useEffect, Suspense } from "react"
import { useSearchParams } from 'next/navigation';
export const dynamic = 'force-dynamic';

function ChatContent() {
  const [message, setMessage] = useState('');
  const [messages, setMessages] = useState([
    { id: 1, role: 'system', content: 'You are a helpful assistant.' },
  ]);

  interface Message {
    id: number;
    role: 'system' | 'user' | 'assistant';
    content: string;
  }
  const searchParams = useSearchParams();
  const userId = searchParams.get('userId');
  const teamId = searchParams.get('teamId');

  const handleSubmit = async (event: React.FormEvent) => {
    event.preventDefault();
    if (!message.trim()) return;

    const newMessage: Message = { id: Date.now(), role: 'user', content: message };
    setMessages([...messages, newMessage]);

    try {
      const response = await fetch('http://localhost:5000/get_ai_response', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/x-www-form-urlencoded',
        },
        body: new URLSearchParams({
          user_id: userId as string,
          team_id: teamId as string, 
          message,
        }),
      });

      if (!response.ok) {
        throw new Error('Error sending message');
      }

      const result = await response.json();
      const aiResponseMessage: Message = { id: Date.now() + 1, role: 'assistant', content: result.response };

      setMessages((prevMessages) => [...prevMessages, aiResponseMessage]);
    } catch (error) {
      console.error('Error fetching AI response:', error);
    }

    setMessage(''); 
  };

  return (
    <section className="text-zinc-700 flex-1">
      <div className="container flex h-screen flex-col items-center justify-center">
        <h1 className="font-sans text-4xl font-bold">Sara AI</h1>
        <div className="mt-4 w-full max-w-xl">
          <ScrollArea className="mb-2 h-[800px] rounded-md border p-4">
            {messages.map(m => (
              <div key={m.id} className='mr-6 whitespace-pre-wrap md:mr-12'>
                {m.role === 'user' && (
                  <div className='mb-6 flex gap-3'>
                    <Avatar>
                      <AvatarImage src='' />
                      <AvatarFallback className='text-sm'>U</AvatarFallback>
                    </Avatar>
                    <div className='mt-1.5'>
                      <p className='font-semibold'>You</p>
                      <div className='mt-1.5 text-sm text-zinc-500'>
                        {m.content}
                      </div>
                    </div>
                  </div>
                )}
                {m.role === 'assistant' && (
                  <div className='mb-6 flex gap-3'>
                    <Avatar>
                      <AvatarImage src='LogoSara.svg' />
                      <AvatarFallback className='bg-emerald-500 text-white'>AI</AvatarFallback>
                    </Avatar>
                    <div className='mt-1.5 w-full'>
                      <div className='flex justify-between'>
                        <p className='font-semibold'>SaraAI</p>
                      </div>
                      <div className='mt-2 text-sm text-zinc-500'>
                        {m.content}
                      </div>
                    </div>
                  </div>
                )}
              </div>
            ))}
          </ScrollArea>
          <form className="relative" onSubmit={handleSubmit}>
            <Input
              value={message}
              onChange={(e) => setMessage(e.target.value)}
              placeholder="Ask SaraAI ..."
              className="pr-12 placeholder:italic placeholder:text-zinc-700"
            />
            <Button
              size="icon"
              type="submit"
              variant="secondary"
              className="absolute right-1 top-1 h-8 w-10"
            >
              <SendHorizontalIcon className='h-5 w-5 text-emerald-500' />
            </Button>
          </form>
        </div>
      </div>
    </section>
  )
}

export default function Chat() {
  return (
    <Suspense fallback={<div>Loading...</div>}>
      <ChatContent />
    </Suspense>
  );
}
