import { Box, Typography } from '@mui/material';

import { useVideoControlStore } from '@/components/video-transcript/store/video-control';
import { formatTimebar } from '@/utils/video-transcript';

const VideoTimebar: React.FC = () => {
  const { duration, proccess } = useVideoControlStore();
  return (
    <Box display="flex" gap={2}>
      <Typography color="white" fontWeight={600} variant="body2">
        {formatTimebar(proccess)}
      </Typography>
      <Typography
        color="rgba(255, 255, 255, 0.8)"
        fontWeight={500}
        variant="body2"
      >
        {formatTimebar(duration)}
      </Typography>
    </Box>
  );
};

export default VideoTimebar;
