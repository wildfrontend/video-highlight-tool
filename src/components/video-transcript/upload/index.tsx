'use client';

import CloudUploadIcon from '@mui/icons-material/CloudUpload';
import { Alert, Button, Stack, Typography } from '@mui/material';
import { useRequest } from 'ahooks';
import { type FC, useState } from 'react';
import { useDropzone } from 'react-dropzone';

import { uploadVideo } from '@/apis/videos/transcripts';
import { useTranscriptStore } from '@/components/video-transcript/store/transcripts';
import { useVideoControlStore } from '@/components/video-transcript/store/video-control';

const UploadVideo: FC = () => {
  const { setTranscript } = useTranscriptStore();
  const { setVideoUrl } = useVideoControlStore();
  const { run: onUpload, loading: isUploading } = useRequest(uploadVideo, {
    manual: true,
    onSuccess: (res) => {
      const transcript = res.data.transcript;
      const videoUrl = res.data.videoUrl;
      setVideoUrl(videoUrl);
      setTranscript(transcript);
    },
    onError: (e) => {
      setError(e instanceof Error ? e.message : '上傳失敗');
    },
  });
  const [error, setError] = useState<string | null>(null);
  const [file, setFile] = useState<File | null>(null);
  const { open: openFileDialog, getInputProps } = useDropzone({
    accept: { 'video/*': [] },
    maxSize: 1024 * 1024 * 200,
    multiple: false,
    noClick: true,
    noDrag: true,
    onDropAccepted: (accepted) => {
      const f = accepted[0];
      setError(null);
      setFile(f);
    },
    onDropRejected: (rejections) => {
      const r = rejections[0];
      setError(r.errors[0].message);
    },
  });
  return (
    <Stack
      alignItems="center"
      height="100%"
      justifyContent="center"
      spacing={2}
    >
      <input {...getInputProps()} style={{ display: 'none' }} />
      <CloudUploadIcon fontSize="large" />
      <Typography variant="h6">上傳你的影片</Typography>
      <Typography color="text.secondary" variant="body2">
        選擇檔案後，按「上傳」會顯示影片（不會真的上傳）。
      </Typography>
      <Stack direction="row" spacing={1}>
        <Button
          disabled={isUploading}
          onClick={openFileDialog}
          variant="outlined"
        >
          選擇檔案
        </Button>
        <Button
          disabled={isUploading || !file}
          loading={isUploading}
          onClick={onUpload}
          variant="contained"
        >
          上傳
        </Button>
      </Stack>
      {error && (
        <Alert severity="error" sx={{ width: '100%', maxWidth: 640 }}>
          {error}
        </Alert>
      )}
      {!!file && !isUploading && (
        <Typography color="text.secondary" sx={{ mt: 1 }} variant="body2">
          已選擇：{file?.name}（
          {file ? (file.size / 1024 / 1024).toFixed(1) : 0} MB）
        </Typography>
      )}
    </Stack>
  );
};

export default UploadVideo;
