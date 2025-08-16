export type TranscriptSegment = {
  title: string;
  items: TranscriptItem[];
};

export type TranscriptItem = {
  label: string;
  start_seconds: number;
  start: string;
  captions: string;
};

export type UploadVideoRespones = {
  success: true;
  transcript: TranscriptSegment[];
  videoUrl: '/mock-video.mp4';
};
