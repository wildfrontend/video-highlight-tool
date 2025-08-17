import { Box, Stack } from '@mui/material';
import ReactPlayer from 'react-player';

import { useVideoControlStore } from '@/components/video-transcript/store/video-control';
import { timeFixed2 } from '@/utils/video-transcript';

import { useVideoRef } from '../../providers/video-ref';
import HighlightControl from '../heightlight/control';
import VideoProccessControl from '../proccess';

const VideoPlayer: React.FC<{ videoUrl: string }> = ({ videoUrl }) => {
  const videoRef = useVideoRef();
  const { playing, setProccess, setDuration } = useVideoControlStore();

  return (
    <Stack spacing={2} sx={{ height: '100%' }} useFlexGap>
      <Box position="relative">
        <ReactPlayer
          onDurationChange={(e) => {
            console.log('onDurationChange');
            const duration = timeFixed2(e.currentTarget.duration);
            setDuration(duration);
          }}
          onTimeUpdate={(e) => {
            const currentTime = timeFixed2(e.currentTarget.currentTime);
            setProccess(currentTime);
          }}
          playing={playing}
          ref={videoRef}
          src={videoUrl}
          style={{
            width: '100%',
            height: 'auto',
            aspectRatio: '16/9 auto',
          }}
        />
        <VideoProccessControl />
      </Box>
      <Box>
        <HighlightControl />
      </Box>
    </Stack>
  );
};

export default VideoPlayer;
