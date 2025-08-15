'use client';

import {
  Box,
  Divider,
  List,
  ListItemButton,
  ListItemText,
  Typography,
} from '@mui/material';
import { FC } from 'react';

import { useTranscriptStore } from '@/stores/transcripts';

const TranscriptPanel: FC = ({}) => {
  const {transcript} = useTranscriptStore();

  return (
    <Box
      sx={{
        width: '100%',
        maxHeight: '100%',
        overflowY: 'auto',
        borderRight: 1,
        borderColor: 'divider',
        p: 2,
        bgcolor: 'background.paper',
      }}
    >
      {transcript.map((segment, segIndex) => (
        <Box key={segIndex} sx={{ mb: 3 }}>
          {/* 章節標題 */}
          <Typography variant="subtitle1" sx={{ fontWeight: 'bold', mb: 1 }}>
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
                    primaryTypographyProps={{
                      variant: 'body2',
                      sx: { color: 'text.primary' },
                    }}
                    secondaryTypographyProps={{
                      variant: 'caption',
                      sx: { color: 'text.secondary' },
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

          {segIndex < transcript.length - 1 && (
            <Divider sx={{ mt: 2, mb: 2 }} />
          )}
        </Box>
      ))}
    </Box>
  );
};

export default TranscriptPanel;
