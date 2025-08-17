import { Box, Stack, Typography, styled } from '@mui/material';

export const ScrollContainer = styled(Box)(({ theme }) => ({
  overflowY: 'auto',
  height: '100%',
  backgroundColor: theme.palette.grey[50],
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
}));

export const SectionTitle = styled(Typography)(({ theme }) => ({
  fontWeight: 'bold',
  marginBottom: theme.spacing(1),
  paddingLeft: theme.spacing(1),
  paddingTop: theme.spacing(1),
  paddingBottom: theme.spacing(1),
  top: 0,
  backgroundColor: theme.palette.grey[50],
  zIndex: 1,
}));

interface TranscriptRowProps {
  isPlaying?: boolean;
  isHighlighted?: boolean;
}

export const TranscriptRow = styled(Stack, {
  shouldForwardProp: (prop) => prop !== 'isPlaying' && prop !== 'isHighlighted',
})<TranscriptRowProps>(({ theme, isPlaying, isHighlighted }) => ({
  width: '100%',
  alignItems: 'flex-start',
  flexDirection: 'row',
  backgroundColor: isPlaying
    ? `${theme.palette.secondary.main}33` // 播放中：主色 + 20% 透明度
    : isHighlighted
      ? 'rgba(25, 118, 210, 0.2)' // 精華：保留原本樣式
      : 'inherit',
  '&:hover': {
    backgroundColor: isPlaying
      ? `${theme.palette.secondary.main}55` // 播放中 hover：更深一點
      : isHighlighted
        ? 'rgba(25, 118, 210, 0.2)' // 精華 hover：保持不變
        : 'rgba(0, 0, 0, 0.04)',
  },
}));
