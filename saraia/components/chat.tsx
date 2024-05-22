'use client'
import { Input } from "./ui/input"
import { Button } from "./ui/button"
import { ScrollArea } from "./ui/scroll-area"
import { Avatar, AvatarImage, AvatarFallback } from "./ui/avatar"
import { SendHorizontalIcon, Zap } from 'lucide-react'

export default function Chat() {
    interface Message {
        role: 'system' | 'user' | 'assistant';
        content: string;
    }
    
    const messages: Message[] = [
        { role: 'system', content: 'You are a helpful assistant.' },
        { role: 'user', content: 'Who won the world series in 2020?' },
        { role: 'assistant', content: 'The Los Angeles Dodgers won the World Series in 2020.' },
        { role: 'user', content: 'Where was it played?' },
        { role: 'assistant', content: 'The Los Angeles Dodgers won the World Series in 2020.' },
        { role: 'user', content: 'Where was it played?' },
        { role: 'user', content: 'Where was it played?' },

    ];
    
    return (
        <section className="text-zinc-700 flex-1">
            <div className="container flex h-screen flex-col items-center justify-center">
                <h1 className="font-sans text-4xl font-bold">Sara AI</h1>
                <div className="mt-4 w-full max-w-xl" >
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
                      <AvatarFallback className='bg-emerald-500 text-white'>
                        AI
                      </AvatarFallback>
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
                    <form className="relative">
                        <Input
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