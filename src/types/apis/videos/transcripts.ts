type Transcript = {
  title: string;
  items: TranscriptItem[];
};

type TranscriptItem = {
  label: string;
  start_seconds: number;
  start: string;
  captions: string;
};

export type UploadVideoRespones = {
  success: true;
  transcript: Transcript[];
  videoUrl: '/mock-video.mp4';
};
