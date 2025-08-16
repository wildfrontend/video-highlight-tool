import { Slider } from '@mui/material';

import { useVideoControlStore } from '@/stores/video-control';

const VideoProccessbar: React.FC = () => {
  const { duration, proccess, setProccess } = useVideoControlStore();
  return (
    <Slider
      min={0}
      max={+duration.toFixed(2)}
      step={0.01}
      value={proccess}
      onChange={(e, value) => {
        setProccess(value);
      }}
    ></Slider>
  );
};

export default VideoProccessbar;
