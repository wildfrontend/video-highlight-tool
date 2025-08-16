import {
  Box,
} from '@mui/material';


import ReactPlayer from 'react-player';

const VideoPlayer: React.FC<{ videoUrl: string }> = ({ videoUrl }) => {
  return (
    <Box>
      <ReactPlayer
        controls
        height="auto"
        playing={false}
        src={videoUrl}
        width="100%"
      />
    </Box>
  );
};

export default VideoPlayer;
