import { create } from 'zustand';
import { devtools } from 'zustand/middleware';

export type TranscriptItem = {
  label: string;
  start_seconds: number;
  start: string;
  captions: string;
};

export type TranscriptSegment = {
  title: string;
  items: TranscriptItem[];
};

type TranscriptState = {
  transcript: TranscriptSegment[];
  setTranscript: (data: TranscriptSegment[]) => void;
  clearTranscript: () => void;
};

export const useTranscriptStore = create<TranscriptState>()(
  devtools((set) => ({
    transcript: [],
    setTranscript: (data) => set({ transcript: data }),
    clearTranscript: () => set({ transcript: [] }),
  }))
);
