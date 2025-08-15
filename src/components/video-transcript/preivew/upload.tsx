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

const MAX_SIZE_BYTES = 1024 * 1024 * 200; // 200MB
const ACCEPT = { 'video/*': [] } as const;

type UIPhase = 'idle' | 'picked' | 'preview';

const useUploadVideo = () => {
  const [phase, setPhase] = useState<UIPhase>('idle');
  const [file, setFile] = useState<File | null>(null);
  const [blobUrl, setBlobUrl] = useState<string>('');
  const [error, setError] = useState<string | null>(null);
  const [progress, setProgress] = useState<number>(0);

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
  const uploadService = useCallback(async (): Promise<string> => {
    if (!file) throw new Error('No file');
    setError(null);
    setProgress(0);

    // 用計時器模擬進度，完成後產生 blob URL
    const url = await new Promise<string>((resolve, reject) => {
      let p = 0;
      timerRef.current = window.setInterval(() => {
        p += Math.random() * 18 + 7;
        if (p >= 100) {
          p = 100;
          setProgress(p);
          if (timerRef.current) {
            window.clearInterval(timerRef.current);
            timerRef.current = null;
          }
          try {
            resolve(URL.createObjectURL(file));
          } catch (e) {
            reject(e);
          }
        } else {
          setProgress(Math.min(99, Math.floor(p)));
        }
      }, 200);
    });

    return url;
  }, [file]);

  const {
    run: runUpload,
    cancel,
    loading: isUploading, // 由 useRequest 控制上傳中
  } = useRequest(uploadService, {
    manual: true,
    onSuccess: (url) => {
      // 釋放舊的 blob，設定新的並進入預覽
      revokeBlob(blobUrl);
      setBlobUrl(url);
      setPhase('preview');
    },
    onError: (e) => {
      setError(e instanceof Error ? e.message : '上傳失敗');
    },
    onFinally: () => {
      // 確保計時器清掉
      if (timerRef.current) {
        window.clearInterval(timerRef.current);
        timerRef.current = null;
      }
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
            {progress}%
          </Typography>
        </Box>
      )}

      {/* 預覽（react-player 用 url） */}
      {isPreview && blobUrl && (
        <>
          <Box sx={{ width: '100%', maxWidth: 880, mt: 1 }}>
            <ReactPlayer
              controls
              height="480px"
              playing={false}
              src={blobUrl}
              width="100%"
            />
            <Typography color="text.secondary" variant="caption">
              來源：本地檔案（尚未真正上傳）
            </Typography>
          </Box>
          <Button onClick={clear} sx={{ mt: 2 }} variant="outlined">
            清除
          </Button>
        </>
      )}
    </Stack>
  );
};

export default UploadVideo;
