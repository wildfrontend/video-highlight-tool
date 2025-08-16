import { Box, Slider, Stack, Typography } from '@mui/material';
import { useCallback } from 'react';

import { useTranscriptStore } from '@/stores/transcripts';
import { useVideoControlStore } from '@/stores/video-control';

import { customSliderStyles } from './styles';

const VideoProccessbar: React.FC = () => {
  const { duration, proccess, setProccess } = useVideoControlStore();
  const { transcript } = useTranscriptStore();

  // 處理進度條滑動
  const handleSliderChange = useCallback(
    (_event: Event, newValue: number | number[]) => {
      const newTime = Array.isArray(newValue) ? newValue[0] : newValue;
      setProccess(Math.max(0, Math.min(newTime, duration)));
    },
    [duration, setProccess]
  );

  // 格式化時間
  const formatTime = (seconds: number): string => {
    const mins = Math.floor(seconds / 60);
    const secs = Math.floor(seconds % 60);
    return `${mins.toString().padStart(2, '0')}:${secs.toString().padStart(2, '0')}`;
  };

  return (
    <Stack spacing={1} useFlexGap>
      <Slider
        max={duration}
        min={0}
        onChange={handleSliderChange}
        step={0.1}
        sx={customSliderStyles}
        value={proccess}
        valueLabelDisplay="auto"
        valueLabelFormat={formatTime}
      />

      {/* 時間標籤 */}
      <Box
        display="flex"
        justifyContent="space-between"
        sx={{
          px: 1,
          py: 1.5,
          bgcolor: 'white',
          borderRadius: 1,
          border: '1px solid',
          borderColor: 'grey.200',
        }}
      >
        <Typography
          color="text.primary"
          sx={{ fontWeight: 500 }}
          variant="body2"
        >
          當前時間: {formatTime(proccess)}
        </Typography>
        <Typography
          color="text.secondary"
          sx={{ fontWeight: 500 }}
          variant="body2"
        >
          總時長: {formatTime(duration)}
        </Typography>
      </Box>
    </Stack>
  );
};

export default VideoProccessbar;
