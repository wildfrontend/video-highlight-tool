import { Box, Stack } from '@mui/material';

import VideoPlayButton from './player';
import VideoProccessbar from './proccessbar';
import Subtitles from './subtitles';
import VideoTimebar from './timebar';

const VideoProccessControl: React.FC = () => {
  return (
    <Box
      sx={{
        position: 'absolute',
        bottom: 0,
        left: 0,
        right: 0,
        bgcolor: 'rgba(0, 0, 0, 0.5)',
        backdropFilter: 'blur(8px)',
        px: 2,
        py: 0.5,
        zIndex: 20,
      }}
    >
      <Stack useFlexGap>
        <Subtitles />
        <VideoProccessbar />
        <Box alignItems="center" display="flex" justifyContent="space-between">
          <VideoPlayButton />
          <VideoTimebar />
        </Box>
      </Stack>
    </Box>
  );
};

export default VideoProccessControl;
