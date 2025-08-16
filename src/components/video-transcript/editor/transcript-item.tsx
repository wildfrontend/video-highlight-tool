'use client';

import { Box, ButtonBase, ListItem, Stack, Typography } from '@mui/material';

import { useTranscriptStore } from '@/stores/transcripts';
import { useVideoControlStore } from '@/stores/video-control';
import { TranscriptListItem } from '@/types/apis/videos/transcripts';

const TranscriptItem: React.FC<{
  item: TranscriptListItem;
  itemIndex: number;
  segmentIndex: number;
}> = ({ item, itemIndex, segmentIndex }) => {
  const { setProccess } = useVideoControlStore();
  const { setHighlighted } = useTranscriptStore();

  return (
    <ListItem sx={{ mb: 0.5, p: 0 }}>
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
            color: 'primary.main',
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
          <Typography color="text.primary" variant="body2">
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
