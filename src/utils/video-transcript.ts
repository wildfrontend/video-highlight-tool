import type { TranscriptSegment } from '@/types/apis/videos/transcripts';

export const convertTimeline = (
  transcriptSegments: TranscriptSegment[]
): number[] => {
  return transcriptSegments.flatMap((section) =>
    section.items.map((item) => item.start_seconds)
  );
};
