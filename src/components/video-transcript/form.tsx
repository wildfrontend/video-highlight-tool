import CloudUploadIcon from '@mui/icons-material/CloudUpload';
import { Button, Paper, Stack, Typography } from '@mui/material';
import * as React from 'react';

const UploadVideo: React.FC = () => {
  return (
    <Paper sx={{ p: 4 }} variant="outlined">
      <Stack alignItems="center" spacing={2} textAlign="center">
        <CloudUploadIcon fontSize="large" />
        <Typography variant="h6">上傳你的影片</Typography>
        <Typography color="text.secondary" variant="body2">
          目前為 UI 版。點下面的按鈕可模擬上傳流程（不會真的上傳）。
        </Typography>
        <Stack direction="row" spacing={1}>
          <Button variant="contained">模擬上傳</Button>
          <Button disabled variant="text">
            或拖曳影片到此處
          </Button>
        </Stack>
      </Stack>
    </Paper>
  );
};

export default UploadVideo;
