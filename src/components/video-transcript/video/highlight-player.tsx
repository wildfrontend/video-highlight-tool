import PlayArrowIcon from '@mui/icons-material/PlayArrow';
import { Chip, Grid, Stack } from '@mui/material';
import { useEffect } from 'react';

import { useActiveHighlightStore } from '@/components/video-transcript/store/active-highlight';
import { useTranscriptStore } from '@/stores/transcripts';
import { useVideoControlStore } from '@/components/video-transcript/store/video-control';
import { convertTimeline, formatTime } from '@/utils/video-transcript';

import { useVideoRef } from './video-ref';

const VideoHighLightPlayerItem: React.FC<{
  item: {
    start_seconds: number;
    end_seconds: number;
  };
}> = ({ item }) => {
  const videoRef = useVideoRef();
  const { setActiveHighlight, activeHighlight } = useActiveHighlightStore();
  const { setProccess, setPlaying } = useVideoControlStore();

  const isActive =
    activeHighlight?.start_seconds === item.start_seconds &&
    activeHighlight?.end_seconds === item.end_seconds;

  return (
    <Chip
      color={isActive ? 'secondary' : 'primary'}
      icon={<PlayArrowIcon />}
      label={`${formatTime(item.start_seconds)} - ${formatTime(item.end_seconds)}`}
      onClick={() => {
        if (videoRef.current) {
          videoRef.current.currentTime = item.start_seconds;
        }
        setActiveHighlight({
          start_seconds: item.start_seconds,
          end_seconds: item.end_seconds,
        });
        setProccess(item.start_seconds);
        setPlaying(true);
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
