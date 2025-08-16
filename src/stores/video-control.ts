import { create } from 'zustand';
import { devtools } from 'zustand/middleware';

type VideoControlState = {
  duration: number;
  setDuration: (duration: number) => void;
  playing: boolean;
  setPlaying: (playing: boolean) => void;
  proccess: number;
  setProccess: (proccess: number) => void;
};

export const useVideoControlStore = create<VideoControlState>()(
  devtools((set) => ({
    playing: false,
    setPlaying: (playing) => set({ playing }),
    duration: 0,
    setDuration: (duration) => set({ duration }),
    proccess: 0,
    setProccess: (proccess) => set({ proccess }),
  }))
);
