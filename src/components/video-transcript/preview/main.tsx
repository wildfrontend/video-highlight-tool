import { Box } from '@mui/material';

import UploadVideo from './upload';

const PreviewArea: React.FC = () => {
  return (
    <Box p={2}>
      <UploadVideo />
    </Box>
  );
};

export default PreviewArea;
