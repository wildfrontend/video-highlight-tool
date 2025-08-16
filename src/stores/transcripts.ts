import { create } from 'zustand';
import { devtools } from 'zustand/middleware';

import mockData from '@/mocks/hank_outline_segments.json';

import type { TranscriptSegment} from '@/types/apis/videos/transcripts';

type TranscriptState = {
  transcript: TranscriptSegment[];
  setTranscript: (data: TranscriptSegment[]) => void;
};

export const useTranscriptStore = create<TranscriptState>()(
  devtools((set) => ({
    transcript: mockData,
    setTranscript: (data) => set({ transcript: data }),
  }))
);
