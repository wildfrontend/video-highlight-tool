import {
  Box,
  Container,
  Grid,
  Paper,
  Stack,
} from '@mui/material';

import PanelHeader from '@/components/video-transcript/header';

const Page = () => {
  return (
    <Container maxWidth="xl" sx={{ height: '100dvh', py: 2 }}>
      <Grid container height="100%" spacing={2}>
        <Grid order={{ xs: 2, md: 1 }} size={{ xs: 12, lg: 6 }}>
          <Paper component={Stack} height="100%" variant="outlined">
            <PanelHeader title="Transcript" />
            <Box flex={1}></Box>
          </Paper>
        </Grid>
        {/* Preview（右 / 上） */}
        <Grid order={{ xs: 1, md: 2 }} size={{ xs: 12, lg: 6 }}>
          <Paper component={Stack} height="100%" variant="outlined">
            <PanelHeader title="Preview" />
            <Box flex={1}></Box>
          </Paper>
        </Grid>
      </Grid>
    </Container>
  );
};

export default Page;
