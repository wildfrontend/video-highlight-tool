'use client';

import {
  Divider,
  List,
  Stack,
  Typography,
} from '@mui/material';
import { FC } from 'react';

import { useTranscriptStore } from '@/stores/transcripts';

import TranscriptItem from './transcript-item';

const TranscriptPanel: FC = () => {
  const { transcript } = useTranscriptStore();
  return (
    <Stack divider={<Divider sx={{ my: 1, overflowY: 'scroll' }} />}>
      {transcript.map((segment, segIndex) => (
        <Stack key={segIndex}>
          {/* 章節標題 */}
          <Typography
            sx={{ fontWeight: 'bold', mb: 1, pl: 1, pt: 1 }}
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
    </Stack>
  );
};

export default TranscriptPanel;
