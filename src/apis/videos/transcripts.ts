import { UploadVideoRespones } from '@/types/apis/videos/transcripts';
import { mockAxios } from '@/utils/axios';

export const uploadVideo = () => {
  return mockAxios.post<UploadVideoRespones>('/video/transcripts');
};
