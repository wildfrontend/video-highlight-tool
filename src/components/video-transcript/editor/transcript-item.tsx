'use client';

import { Box, ButtonBase, ListItem, Typography } from '@mui/material';
import { useRef } from 'react';

import { useTranscriptStore } from '@/components/video-transcript/store/transcripts';
import { TranscriptListItem } from '@/types/apis/videos/transcripts';

import { useHighlightPlayer } from '../hooks/highlight-player';
import { TranscriptRow } from './styles';

const TranscriptItem: React.FC<{
  item: TranscriptListItem;
  itemIndex: number;
  segmentIndex: number;
}> = ({ item, itemIndex, segmentIndex }) => {
  const { setHighlighted } = useTranscriptStore();
  const { playHighlight, isPlayingHighlight } = useHighlightPlayer();

  const itemRef = useRef<HTMLLIElement>(null);
  const isPlaying = isPlayingHighlight({
    start_seconds: item.start_seconds,
    end_seconds: item.end_seconds,
  });

  const scrollToTop = () => {
    if (itemRef.current) {
      const container = itemRef.current.closest('[data-scroll-container]');
      if (container instanceof HTMLElement) {
        const itemTop = itemRef.current.offsetTop;
        container.scrollTo({
          top: itemTop - 8,
          behavior: 'smooth',
        });
      } else {
        itemRef.current.scrollIntoView({
          behavior: 'smooth',
          block: 'start',
        });
      }
    }
  };

  return (
    <ListItem
      ref={itemRef}
      sx={{
        mb: 0.5,
        p: 0,
      }}
    >
      <TranscriptRow isPlaying={isPlaying} isHighlighted={item.is_highlighted}>
        {/* 左邊時間按鈕 */}
        <ButtonBase
          onClick={(e) => {
            e.stopPropagation();
            playHighlight({
              start_seconds: item.start_seconds,
              end_seconds: item.end_seconds,
            });
            scrollToTop();
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
