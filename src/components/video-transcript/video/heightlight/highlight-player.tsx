import PlayArrowIcon from '@mui/icons-material/PlayArrow';
import { Chip, Grid, Stack } from '@mui/material';
import { useEffect } from 'react';

import { useSeekHighlightStore } from '@/components/video-transcript/store/seek-highlight';
import { useTranscriptStore } from '@/components/video-transcript/store/transcripts';
import { useVideoControlStore } from '@/components/video-transcript/store/video-control';
import { convertTimeline, formatTimebar } from '@/utils/video-transcript';

import { useHighlightPlayer } from '../../hooks/highlight-player';

const HighLightPlayerItem: React.FC<{
  item: {
    start_seconds: number;
    end_seconds: number;
  };
}> = ({ item }) => {
  const { isPlayingHighlight, playHighlight } = useHighlightPlayer();
  return (
    <Chip
      color={
        isPlayingHighlight({
          start_seconds: item.start_seconds,
          end_seconds: item.end_seconds,
        })
          ? 'secondary'
          : 'primary'
      }
      icon={<PlayArrowIcon />}
      label={`${formatTimebar(item.start_seconds)} - ${formatTimebar(item.end_seconds)}`}
      onClick={() => {
        playHighlight({
          start_seconds: item.start_seconds,
          end_seconds: item.end_seconds,
        });
      }}
      size="medium"
      variant="outlined"
    />
  );
};

const HighLightPlayer: React.FC = () => {
  const { transcript } = useTranscriptStore();
  const highlight = convertTimeline(transcript);
  const { seekHighlight, setSeekHighlight } = useSeekHighlightStore();
  const { proccess, setPlaying } = useVideoControlStore();

  useEffect(() => {
    if (seekHighlight && proccess != null) {
      if (proccess > seekHighlight.end_seconds) {
        setSeekHighlight(null);
      }
    }
  }, [seekHighlight, proccess, setPlaying, setSeekHighlight]);

  return (
    <Stack spacing={2} useFlexGap>
      <Grid container minHeight={60} spacing={1.5}>
        {highlight.map((item, index) => (
          <Grid
            key={index}
            size={{ xs: 6, sm: 3 }}
            sx={{
              display: 'flex',
              justifyContent: 'center',
              alignItems: 'center',
            }}
          >
            <HighLightPlayerItem item={item} />
          </Grid>
        ))}
      </Grid>
    </Stack>
  );
};

export default HighLightPlayer;
