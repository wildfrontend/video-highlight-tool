'use client';

import { List, Stack } from '@mui/material';

import { useTranscriptStore } from '@/components/video-transcript/store/transcripts';

import { ScrollContainer, SectionTitle } from './styles';
import TranscriptItem from './transcript-item';

const TranscriptPanel: React.FC = () => {
  const { transcript } = useTranscriptStore();
  return (
    <ScrollContainer data-scroll-container>
      {transcript.map((segment, segIndex) => (
        <Stack key={segIndex} sx={{ mb: 2 }}>
          <SectionTitle position="sticky" variant="subtitle1">
            {segment.title}
          </SectionTitle>
          <List dense disablePadding>
            {segment.items.map((item, itemIndex) => {
              return (
                <TranscriptItem
                  item={item}
                  itemIndex={itemIndex}
                  key={`${segIndex}-${itemIndex}`}
                  segmentIndex={segIndex}
                />
              );
            })}
          </List>
        </Stack>
      ))}
    </ScrollContainer>
  );
};

export default TranscriptPanel;
