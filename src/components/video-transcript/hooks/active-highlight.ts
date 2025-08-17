import { useMemo } from 'react';

import { useVideoRef } from '../providers/video-ref';
import { Highlight, useActiveHighlightStore } from '../store/active-highlight';
import { useVideoControlStore } from '../store/video-control';

export const useActiveHighlight = () => {
  const videoRef = useVideoRef();
  const { setActiveHighlight, activeHighlight } = useActiveHighlightStore();
  const { setProccess, setPlaying } = useVideoControlStore();
  const setHightlight = ({ start_seconds, end_seconds }: Highlight) => {
    if (videoRef.current) {
      videoRef.current.currentTime = start_seconds;
    }
    setActiveHighlight({
      start_seconds,
      end_seconds,
    });
    setProccess(start_seconds);
    setPlaying(true);
  };

  const isActive = useMemo(
    () => (item: Highlight) => {
      return (
        activeHighlight?.start_seconds === item.start_seconds &&
        activeHighlight?.end_seconds === item.end_seconds
      );
    },
    [activeHighlight]
  );

  return {
    setHightlight,
    isActive,
  };
};
