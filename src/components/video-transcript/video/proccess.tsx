import PauseIcon from '@mui/icons-material/Pause';
import PlayArrowIcon from '@mui/icons-material/PlayArrow';
import { Box, IconButton, Slider, Stack, Typography } from '@mui/material';
import { useCallback } from 'react';

import { useVideoControlStore } from '@/components/video-transcript/store/video-control';
import { formatTime } from '@/utils/video-transcript';

const VideoPlayButton: React.FC = () => {
  const { playing, setPlaying } = useVideoControlStore();
  return (
    <IconButton
      onClick={() => {
        setPlaying(!playing);
      }}
      sx={{
        color: 'white',
        bgcolor: 'rgba(255, 255, 255, 0.2)',
        '&:hover': {
          bgcolor: 'rgba(255, 255, 255, 0.3)',
        },
        width: 36,
        height: 36,
      }}
    >
      {playing ? <PauseIcon /> : <PlayArrowIcon />}
    </IconButton>
  );
};

const VideoTimebar: React.FC = () => {
  const { duration, proccess } = useVideoControlStore();
  return (
    <Box display="flex" gap={2}>
      <Typography color="white" fontWeight={600} variant="body2">
        {formatTime(proccess)}
      </Typography>
      <Typography
        color="rgba(255, 255, 255, 0.8)"
        fontWeight={500}
        variant="body2"
      >
        {formatTime(duration)}
      </Typography>
    </Box>
  );
};

const VideoProccessbar: React.FC = () => {
  const { duration, proccess, setProccess } = useVideoControlStore();

  // 處理進度條滑動
  const handleSliderChange = useCallback(
    (_event: Event, newValue: number | number[]) => {
      const newTime = Array.isArray(newValue) ? newValue[0] : newValue;
      setProccess(Math.max(0, Math.min(newTime, duration)));
    },
    [duration, setProccess]
  );

  return (
    <Slider
      max={duration}
      min={0}
      onChange={handleSliderChange}
      step={0.1}
      sx={{
        '&.MuiSlider-root': {
          padding: '12px 0',
        },
        '& .MuiSlider-track': {
          height: 6,
          borderRadius: 3,
          bgcolor: 'white',
        },
        '& .MuiSlider-rail': {
          bgcolor: 'rgba(255, 255, 255, 0.3)',
          height: 6,
          borderRadius: 3,
        },
        '& .MuiSlider-thumb': {
          width: 4,
          height: 12,
          borderRadius: 0,
          bgcolor: 'white',
          boxShadow: 3,
          '&:hover, &.Mui-focusVisible': {
            boxShadow: 6,
          },
          '&.Mui-active': {
            boxShadow: 8,
          },
          transition: 'all 0.2s ease-in-out',
        },
        '& .MuiSlider-valueLabel': {
          bgcolor: 'primary.main',
          color: 'white',
          fontWeight: 600,
          fontSize: '0.875rem',
        },
      }}
      value={proccess}
      valueLabelDisplay="auto"
      valueLabelFormat={formatTime}
    />
  );
};

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
