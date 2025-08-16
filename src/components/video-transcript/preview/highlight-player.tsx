import { PlayArrow } from '@mui/icons-material';
import { Chip, Grid, Stack } from '@mui/material';

import { useTranscriptStore } from '@/stores/transcripts';
import { useVideoControlStore } from '@/stores/video-control';
import { convertTimeline, formatTime } from '@/utils/video-transcript';

const VideoHighLightPlayer: React.FC = () => {
  const { setProccess } = useVideoControlStore();
  const { transcript } = useTranscriptStore();
  const highlight = convertTimeline(transcript);

  return (
    <Stack spacing={2}>
      <Grid container minHeight={60} spacing={1.5}>
        {highlight.map((item, index) => (
          <Grid key={index} size={{ xs: 6, sm: 3 }}>
            <Chip
              color="primary"
              icon={<PlayArrow />}
              label={`${formatTime(item.start_seconds)} - ${formatTime(item.end_seconds)}`}
              onClick={() => setProccess(item.start_seconds)}
              size="medium"
              variant="outlined"
            />
          </Grid>
        ))}
      </Grid>
    </Stack>
  );
};

export default VideoHighLightPlayer;
