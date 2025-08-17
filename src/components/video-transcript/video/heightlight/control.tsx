import { Box, Stack, Typography } from '@mui/material';

import HighLightPlayer from './highlight-player';
import HightLightArea from './highlight-area';

const HighlightControl: React.FC = () => {
  return (
    <Stack spacing={2}>
      <Typography
        color="text.primary"
        fontWeight={600}
        gutterBottom
        variant="h6"
      >
        精華片段
      </Typography>

      <Box px={1}>
        <HightLightArea />
      </Box>

      <Stack spacing={1}>
        <HighLightPlayer />
      </Stack>
    </Stack>
  );
};

export default HighlightControl;
