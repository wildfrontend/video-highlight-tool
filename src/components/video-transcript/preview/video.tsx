import { Box, Stack } from '@mui/material';
import { useCallback } from 'react';
import ReactPlayer from 'react-player';

import { useVideoControlStore } from '@/stores/video-control';

import VideoHighlightControl from './control';
import VideoProccessControl from './proccess';
import { useVideoRef } from './video-ref';

const VideoPlayer: React.FC<{ videoUrl: string }> = ({ videoUrl }) => {
  const videoRef = useVideoRef();
  const { playing, proccess, setProccess, setDuration, setPlaying } =
    useVideoControlStore();

  const setVideoRef = useCallback((player: HTMLVideoElement) => {
    if (!player) return;
    videoRef.current = player;
    setDuration(player.duration);
  }, []);

  return (
    <Stack spacing={2} sx={{ height: '100%' }} useFlexGap>
      <Box
        sx={{
          position: 'relative',
          width: '100%',
          borderRadius: 2,
          overflow: 'hidden',
          boxShadow: 3,
          bgcolor: 'grey.900',
          cursor: 'pointer',
        }}
      >
        <ReactPlayer
          height="auto"
          onTimeUpdate={(e) => {
            const currentTime = +e.currentTarget.currentTime.toFixed(2);
            setProccess(currentTime);
          }}
          playing={playing}
          ref={setVideoRef}
          src={videoUrl}
          style={{ borderRadius: '8px' }}
          width="100%"
        />
        <VideoProccessControl />
      </Box>
      <Box>
        <VideoHighlightControl />
      </Box>
    </Stack>
  );
};

export default VideoPlayer;
