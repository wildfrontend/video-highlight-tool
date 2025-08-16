import { create } from 'zustand';
import { devtools } from 'zustand/middleware';

import mockData from '@/mocks/hank_outline_segments.json';
import type { TranscriptSegment } from '@/types/apis/videos/transcripts';

type TranscriptState = {
  transcript: TranscriptSegment[];
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
      transcript: mockData,
      setTranscript: (data) => set({ transcript: data }),
      setHighlighted: (
        segmentIndex: number,
        itemIndex: number,
        isHighlighted: boolean
      ) => {
        set((state) => {
          const newTranscript = [...state.transcript];
          newTranscript[segmentIndex].items[itemIndex].is_highlighted =
            isHighlighted;
          return { transcript: newTranscript };
        });
      },
    }),
    {
      name: 'transcript-store',
    }
  )
);
