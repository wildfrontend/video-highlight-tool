import PauseIcon from '@mui/icons-material/Pause';
import PlayArrowIcon from '@mui/icons-material/PlayArrow';
import { IconButton } from '@mui/material';

import { useVideoControlStore } from '@/components/video-transcript/store/video-control';

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

export default VideoPlayButton;
