// pages/api/upload-video.ts
import type { NextApiRequest, NextApiResponse } from 'next';
import mockData from '@/mocks/hank_outline_segments.json'

export const config = {
  api: {
    bodyParser: false, // 關掉預設 bodyParser，方便處理 multipart/form-data
  },
};

export default async function handler(req: NextApiRequest, res: NextApiResponse) {
  if (req.method !== 'POST') {
    return res.status(405).json({ error: 'Method Not Allowed' });
  }

  // 模擬上傳處理 + AI 分析
  await new Promise((resolve) => setTimeout(resolve, 2000)); // 模擬延遲

  // 回傳 JSON 精華字幕
  return res.status(200).json(mockData);
}
