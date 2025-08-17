export type TranscriptSubtitleItem = {
  time: string;
  text: string;
  start_seconds: number;
  end_seconds: number;
};

export type TranscriptListItem = {
  label: string;
  start_seconds: number;
  start: string;
  end_seconds: number;
  end: string;
  captions: string;
  is_highlighted: boolean;
  subtitles: TranscriptSubtitleItem[];
};

export type TranscriptSegment = {
  title: string;
  items: TranscriptListItem[];
};

export type UploadVideoRespones = {
  success: true;
  transcript: TranscriptSegment[];
  videoUrl: '/mock-video.mp4';
};
