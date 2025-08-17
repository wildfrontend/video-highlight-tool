import { create } from 'zustand';

import { Highlight } from '../types/hightlight';

interface SeekHighlightState {
  seekHighlight: Highlight | null;
  setSeekHighlight: (highlight: Highlight | null) => void;
}

export const useSeekHighlightStore = create<SeekHighlightState>((set) => ({
  seekHighlight: null,
  setSeekHighlight: (highlight) => set({ seekHighlight: highlight }),
}));
