import { create } from 'zustand';
import { devtools } from 'zustand/middleware';

import type { TranscriptSegment } from '@/types/apis/videos/transcripts';
import { convertTimeline } from '@/utils/video-transcript';

type TranscriptState = {
  transcript: TranscriptSegment[];
  highlight: { start_seconds: number; end_seconds: number }[]; // 新增 highlight 狀態
  setTranscript: (data: TranscriptSegment[]) => void;
  setHighlighted: (
    segmentIndex: number,
    itemIndex: number,
    isHighlighted: boolean
  ) => void;
};

export const useTranscriptStore = create<TranscriptState>()(
  devtools(
    (set) => ({
      transcript: [],
      highlight: [], // 初始 highlight
      setTranscript: (data) => {
        const newHighlight = convertTimeline(data); // 直接計算 highlight
        return set({ transcript: data, highlight: newHighlight });
      },
      setHighlighted: (
        segmentIndex: number,
        itemIndex: number,
        isHighlighted: boolean
      ) => {
        set((state) => {
          const newTranscript = [...state.transcript];
          newTranscript[segmentIndex].items[itemIndex].is_highlighted =
            isHighlighted;

          // 更新 highlight
          const newHighlight = convertTimeline(newTranscript);

          return { transcript: newTranscript, highlight: newHighlight };
        });
      },
    }),
    {
      name: 'transcript-store',
    }
  )
);
