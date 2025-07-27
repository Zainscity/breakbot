'use server';

/* eslint-disable @typescript-eslint/no-explicit-any */

import OpenAI from 'openai';
import { ChatCompletionMessageParam } from 'openai/resources/chat';

// ✅ Configure Gemini-compatible client (as OpenAI-compatible)
const openai = new OpenAI({
  apiKey: process.env.GEMINI_API_KEY!,
  baseURL: 'https://generativelanguage.googleapis.com/v1beta/openai/',
});

// ✅ Type for your own simplified input history
type ChatMessage = {
  role: 'user' | 'assistant';
  content: string;
};

// ✅ Main server action
export async function askAgent(prompt: string, history: ChatMessage[] = []): Promise<string> {
  try {
    // ✅ Map ChatMessage[] to valid ChatCompletionMessageParam[]
    const messages: ChatCompletionMessageParam[] = history.map((m) => ({
      role: m.role,
      content: m.content,
    }));

    messages.push({ role: 'user', content: prompt });

    // ✅ Call Gemini via OpenAI-compatible endpoint
    const response = await openai.chat.completions.create({
      model: 'gemini-1.5-flash',
      messages,
    });

    return response.choices?.[0]?.message?.content || 'No response from Gemini';
  } catch (err: any) {
    console.error('Gemini Error:', err.message);
    return '❌ Failed to fetch Gemini response';
  }
}
