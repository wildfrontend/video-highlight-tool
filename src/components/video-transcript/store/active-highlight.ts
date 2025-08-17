import { create } from 'zustand';

interface Highlight {
  start_seconds: number;
  end_seconds: number;
}

interface ActiveHighlightState {
  activeHighlight: Highlight | null;
  setActiveHighlight: (highlight: Highlight | null) => void;
}

export const useActiveHighlightStore = create<ActiveHighlightState>((set) => ({
  activeHighlight: null,
  setActiveHighlight: (highlight) => set({ activeHighlight: highlight }),
}));
