'use client';

import {
  Box,
  Divider,
  List,
  ListItemButton,
  ListItemText,
  Stack,
  Typography,
} from '@mui/material';
import { FC } from 'react';

import { useVideoControlStore } from '@/stores/video-control';
import { TranscriptListItem } from '@/types/apis/videos/transcripts';

const TranscriptItem: React.FC<{
  item: TranscriptListItem;
}> = ({ item }) => {
  const { setProccess } = useVideoControlStore();
  return (
    <ListItemButton
      sx={{
        mb: 0.5,
        borderRadius: 1,
      }}
    >
      <ListItemText
        primary={
          <Box component="span" sx={{ display: 'flex', gap: 1 }}>
            <Typography
              sx={{
                minWidth: 50,
                fontWeight: 500,
                color: 'primary.main',
              }}
              variant="caption"
            >
              {item.start}
            </Typography>
            {item.label}
          </Box>
        }
        secondary={item.captions}
        onClick={() => {
          setProccess(item.start_seconds);
        }}
        slotProps={{
          primary: {
            variant: 'body2',
            sx: { color: 'text.primary' },
          },
          secondary: {
            variant: 'caption',
            sx: { color: 'text.secondary' },
          },
        }}
      />
    </ListItemButton>
  );
};

export default TranscriptItem;
