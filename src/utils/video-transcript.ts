import type { TranscriptSegment } from '@/types/apis/videos/transcripts';

export type TimelineItem = {
  start_seconds: number;
  end_seconds: number;
};

export const convertTimeline = (
  transcriptSegments: TranscriptSegment[]
): { start_seconds: number; end_seconds: number }[] => {
  return transcriptSegments
    .flatMap((section) => section.items)
    .filter((item) => item.is_highlighted)
    .map((item) => ({
      start_seconds: item.start_seconds,
      end_seconds: item.end_seconds,
    }));
};
