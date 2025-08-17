'use client';

import { Box, ButtonBase, ListItem, Typography } from '@mui/material';
import { useEffect, useMemo } from 'react';

import { useTranscriptStore } from '@/components/video-transcript/store/transcripts';
import { TranscriptListItem } from '@/types/apis/videos/transcripts';

import { useHighlightPlayer } from '../hooks/highlight-player';
import { useScrollIntoView } from '../hooks/scroll-into-view';
import { useVideoControlStore } from '../store/video-control';
import { TranscriptRow } from './styles';

const TranscriptItem: React.FC<{
  item: TranscriptListItem;
  itemIndex: number;
  segmentIndex: number;
}> = ({ item, itemIndex, segmentIndex }) => {
  const { setHighlighted } = useTranscriptStore();
  const { playHighlight, isPlayingHighlight } = useHighlightPlayer();
  const { proccess } = useVideoControlStore();

  const isPlaying = isPlayingHighlight({
    start_seconds: item.start_seconds,
    end_seconds: item.end_seconds,
  });
  const isActive = useMemo(() => {
    return proccess >= item.start_seconds && proccess < item.end_seconds;
  }, [proccess, item.start_seconds, item.end_seconds]);

  const { ref: itemRef, scrollToView } = useScrollIntoView();

  useEffect(() => {
    if (isActive) {
      scrollToView();
    }
  }, [isActive, scrollToView]);

  return (
    <ListItem
      ref={itemRef}
      sx={{
        mb: 0.5,
        p: 0,
      }}
    >
      <TranscriptRow isHighlighted={item.is_highlighted} isPlaying={isPlaying}>
        {/* 左邊時間按鈕 */}
        <ButtonBase
          onClick={(e) => {
            e.stopPropagation();
            playHighlight({
              start_seconds: item.start_seconds,
              end_seconds: item.end_seconds,
            });
            scrollToView();
          }}
          sx={{
            minWidth: 60,
            px: 1,
            py: 0.5,
            fontWeight: 500,
            color: 'primary.main',
            transition: 'color 0.3s ease-in-out',
          }}
        >
          {item.start}
        </ButtonBase>

        {/* 右邊字幕區塊 */}
        <Box
          onClick={(e) => {
            e.stopPropagation();
            setHighlighted(segmentIndex, itemIndex, !item.is_highlighted);
          }}
          sx={{
            flex: 1,
            px: 1,
            py: 0.5,
            cursor: 'pointer',
          }}
        >
          <Typography
            color={'text.primary'}
            sx={{
              fontWeight: 400,
              transition: 'font-weight 0.3s ease-in-out',
            }}
            variant="body2"
          >
            {item.label}
          </Typography>
          <Typography color="text.secondary" variant="caption">
            {item.captions}
          </Typography>
        </Box>
      </TranscriptRow>
    </ListItem>
  );
};

export default TranscriptItem;
