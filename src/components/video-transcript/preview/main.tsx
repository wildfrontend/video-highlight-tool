import { Box } from '@mui/material';

import UploadVideo from './upload';

const PreviewArea: React.FC = () => {
  return (
    <Box
      sx={{
        p: 2,
        height: '100%',
        display: 'flex',
        flexDirection: 'column',
        justifyContent: 'center',
        alignItems: 'center',
      }}
    >
      <UploadVideo />
    </Box>
  );
};

export default PreviewArea;
