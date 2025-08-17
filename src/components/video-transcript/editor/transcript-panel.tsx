'use client';

import { Box, Divider, List, Stack, Typography } from '@mui/material';
import { FC } from 'react';

import { useTranscriptStore } from '@/components/video-transcript/store/transcripts';

import TranscriptItem from './transcript-item';

const TranscriptPanel: FC = () => {
  const { transcript } = useTranscriptStore();
  return (
    <Stack
      bgcolor="grey.50"
      divider={<Divider sx={{ my: 1 }} />}
      height="100%"
      overflow="hidden"
    >
      <Box
        data-scroll-container
        sx={{
          overflowY: 'auto',
          height: '100%',
          px: 1,
          '&::-webkit-scrollbar': {
            width: '8px',
          },
          '&::-webkit-scrollbar-track': {
            backgroundColor: 'rgba(0, 0, 0, 0.1)',
            borderRadius: '4px',
          },
          '&::-webkit-scrollbar-thumb': {
            backgroundColor: 'rgba(0, 0, 0, 0.3)',
            borderRadius: '4px',
            '&:hover': {
              backgroundColor: 'rgba(0, 0, 0, 0.5)',
            },
          },
        }}
      >
        {transcript.map((segment, segIndex) => (
          <Stack key={segIndex} sx={{ mb: 2 }}>
            {/* 章節標題 */}
            <Typography
              fontWeight="bold"
              position="sticky"
              sx={{
                mb: 1,
                pl: 1,
                pt: 1,
                top: 0,
                bgcolor: 'grey.50',
                zIndex: 1,
                py: 0.5,
              }}
              top="0"
              variant="subtitle1"
            >
              {segment.title}
            </Typography>

            <List dense disablePadding>
              {segment.items.map((item, itemIndex) => {
                return (
                  <TranscriptItem
                    item={item}
                    itemIndex={itemIndex}
                    key={itemIndex}
                    segmentIndex={segIndex}
                  />
                );
              })}
            </List>
          </Stack>
        ))}
      </Box>
    </Stack>
  );
};

export default TranscriptPanel;
