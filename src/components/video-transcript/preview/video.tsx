import { Button, Stack } from '@mui/material';
import { useCallback, useEffect, useRef } from 'react';
import ReactPlayer from 'react-player';

import { useVideoControlStore } from '@/stores/video-control';

import PlayerButton from './player';
import VideoProccessbar from './proccess';

const VideoPlayer: React.FC<{ videoUrl: string }> = ({ videoUrl }) => {
  const videoRef = useRef<HTMLVideoElement | null>(null);
  const { playing, proccess, setDuration } =
    useVideoControlStore();

  const setVideoRef = useCallback((player: HTMLVideoElement) => {
    if (!player) return;
    videoRef.current = player;
    setDuration(player.duration);
  }, []);

  useEffect(() => {
    if (videoRef.current) {
      videoRef.current.currentTime = proccess;
    }
  }, [proccess]);

  return (
    <Stack spacing={1}>
      <ReactPlayer
        ref={setVideoRef}
        height="auto"
        playing={playing}
        src={videoUrl}
        width="100%"
      />
      <Stack>
        <Stack direction="row" spacing={1}>
          <PlayerButton />
        </Stack>
        <VideoProccessbar />
      </Stack>
    </Stack>
  );
};

export default VideoPlayer;
