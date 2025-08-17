import { useVideoControlStore } from '@/components/video-transcript/store/video-control';
import { formatTimebar } from '@/utils/video-transcript';

import { useVideoRef } from '../../providers/video-ref';
import { StyledSlider } from '../../ui/silder';

/**
 * 確保value在影片範圍內
 */
const clamp = (value: number, min: number, max: number) => {
  return Math.max(min, Math.min(value, max));
};

const VideoProccessbar: React.FC = () => {
  const videoRef = useVideoRef();
  const { duration, proccess, setProccess } = useVideoControlStore();
  return (
    <StyledSlider
      max={duration}
      min={0}
      onChange={(e, newValue) => {
        const newTime = Array.isArray(newValue) ? newValue[0] : newValue;
        const value = clamp(newTime, 0, duration);
        if (videoRef.current) {
          videoRef.current.currentTime = value;
        }
        setProccess(value);
      }}
      step={0.01}
      value={proccess}
      valueLabelDisplay="auto"
      valueLabelFormat={formatTimebar}
    />
  );
};

export default VideoProccessbar;
