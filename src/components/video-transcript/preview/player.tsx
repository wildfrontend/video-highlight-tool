import { Button } from '@mui/material';

import { useVideoControlStore } from '@/stores/video-control';

const PlayerButton: React.FC = () => {
  const { playing, setPlaying } = useVideoControlStore();
  return (
    <Button
      onClick={() => {
        setPlaying(!playing);
      }}
    >
      {playing ? '暫停' : '播放'}
    </Button>
  );
};

export default PlayerButton;
