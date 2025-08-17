import { useMemo } from 'react';

import { useVideoRef } from '../providers/video-ref';
import { useSeekHighlightStore } from '../store/seek-highlight';
import { useVideoControlStore } from '../store/video-control';
import { Highlight } from '../types/hightlight';

export const useHighlightPlayer = () => {
  const videoRef = useVideoRef();
  const { setSeekHighlight, seekHighlight } = useSeekHighlightStore();
  const { setProccess, setPlaying } = useVideoControlStore();

  const playHighlight = ({ start_seconds, end_seconds }: Highlight) => {
    if (videoRef.current) {
      videoRef.current.currentTime = start_seconds;
    }
    setSeekHighlight({ start_seconds, end_seconds });
    setProccess(start_seconds);
    setPlaying(true);
  };

  const isPlayingHighlight = useMemo(
    () => (item: Highlight) =>
      seekHighlight?.start_seconds === item.start_seconds &&
      seekHighlight?.end_seconds === item.end_seconds,
    [seekHighlight]
  );

  return {
    playHighlight,
    isPlayingHighlight,
  };
};
