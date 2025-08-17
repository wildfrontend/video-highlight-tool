'use client';

import React, { RefObject, createContext, useContext, useRef } from 'react';

type VideoRefContextType = {
  videoRef: RefObject<HTMLVideoElement | null>;
};

const VideoRefContext = createContext<VideoRefContextType | undefined>(
  undefined
);

const VideoRefProvider: React.FC<{ children: React.ReactNode }> = ({
  children,
}) => {
  const videoRef = useRef<HTMLVideoElement | null>(null);

  return (
    <VideoRefContext.Provider value={{ videoRef }}>
      {children}
    </VideoRefContext.Provider>
  );
};

export const useVideoRef = () => {
  const context = useContext(VideoRefContext);
  if (!context) {
    throw new Error('useVideoRef must be used within a VideoRefProvider');
  }
  return context.videoRef;
};

export default VideoRefProvider;
