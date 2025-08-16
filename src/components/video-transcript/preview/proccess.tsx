import { Slider } from '@mui/material';

import { useVideoControlStore } from '@/stores/video-control';

const VideoProccessbar: React.FC = () => {
  const { duration, proccess, setProccess } = useVideoControlStore();
  return (
    <Slider
      max={+duration.toFixed(2)}
      min={0}
      onChange={(e, value) => {
        setProccess(value);
      }}
      step={0.01}
      value={proccess}
    ></Slider>
  );
};

export default VideoProccessbar;
