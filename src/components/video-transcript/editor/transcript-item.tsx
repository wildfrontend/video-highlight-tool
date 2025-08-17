'use client';

import { Box, ButtonBase, ListItem, Stack, Typography } from '@mui/material';
import { useCallback, useEffect, useRef } from 'react';

import { useTranscriptStore } from '@/stores/transcripts';
import { useVideoControlStore } from '@/components/video-transcript/store/video-control';
import { TranscriptListItem } from '@/types/apis/videos/transcripts';

const TranscriptItem: React.FC<{
  item: TranscriptListItem;
  itemIndex: number;
  segmentIndex: number;
}> = ({ item, itemIndex, segmentIndex }) => {
  const { setProccess, proccess } = useVideoControlStore();
  const { setHighlighted } = useTranscriptStore();
  const itemRef = useRef<HTMLLIElement>(null);
  const lastScrollTime = useRef<number>(0);

  // 檢查當前播放時間是否在這個字幕項目的時間範圍內
  const isCurrentTime =
    proccess >= item.start_seconds && proccess <= item.end_seconds;

  // 當時間匹配時，自動滾動到該項目
  const scrollToItem = useCallback(() => {
    if (itemRef.current) {
      const now = Date.now();
      // 避免過於頻繁的滾動（至少間隔 500ms）
      if (now - lastScrollTime.current > 500) {
        itemRef.current.scrollIntoView({
          behavior: 'smooth',
          block: 'center',
          inline: 'nearest',
        });
        lastScrollTime.current = now;
      }
    }
  }, []);

  useEffect(() => {
    if (isCurrentTime) {
      scrollToItem();
    }
  }, [isCurrentTime, scrollToItem]);

  return (
    <ListItem
      ref={itemRef}
      sx={{
        mb: 0.5,
        p: 0,
        // 當時間匹配時，添加特殊樣式
        ...(isCurrentTime && {
          backgroundColor: 'rgba(255, 193, 7, 0.2)',
          borderLeft: '4px solid #ffc107',
          borderRadius: '4px',
          transition: 'all 0.3s ease-in-out',
          boxShadow: '0 2px 8px rgba(255, 193, 7, 0.3)',
        }),
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
            setProccess(item.start_seconds);
          }}
          sx={{
            minWidth: 60,
            px: 1,
            py: 0.5,
            fontWeight: 500,
            color: isCurrentTime ? '#ffc107' : 'primary.main',
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
            color={isCurrentTime ? 'text.primary' : 'text.primary'}
            sx={{
              fontWeight: isCurrentTime ? 600 : 400,
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
