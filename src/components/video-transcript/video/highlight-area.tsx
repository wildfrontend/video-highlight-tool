import { Box } from '@mui/material';

import { useTranscriptStore } from '@/stores/transcripts';
import { useVideoControlStore } from '@/components/video-transcript/store/video-control';
import { convertTimeline } from '@/utils/video-transcript';

const VideoProccessPointer: React.FC<{ pointerPosition: number }> = ({
  pointerPosition,
}) => {
  return (
    <Box
      sx={{
        position: 'absolute',
        top: 0,
        left: `${pointerPosition}%`,
        width: '2px',
        height: '100%',
        bgcolor: 'error.main',
        zIndex: 10,
        '&::after': {
          content: '""',
          position: 'absolute',
          top: '-8px',
          left: '-4px',
          width: '10px',
          height: '10px',
          bgcolor: 'error.main',
          borderRadius: '50%',
          border: '2px solid white',
          boxShadow: 2,
        },
      }}
    />
  );
};

const VideoHighLightItem: React.FC<{
  item: {
    start_seconds: number;
    end_seconds: number;
  };
  duration: number;
}> = ({ item, duration }) => {
  return (
    <Box
      sx={{
        position: 'absolute',
        top: 0,
        height: '100%',
        bgcolor: 'primary.light',
        opacity: 0.3,
        borderRadius: 1,
        left: `${(item.start_seconds / duration) * 100}%`,
        width: `${((item.end_seconds - item.start_seconds) / duration) * 100}%`,
        border: '1px solid',
        borderColor: 'primary.main',
        '&:hover': {
          opacity: 0.5,
          bgcolor: 'primary.main',
        },
      }}
    />
  );
};

const VideoHightLightArea: React.FC = () => {
  const { duration, proccess } = useVideoControlStore();
  const { transcript } = useTranscriptStore();
  const highlight = convertTimeline(transcript);

  const pointerPosition = (proccess / duration) * 100;

  return (
    <Box
      bgcolor="grey.100"
      border="1px solid"
      borderColor="grey.300"
      height="50px"
      position="relative"
    >
      {highlight.map((item, index) => {
        return (
          <VideoHighLightItem duration={duration} item={item} key={index} />
        );
      })}
      <VideoProccessPointer pointerPosition={pointerPosition} />
    </Box>
  );
};

export default VideoHightLightArea;
