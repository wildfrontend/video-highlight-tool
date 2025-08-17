import { Stack, Typography } from '@mui/material';

import { useTranscriptStore } from '@/components/video-transcript/store/transcripts';
import { useVideoControlStore } from '@/components/video-transcript/store/video-control';
import { TranscriptSubtitleItem } from '@/types/apis/videos/transcripts';

const Subtitles: React.FC = () => {
  const { transcript } = useTranscriptStore();
  const { proccess } = useVideoControlStore();

  const subtitles: TranscriptSubtitleItem[] = transcript.flatMap((seg) =>
    seg.items.flatMap((item) => item.subtitles)
  );

  const currentSubtitle = subtitles.find(
    (sub) => proccess >= sub.start_seconds && proccess <= sub.end_seconds
  );
  return (
    <Stack
      bgcolor="rgba(0,0,0,0.7)"
      left={0}
      position="absolute"
      sx={{
        pointerEvents: 'none',
      }}
      top={-24}
      width="100%"
      zIndex={30}
    >
      <Typography
        color="white"
        textAlign="center"
        variant="caption"
        width="100%"
      >
        {currentSubtitle?.text || ''}
      </Typography>
    </Stack>
  );
};

export default Subtitles;
