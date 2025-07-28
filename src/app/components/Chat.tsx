// src/app/components/Chat.tsx
'use client';

import { useState, useRef, useEffect } from 'react';
import { askAgent } from '../actions/askAgent';
import { Button } from '@/components/ui/button';
import { CornerDownLeft, Trash } from 'lucide-react';
import { Textarea } from '@/components/ui/textarea';
import { Tooltip, TooltipContent, TooltipProvider, TooltipTrigger } from '@/components/ui/tooltip';

type ChatMessage = {
  role: 'user' | 'assistant';
  content: string;
};

export function Chat() {
  const [messages, setMessages] = useState<ChatMessage[]>([]);
  const [input, setInput] = useState('');
  const [loading, setLoading] = useState(false);
  const chatContainerRef = useRef<HTMLDivElement>(null);

  const handleSend = async () => {
    if (!input.trim()) return;

    const newMessages: ChatMessage[] = [...messages, { role: 'user', content: input }];
    setMessages(newMessages);
    setInput('');
    setLoading(true);

    try {
      const assistantResponse = await askAgent(input, newMessages);
      setMessages([...newMessages, { role: 'assistant', content: assistantResponse }]);
    } catch (error) {
      console.error(error);
      setMessages([...newMessages, { role: 'assistant', content: 'An error occurred. Please try again.' }]);
    } finally {
      setLoading(false);
    }
  };

  const handleClearChat = () => {
    setMessages([]);
  };

  useEffect(() => {
    if (chatContainerRef.current) {
      chatContainerRef.current.scrollTop = chatContainerRef.current.scrollHeight;
    }
  }, [messages]);

  return (
    <div className="flex flex-col flex-1 w-full max-w-2xl mx-auto py-8">
      <div ref={chatContainerRef} className="flex-1 overflow-y-auto space-y-4 pr-4">
        {messages.map((msg, index) => (
          <div key={index} className={`flex items-start gap-3 ${msg.role === 'user' ? 'justify-end' : ''}`}>
            {msg.role === 'assistant' && (
              <div className="flex-shrink-0 w-8 h-8 rounded-full bg-primary text-primary-foreground flex items-center justify-center">
                🧠
              </div>
            )}
            <div className={`rounded-lg p-3 ${msg.role === 'user' ? 'bg-primary text-primary-foreground' : 'bg-muted'}`}>
              <p className="text-sm">{msg.content}</p>
            </div>
            {msg.role === 'user' && (
              <div className="flex-shrink-0 w-8 h-8 rounded-full bg-muted text-muted-foreground flex items-center justify-center">
                👤
              </div>
            )}
          </div>
        ))}
        {loading && (
            <div className="flex items-start gap-3">
                <div className="flex-shrink-0 w-8 h-8 rounded-full bg-primary text-primary-foreground flex items-center justify-center">
                    🧠
                </div>
                <div className="rounded-lg p-3 bg-muted">
                    <p className="text-sm">Thinking...</p>
                </div>
            </div>
        )}
      </div>
      <div className="mt-4">
        <form
            onSubmit={(e) => {
                e.preventDefault();
                handleSend();
            }}
            className="relative"
        >
            <Textarea
                value={input}
                onChange={(e) => setInput(e.target.value)}
                placeholder="Ask me anything..."
                className="w-full pr-16"
                rows={1}
            />
            <div className="absolute top-1/2 right-3 -translate-y-1/2 flex gap-2">
                <TooltipProvider>
                    <Tooltip>
                        <TooltipTrigger asChild>
                            <Button type="submit" size="icon" disabled={!input.trim() || loading}>
                                <CornerDownLeft className="w-4 h-4" />
                            </Button>
                        </TooltipTrigger>
                        <TooltipContent>
                            <p>Send</p>
                        </TooltipContent>
                    </Tooltip>
                    <Tooltip>
                        <TooltipTrigger asChild>
                            <Button type="button" size="icon" variant="ghost" onClick={handleClearChat}>
                                <Trash className="w-4 h-4" />
                            </Button>
                        </TooltipTrigger>
                        <TooltipContent>
                            <p>Clear Chat</p>
                        </TooltipContent>
                    </Tooltip>
                </TooltipProvider>
            </div>
        </form>
      </div>
    </div>
  );
}