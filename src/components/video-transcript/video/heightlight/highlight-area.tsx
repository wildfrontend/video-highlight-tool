'use client';

import { Box } from '@mui/material';

import { useVideoControlStore } from '@/components/video-transcript/store/video-control';
import { convertTimeline, formatTimebar } from '@/utils/video-transcript';

import { useVideoRef } from '../../providers/video-ref';
import { useTranscriptStore } from '../../store/transcripts';
import { HiddenSlider } from './styles';

/** 確保 value 在影片範圍內 */
const clamp = (value: number, min: number, max: number) =>
  Math.max(min, Math.min(value, max));

const VideoProgressPointer: React.FC<{ pointerPosition: number }> = ({
  pointerPosition,
}) => {
  return (
    <Box
      sx={{
        position: 'absolute',
        top: 0,
        left: `${pointerPosition}%`, // 這裡要用反引號包起來
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
        pointerEvents: 'none',
      }}
    />
  );
};

const HighlightAreaItem: React.FC<{
  item: { start_seconds: number; end_seconds: number };
  duration: number;
}> = ({ item, duration }) => (
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
      pointerEvents: 'none',
    }}
  />
);

const HightLightArea: React.FC = () => {
  const videoRef = useVideoRef();
  const { duration, proccess, setProccess } = useVideoControlStore();
  const { transcript } = useTranscriptStore();
  const highlight = convertTimeline(transcript);

  const pointerPosition = (proccess / duration) * 100;
  return (
    <Box position="relative" width="100%" height={50} bgcolor="white" border="1px solid" p={0}>
      {highlight.map((item, index) => (
        <HighlightAreaItem key={index} item={item} duration={duration} />
      ))}
      {/* 紅色指針 */}
      <VideoProgressPointer pointerPosition={pointerPosition} />
      {/* Slider 作為進度條 */}
      <HiddenSlider
        max={duration}
        min={0}
        value={proccess}
        step={0.01}
        valueLabelDisplay="auto"
        valueLabelFormat={formatTimebar}
        sx={{ position: 'absolute', top: 0, width: '100%' }}
        onChange={(e, newValue) => {
          const newTime = Array.isArray(newValue) ? newValue[0] : newValue;
          const value = clamp(newTime, 0, duration);
          if (videoRef.current) {
            videoRef.current.currentTime = value;
          }
          setProccess(value);
        }}
      />
    </Box>
  );
};
export default HightLightArea;
