'use server';

import OpenAI from 'openai';

// ✅ Configure Gemini-compatible client (as OpenAI-compatible)
const openai = new OpenAI({
  apiKey: process.env.GEMINI_API_KEY!,
  baseURL: 'https://generativelanguage.googleapis.com/v1beta/openai/',
});

// ✅ Type for message history
type ChatMessage = {
  role: 'user' | 'assistant';
  content: string;
};

// ✅ Main server action
export async function askAgent(prompt: string, history: ChatMessage[] = []): Promise<string> {
  try {
    // Combine history with the new message
    const messages = history.map((m) => ({
      role: m.role,
      content: m.content,
    }));

    messages.push({ role: 'user', content: prompt });

    // Call Gemini via OpenAI-compatible API
    const response = await openai.chat.completions.create({
      model: 'gemini-1.5-flash', // or 'gemini-1.5-pro'
      messages,
    });

    return response.choices?.[0]?.message?.content || 'No response from Gemini';
  } catch (err) {
    console.error('Gemini Error:', err);
    return '❌ Failed to fetch Gemini response';
  }
}
