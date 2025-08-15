import { NextRequest, NextResponse } from 'next/server';

// 這裡定義 Mock Transcript 資料
const MOCK_DATA = {
  videoMeta: { duration: 128.5, fps: 30 },
  sections: [
    {
      id: 's1',
      title: '開場與主題',
      start: 0,
      end: 35.2,
      sentences: [
        {
          id: 's1-01',
          sectionId: 's1',
          tStart: 0.8,
          tEnd: 4.6,
          text: '大家好，今天示範 highlight tool。',
          suggested: true,
        },
        {
          id: 's1-02',
          sectionId: 's1',
          tStart: 5.0,
          tEnd: 8.2,
          text: '我們會用固定影片模擬上傳流程。',
          suggested: false,
        },
      ],
    },
    {
      id: 's2',
      title: '功能重點',
      start: 35.2,
      end: 90.0,
      sentences: [
        {
          id: 's2-01',
          sectionId: 's2',
          tStart: 40.0,
          tEnd: 44.5,
          text: '可勾選句子產生高光片段。',
          suggested: true,
        },
        {
          id: 's2-02',
          sectionId: 's2',
          tStart: 46.2,
          tEnd: 50.5,
          text: '點擊時間戳可跳播。',
          suggested: true,
        },
      ],
    },
  ],
};

export async function GET(
  req: NextRequest,
  { params }: { params: { id: string } }
) {
  const { id } = params;
  (globalThis as any).__jobs ||= {};
  const job = (globalThis as any).__jobs[id];

  if (!job) {
    return NextResponse.json({ error: 'Job not found' }, { status: 404 });
  }

  const elapsed = Date.now() - job.startedAt;

  // 模擬處理進度：1.2 秒完成
  if (elapsed < 1200) {
    const progress = Math.min(95, Math.floor((elapsed / 1200) * 100));
    return NextResponse.json({ status: 'processing', progress });
  }

  return NextResponse.json({ status: 'completed', data: MOCK_DATA });
}
