// src/app/page.tsx
import { Chat } from './components/Chat';
import { ThemeToggle } from './components/ThemeToggle';

export default function Home() {
  return (
    <main className="relative container flex flex-col min-h-screen">
      <header className="sticky top-0 z-50 flex items-center justify-between w-full h-16 px-4 border-b shrink-0 bg-background/95 backdrop-blur-sm">
        <h1 className="text-2xl font-bold">🧠 AI Assistant</h1>
        <ThemeToggle />
      </header>
      <Chat />
    </main>
  );
}