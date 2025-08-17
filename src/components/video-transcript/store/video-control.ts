import { create } from 'zustand';
import { devtools } from 'zustand/middleware';

type VideoControlState = {
  videoUrl: string | null;
  setVideoUrl: (videoUrl: string) => void;
  duration: number;
  setDuration: (duration: number) => void;
  playing: boolean;
  setPlaying: (playing: boolean) => void;
  proccess: number;
  setProccess: (proccess: number) => void;
};

export const useVideoControlStore = create<VideoControlState>()(
  devtools(
    (set) => ({
      videoUrl: null,
      setVideoUrl: (videoUrl) => set({ videoUrl }),
      playing: false,
      setPlaying: (playing) => set({ playing }),
      duration: 0,
      setDuration: (duration) => set({ duration }),
      proccess: 0,
      setProccess: (proccess) => set({ proccess }),
    }),
    {
      name: 'video-control-store',
    }
  )
);
