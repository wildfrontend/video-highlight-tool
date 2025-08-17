import { Box, Stack, Typography } from '@mui/material';

import HightLightArea from './highlight-area';
import HighLightPlayer from './highlight-player';

const HighlightControl: React.FC = () => {
  return (
    <Stack spacing={2} useFlexGap>
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

      <HighLightPlayer />
    </Stack>
  );
};

export default HighlightControl;
