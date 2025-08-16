import { Box, Container, Grid, Paper, Stack } from '@mui/material';

import TranscriptPanel from '@/components/video-transcript/editor/transcript-panel';
import PreviewArea from '@/components/video-transcript/preview/main';
import PanelHeader from '@/components/video-transcript/ui/header';

const Page = () => {
  return (
    <Container maxWidth="xl" sx={{ py: 2 }}>
      <Grid container height="100%" spacing={2} sx={{ py: 2 }}>
        <Grid order={{ xs: 2, lg: 1 }} size={{ xs: 12, lg: 6 }}>
          <Paper
            component={Stack}
            height="-webkit-fill-available"
            sx={{ height: { xs: '40dvh', lg: '800px' } }}
            variant="outlined"
          >
            <PanelHeader title="Transcript" />
            <Box flex={1} sx={{ overflowY: 'auto' }}>
              <TranscriptPanel />
            </Box>
          </Paper>
        </Grid>
        <Grid order={{ xs: 1, lg: 2 }} size={{ xs: 12, lg: 6 }}>
          <Paper
            component={Stack}
            height="-webkit-fill-available"
            sx={{ height: { xs: '50dvh', lg: '800px' } }}
            variant="outlined"
          >
            <PanelHeader title="Preview" />
            <Box flex={1}>
              <PreviewArea />
            </Box>
          </Paper>
        </Grid>
      </Grid>
    </Container>
  );
};

export default Page;
