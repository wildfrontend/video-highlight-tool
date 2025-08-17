'use client';

import { useVideoControlStore } from '@/components/video-transcript/store/video-control';

import UploadVideo from '../upload';
import VideoPlayer from '../video';
import VideoRefProvider from '../video/video-ref';

const PreviewArea: React.FC = () => {
  const { videoUrl } = useVideoControlStore();
  if (videoUrl) {
    return (
      <VideoRefProvider>
        <VideoPlayer videoUrl={videoUrl} />
      </VideoRefProvider>
    );
  }
  return <UploadVideo />;
};

export default PreviewArea;
