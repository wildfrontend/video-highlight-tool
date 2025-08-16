import { Button, Stack } from '@mui/material';
import { useCallback, useRef } from 'react';
import ReactPlayer from 'react-player';

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