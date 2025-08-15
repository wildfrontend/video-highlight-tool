import { NextResponse } from 'next/server';

export async function POST() {
  // 產生一個假 jobId
  const jobId = Math.random().toString(36).substring(2, 9);

  // 用 global 暫存 job 狀態（只在 server 單一實例有效，demo 用）
  (globalThis as any).__jobs ||= {};
  (globalThis as any).__jobs[jobId] = { startedAt: Date.now() };

  return NextResponse.json({ jobId });
}
