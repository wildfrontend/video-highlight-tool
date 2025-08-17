import { Box, Container, Grid, Paper, Stack } from '@mui/material';

import TranscriptPanel from '@/components/video-transcript/editor/transcript-panel';
import PreviewArea from '@/components/video-transcript/preview';
import VideoRefProvider from '@/components/video-transcript/providers/video-ref';
import PanelHeader from '@/components/video-transcript/ui/header';

const Page = () => {
  return (
    <VideoRefProvider>
      <Container maxWidth="xl" sx={{ py: 2 }}>
        <Grid container height="100%" spacing={2} sx={{ py: 2 }}>
          <Grid order={{ xs: 2, md: 1 }} size={{ xs: 12, md: 6 }}>
            <Paper
              component={Stack}
              height="-webkit-fill-available"
              sx={{ height: { xs: '40dvh', md: '800px' } }}
              variant="outlined"
            >
              <PanelHeader title="Transcript" />
              <Box flex={1} sx={{ overflowY: 'auto' }}>
                <TranscriptPanel />
              </Box>
            </Paper>
          </Grid>
          <Grid order={{ xs: 1, md: 2 }} size={{ xs: 12, md: 6 }}>
            <Paper
              component={Stack}
              height="-webkit-fill-available"
              sx={{ height: { xs: '60dvh', md: '800px' } }}
              variant="outlined"
            >
              <PanelHeader title="Preview" />
              <Box bgcolor="grey.100" flex={1} p={2} sx={{ overflowY: 'auto' }}>
                <PreviewArea />
              </Box>
            </Paper>
          </Grid>
        </Grid>
      </Container>
    </VideoRefProvider>
  );
};

export default Page;
