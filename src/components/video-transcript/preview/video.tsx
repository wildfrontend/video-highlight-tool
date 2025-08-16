import { Box, Stack } from '@mui/material';
import { useCallback, useEffect, useRef } from 'react';
import ReactPlayer from 'react-player';

import { useVideoControlStore } from '@/stores/video-control';

import VideoControlPanel from './control';

const VideoPlayer: React.FC<{ videoUrl: string }> = ({ videoUrl }) => {
  const videoRef = useRef<HTMLVideoElement | null>(null);
  const { playing, proccess, setDuration } = useVideoControlStore();

  const setVideoRef = useCallback((player: HTMLVideoElement) => {
    if (!player) return;
    videoRef.current = player;
    setDuration(player.duration);
  }, []);

  useEffect(() => {
    if (videoRef.current) {
      videoRef.current.currentTime = proccess;
    }
  }, [proccess]);

  return (
    <Stack spacing={1} sx={{ height: '100%' }} useFlexGap>
      <Box
        bgcolor="grey.900"
        borderRadius={2}
        boxShadow={3}
        overflow="hidden"
        width="100%"
      >
        <ReactPlayer
          height="auto"
          playing={playing}
          ref={setVideoRef}
          src={videoUrl}
          style={{ borderRadius: '8px' }}
          width="100%"
        />
      </Box>

      {/* 控制面板區域 */}
      <Box sx={{ flex: 1, minHeight: 0 }}>
        <VideoControlPanel />
      </Box>
    </Stack>
  );
};

export default VideoPlayer;
