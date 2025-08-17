import PlayArrowIcon from '@mui/icons-material/PlayArrow';
import { Chip, Grid, Stack } from '@mui/material';
import { useEffect } from 'react';

import { useActiveHighlightStore } from '@/components/video-transcript/store/active-highlight';
import { useTranscriptStore } from '@/components/video-transcript/store/transcripts';
import { useVideoControlStore } from '@/components/video-transcript/store/video-control';
import { convertTimeline, formatTimebar } from '@/utils/video-transcript';

import { useActiveHighlight } from '../../hooks/active-highlight';

const VideoHighLightPlayerItem: React.FC<{
  item: {
    start_seconds: number;
    end_seconds: number;
  };
}> = ({ item }) => {
  const { isActive, setHightlight } = useActiveHighlight();
  return (
    <Chip
      color={
        isActive({
          start_seconds: item.start_seconds,
          end_seconds: item.end_seconds,
        })
          ? 'secondary'
          : 'primary'
      }
      icon={<PlayArrowIcon />}
      label={`${formatTimebar(item.start_seconds)} - ${formatTimebar(item.end_seconds)}`}
      onClick={() => {
        setHightlight({
          start_seconds: item.start_seconds,
          end_seconds: item.end_seconds,
        });
      }}
      size="medium"
      variant="outlined"
    />
  );
};

const VideoHighLightPlayer: React.FC = () => {
  const { transcript } = useTranscriptStore();
  const highlight = convertTimeline(transcript);
  const { activeHighlight, setActiveHighlight } = useActiveHighlightStore();
  const { proccess, setPlaying } = useVideoControlStore();

  useEffect(() => {
    if (activeHighlight && proccess != null) {
      if (proccess > activeHighlight.end_seconds) {
        setPlaying(false);
        setActiveHighlight(null);
      }
    }
  }, [activeHighlight, proccess, setPlaying, setActiveHighlight]);

  return (
    <Stack spacing={2}>
      <Grid container minHeight={60} spacing={1.5}>
        {highlight.map((item, index) => (
          <Grid key={index} size={{ xs: 6, sm: 3 }}>
            <VideoHighLightPlayerItem item={item} />
          </Grid>
        ))}
      </Grid>
    </Stack>
  );
};

export default VideoHighLightPlayer;
