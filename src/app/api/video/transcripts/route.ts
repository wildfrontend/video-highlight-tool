import { NextResponse } from 'next/server';
import mockData from '@/mocks/hank_outline_segments.json'
export async function POST() {
  // 模擬延遲（假裝在處理影片）
  await new Promise((resolve) => setTimeout(resolve, 3000));

  return NextResponse.json({
    success: true,
    transcript: mockData,
  });
}
