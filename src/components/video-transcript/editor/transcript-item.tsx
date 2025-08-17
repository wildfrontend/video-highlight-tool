'use client';

import { Box, ButtonBase, ListItem, Stack, Typography } from '@mui/material';
import { useRef } from 'react';

import { useTranscriptStore } from '@/components/video-transcript/store/transcripts';
import { TranscriptListItem } from '@/types/apis/videos/transcripts';

import { useActiveHighlight } from '../hooks/active-highlight';

const TranscriptItem: React.FC<{
  item: TranscriptListItem;
  itemIndex: number;
  segmentIndex: number;
}> = ({ item, itemIndex, segmentIndex }) => {
  const { setHighlighted } = useTranscriptStore();
  const { setHightlight } = useActiveHighlight();
  const itemRef = useRef<HTMLLIElement>(null);

  const scrollToTop = () => {
    if (itemRef.current) {
      const container = itemRef.current.closest('[data-scroll-container]');
      if (container instanceof HTMLElement) {
        const itemTop = itemRef.current.offsetTop;
        container.scrollTo({
          top: itemTop - 8, // 預留 8px 位移
          behavior: 'smooth',
        });
      } else {
        // 如果沒特別指定容器，就 fallback 用原本的方式
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
      <Stack
        alignItems="flex-start"
        direction="row"
        sx={{
          width: '100%',
          backgroundColor: item.is_highlighted
            ? 'rgba(25, 118, 210, 0.2)'
            : 'inherit',
          '&:hover': {
            backgroundColor: item.is_highlighted
              ? 'rgba(25, 118, 210, 0.2)'
              : 'rgba(0, 0, 0, 0.04)',
          },
        }}
      >
        {/* 左邊時間按鈕 */}
        <ButtonBase
          onClick={(e) => {
            e.stopPropagation();
            setHightlight({
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
      </Stack>
    </ListItem>
  );
};

export default TranscriptItem;
