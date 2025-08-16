'use client';

import CloudUploadIcon from '@mui/icons-material/CloudUpload';
import {
  Alert,
  Box,
  Button,
  LinearProgress,
  Stack,
  Typography,
} from '@mui/material';
import { useRequest } from 'ahooks';
import {
  type FC,
  useCallback,
  useEffect,
  useMemo,
  useRef,
  useState,
} from 'react';
import { FileRejection, useDropzone } from 'react-dropzone';
import ReactPlayer from 'react-player';

import { useTranscriptStore } from '@/stores/transcripts';

const MAX_SIZE_BYTES = 1024 * 1024 * 200; // 200MB
const ACCEPT = { 'video/*': [] } as const;

type UIPhase = 'idle' | 'picked' | 'preview';

const useUploadVideo = () => {
  const [phase, setPhase] = useState<UIPhase>('idle');
  const [file, setFile] = useState<File | null>(null);
  const [blobUrl, setBlobUrl] = useState<string>('');
  const [error, setError] = useState<string | null>(null);
  const [progress, setProgress] = useState<number>(0);
  const { setTranscript } = useTranscriptStore();
  const timerRef = useRef<number | null>(null);

  const revokeBlob = useCallback((url?: string) => {
    if (url) URL.revokeObjectURL(url);
  }, []);

  useEffect(() => {
    return () => {
      revokeBlob(blobUrl);
      if (timerRef.current) window.clearInterval(timerRef.current);
    };
  }, [blobUrl, revokeBlob]);

  // --- 檔案選取 ---
  const onDropAccepted = useCallback(
    (accepted: File[]) => {
      const f = accepted[0];
      setError(null);
      revokeBlob(blobUrl);
      setFile(f);
      setBlobUrl('');
      setProgress(0);
      setPhase('picked');
    },
    [blobUrl, revokeBlob]
  );

  const onDropRejected = useCallback(
    (rejections: FileRejection[]) => {
      const r = rejections[0];
      if (!r) return;
      const err = r.errors[0];
      let msg = '檔案被拒絕';
      if (err?.code === 'file-too-large')
        msg = `檔案過大（上限 ${(MAX_SIZE_BYTES / 1024 / 1024).toFixed(0)}MB）`;
      else if (err?.code === 'file-invalid-type')
        msg = '檔案類型不支援，請選擇影片檔';
      else if (err?.code === 'too-many-files') msg = '一次只能選 1 個檔案';
      setError(msg);
      setPhase('idle');
      setFile(null);
      revokeBlob(blobUrl);
      setBlobUrl('');
    },
    [blobUrl, revokeBlob]
  );

  const { open, getInputProps } = useDropzone({
    accept: ACCEPT,
    maxSize: MAX_SIZE_BYTES,
    multiple: false,
    noClick: true,
    noDrag: true,
    onDropAccepted,
    onDropRejected,
  });

  // --- 模擬上傳服務：回傳 blob URL ---
  const uploadService = useCallback(async (): Promise<{
    videoUrl: string;
    transcript: any;
  }> => {
    if (!file) throw new Error('No file');
    setError(null);
    setProgress(0);

    // 模擬進度
    const progressTimer = setInterval(() => {
      setProgress((prev) => {
        if (prev >= 90) return prev;
        // 先加上隨機增量，再四捨五入成整數
        return Math.min(90, Math.round(prev + Math.random() * 10));
      });
    }, 300);

    const res = await fetch('/api/video/transcripts', {
      method: 'POST',
    });
    clearInterval(progressTimer);

    if (!res.ok) throw new Error('API failed');
    const data = await res.json();

    setProgress(100);

    return {
      videoUrl: URL.createObjectURL(file), // 本地預覽
      transcript: data.transcript,
    };
  }, [file]);
  const {
    run: runUpload,
    cancel,
    loading: isUploading,
  } = useRequest(uploadService, {
    manual: true,
    onSuccess: ({ videoUrl, transcript }) => {
      revokeBlob(blobUrl);
      setBlobUrl(videoUrl);
      setPhase('preview');

      // 把 transcript 存到狀態（後面 Editing Area 用）
      console.log('字幕精華 JSON', transcript);
      setTranscript(transcript);
    },
    onError: (e) => {
      setError(e instanceof Error ? e.message : '上傳失敗');
    },
  });

  // 觸發模擬上傳
  const simulateUpload = useCallback(() => {
    if (!file || phase !== 'picked') return;
    runUpload();
  }, [file, phase, runUpload]);

  // 清除回初始
  const clear = useCallback(() => {
    cancel(); // 中斷進行中的請求
    if (timerRef.current) {
      window.clearInterval(timerRef.current);
      timerRef.current = null;
    }
    setFile(null);
    revokeBlob(blobUrl);
    setBlobUrl('');
    setProgress(0);
    setError(null);
    setPhase('idle');
  }, [blobUrl, cancel, revokeBlob]);

  const flags = useMemo(
    () => ({
      isPicked: phase === 'picked',
      isPreview: phase === 'preview',
    }),
    [phase]
  );

  return {
    ...flags,
    isUploading,
    file,
    blobUrl,
    error,
    progress,
    openFileDialog: open,
    simulateUpload,
    clear,
    inputProps: getInputProps(),
  };
};

const UploadVideo: FC = () => {
  const {
    isPicked,
    isUploading,
    isPreview,
    file,
    blobUrl,
    error,
    progress,
    openFileDialog,
    simulateUpload,
    clear,
    inputProps,
  } = useUploadVideo();

  return (
    <Stack alignItems="center" spacing={2} textAlign="center">
      {/* 預覽（react-player 用 url） */}
      {isPreview && blobUrl ? (
        <>
          <Box sx={{ width: '100%', maxWidth: 880, mt: 1 }}>
            <ReactPlayer
              controls
              height="auto"
              playing={false}
              src={blobUrl}
              width="100%"
            />
          </Box>
        </>
      ) : (
        <>
          <CloudUploadIcon fontSize="large" />

          <Typography variant="h6">上傳你的影片</Typography>
          <Typography color="text.secondary" variant="body2">
            選擇檔案後，按「模擬上傳」會顯示影片（不會真的上傳）。
          </Typography>

          {/* 隱藏 input（用按鈕觸發選檔） */}
          <input {...inputProps} style={{ display: 'none' }} />

          {/* 操作區（預覽階段隱藏） */}
          {!isPreview && (
            <Stack direction="row" spacing={1}>
              <Button
                disabled={isUploading}
                onClick={openFileDialog}
                variant="outlined"
              >
                選擇檔案
              </Button>
              <Button
                disabled={!isPicked || isUploading}
                onClick={simulateUpload}
                variant="contained"
              >
                {isUploading ? '上傳中…' : '模擬上傳'}
              </Button>
            </Stack>
          )}

          {/* 檔名提示 */}
          {isPicked && !isUploading && (
            <Typography color="text.secondary" sx={{ mt: 1 }} variant="body2">
              已選擇：{file?.name}（
              {file ? (file.size / 1024 / 1024).toFixed(1) : 0} MB）
            </Typography>
          )}

          {/* 錯誤訊息 */}
          {error && (
            <Alert severity="error" sx={{ width: '100%', maxWidth: 640 }}>
              {error}
            </Alert>
          )}

          {/* 進度條 */}
          {isUploading && (
            <Box sx={{ width: '100%', maxWidth: 640 }}>
              <LinearProgress value={progress} variant="determinate" />
              <Typography color="text.secondary" variant="caption">
                {Math.round(progress)}%
              </Typography>
            </Box>
          )}
        </>
      )}
    </Stack>
  );
};

export default UploadVideo;
