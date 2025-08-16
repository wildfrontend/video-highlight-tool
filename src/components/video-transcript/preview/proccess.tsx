import { Slider } from '@mui/material';
import { useVideoControlStore } from '@/stores/video-control';
import { useTranscriptStore } from '@/stores/transcripts';
import { convertTimeline } from '@/utils/video-transcript';

const VideoProccessbar: React.FC = () => {
  const { duration, proccess, setProccess } = useVideoControlStore();
  const { transcript } = useTranscriptStore();
  const highlight = convertTimeline(transcript);

  const marks = highlight.map((time) => ({
    value: +time.toFixed(2),
    label: '', // 可顯示時間
  }));

  return (
    <Slider
      max={+duration.toFixed(2)}
      min={0}
      step={0.01}
      value={proccess}
      marks={marks}
      onChange={(e, value) => setProccess(value as number)}
      sx={{
        height: 12, // 整個 slider 高度
        '& .MuiSlider-track': {
          height: 8, // 進度條高度
        },
        '& .MuiSlider-rail': {
          height: 8, // 背景條高度
        },
        '& .MuiSlider-thumb': {
          width: 24, // 滑桿圓點寬度
          height: 24, // 滑桿圓點高度
        },
        '& .MuiSlider-mark': {
          width: 8, // mark 點寬
          height: 8, // mark 點高
        },
      }}
    />
  );
};

export default VideoProccessbar;
