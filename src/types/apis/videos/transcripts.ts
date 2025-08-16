export type TranscriptSegment = {
  title: string;
  items: TranscriptListItem[];
};

export type TranscriptListItem = {
  label: string;
  start_seconds: number;
  start: string;
  end_seconds: number;
  end: string;
  captions: string;
  is_highlighted: boolean;
};

export type UploadVideoRespones = {
  success: true;
  transcript: TranscriptSegment[];
  videoUrl: '/mock-video.mp4';
};
