import { Box, Stack } from '@mui/material';
import { useCallback, useEffect } from 'react';
import ReactPlayer from 'react-player';

import { useVideoControlStore } from '@/components/video-transcript/store/video-control';
import { timeFixed2 } from '@/utils/video-transcript';

import VideoHighlightControl from './control';
import VideoProccessControl from './proccess';
import { useVideoRef } from './video-ref';

const VideoPlayer: React.FC<{ videoUrl: string }> = ({ videoUrl }) => {
  const videoRef = useVideoRef();
  const { playing, proccess, setProccess, setDuration, setPlaying } =
    useVideoControlStore();

  return (
    <Stack spacing={2} sx={{ height: '100%' }} useFlexGap>
      <Box position="relative">
        <ReactPlayer
          onTimeUpdate={(e) => {
            const currentTime = timeFixed2(e.currentTarget.currentTime);
            setProccess(currentTime);
          }}
          onSeeking={(e) => {
            console.log('onSeeking');
            setPlaying(false);
          }}
          onSeeked={(e) => {
            console.log('onSeeked');
            setPlaying(true);
          }}
          playing={playing}
          ref={videoRef}
          src={videoUrl}
          style={{
            width: '100%',
            height: 'auto',
            aspectRatio: '16/9 auto',
          }}
          onDurationChange={(e) => {
            console.log('onDurationChange');
            const duration = timeFixed2(e.currentTarget.duration);
            setDuration(duration);
          }}
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
