// app/components/ChatBox.tsx
'use client';

import { useState } from 'react';
import { askAgent } from '../actions/askAgent';

export default function ChatBox() {
  const [input, setInput] = useState('');
  const [history, setHistory] = useState<{ role: 'user' | 'assistant'; content: string }[]>([]);
  const [loading, setLoading] = useState(false);

  const handleAsk = async () => {
    setLoading(true);
    const reply = await askAgent(input, history);
    setHistory([...history, { role: 'user', content: input }, { role: 'assistant', content: reply }]);
    setInput('');
    setLoading(false);
  };

  return (
    <div className="p-6 max-w-xl mx-auto">
      <input
        type="text"
        className="border px-4 py-2 w-full rounded mb-2"
        value={input}
        onChange={(e) => setInput(e.target.value)}
        placeholder="Ask something..."
      />
      <button
        onClick={handleAsk}
        disabled={loading}
        className="bg-blue-600 text-white px-4 py-2 w-full rounded"
      >
        {loading ? 'Thinking...' : 'Ask Gemini'}
      </button>
      <div className="mt-4 space-y-2">
        {history.map((m, i) => (
          <div key={i} className={`p-2 rounded ${m.role === 'user' ? 'bg-gray-200' : 'bg-blue-100'}`}>
            <strong>{m.role === 'user' ? 'You' : 'Gemini'}:</strong> {m.content}
          </div>
        ))}
      </div>
    </div>
  );
}
