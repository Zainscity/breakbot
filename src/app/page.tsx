// app/page.tsx
import ChatBox from './components/ChatBox';

export default function Home() {
  return (
    <main className="min-h-screen bg-gray-50 p-8">
      <h1 className="text-3xl font-bold text-center mb-6">🧠 AI Assistant</h1>
      <ChatBox />
    </main>
  );
}
