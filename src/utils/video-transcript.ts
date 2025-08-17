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

// 格式化時間
export const formatTimebar = (seconds: number): string => {
  const mins = Math.floor(seconds / 60);
  const secs = Math.floor(seconds % 60);
  return `${mins.toString().padStart(2, '0')}:${secs.toString().padStart(2, '0')}`;
};

/**
 * 時間秒數最多小數點第二位
 */
export const timeFixed2 = (value: number): number => {
  return +value.toFixed(2);
};
