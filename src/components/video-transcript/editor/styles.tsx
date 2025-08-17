import { Box, Typography, styled } from '@mui/material';

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
