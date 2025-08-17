'use client';

import { useVideoControlStore } from '@/components/video-transcript/store/video-control';

import UploadVideo from '../upload';
import VideoPlayer from '../video/main';

const PreviewArea: React.FC = () => {
  const { videoUrl } = useVideoControlStore();
  if (videoUrl) {
    return <VideoPlayer videoUrl={videoUrl} />;
  }
  return <UploadVideo />;
};

export default PreviewArea;
