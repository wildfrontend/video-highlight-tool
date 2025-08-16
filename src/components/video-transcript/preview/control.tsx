import { Box, Stack, Typography } from '@mui/material';

import VideoHightLightArea from './highlight-area';
import VideoHighLightPlayer from './highlight-player';

const VideoControlPanel: React.FC = () => {
  return (
    <Stack spacing={2}>
      <Typography
        color="text.primary"
        fontWeight={600}
        gutterBottom
        variant="h6"
      >
        精華片段
      </Typography>
      <Box px={1}>
        <VideoHightLightArea />
      </Box>
      <Stack spacing={1}>
        <VideoHighLightPlayer />
      </Stack>
    </Stack>
  );
};

export default VideoControlPanel;
