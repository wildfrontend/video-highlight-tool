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

import { useTranscriptStore } from '@/stores/transcripts';

const TranscriptPanel: FC = () => {
  const { transcript } = useTranscriptStore();
  return (
    <Stack divider={<Divider sx={{ my: 1 , overflowY: 'scroll'}} />}>
      {transcript.map((segment, segIndex) => (
        <Stack key={segIndex}>
          {/* 章節標題 */}
          <Typography
            variant="subtitle1"
            sx={{ fontWeight: 'bold', mb: 1, pl: 1, pt: 1 }}
          >
            {segment.title}
          </Typography>

          <List dense disablePadding>
            {segment.items.map((item, itemIndex) => {
              return (
                <ListItemButton
                  key={itemIndex}
                  sx={{
                    mb: 0.5,
                    borderRadius: 1,
                  }}
                >
                  <ListItemText
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
                    primary={
                      <Box component="span" sx={{ display: 'flex', gap: 1 }}>
                        <Typography
                          variant="caption"
                          sx={{
                            minWidth: 50,
                            fontWeight: 500,
                            color: 'primary.main',
                          }}
                        >
                          {item.start}
                        </Typography>
                        {item.label}
                      </Box>
                    }
                    secondary={item.captions}
                  />
                </ListItemButton>
              );
            })}
          </List>
        </Stack>
      ))}
    </Stack>
  );
};

export default TranscriptPanel;
