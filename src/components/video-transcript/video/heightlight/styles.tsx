import { Box, Slider, sliderClasses, styled } from '@mui/material';

interface VideoProgressPointerProps {
  pointerPosition: number;
}

export const VideoProgressPointer = styled(Box)<VideoProgressPointerProps>(
  ({ theme, pointerPosition }) => ({
    position: 'absolute',
    top: 0,
    left: `${pointerPosition}%`,
    width: 2,
    height: '100%',
    bgcolor: theme.palette.error.main,
    zIndex: 10,
    pointerEvents: 'none',
    '&::after': {
      content: '""',
      position: 'absolute',
      top: -8,
      left: -4,
      width: 10,
      height: 10,
      bgcolor: theme.palette.error.main,
      borderRadius: '50%',
      border: `2px solid ${theme.palette.common.white}`,
      boxShadow: theme.shadows[2],
    },
  })
);

export const HiddenSlider = styled(Slider)(() => ({
  color: 'transparent', // 隱藏 track 顏色
  height: 0, // 隱藏整個 Slider 高度
  padding: 0,
  [`& .${sliderClasses.track}`]: {
    height: 0,
    backgroundColor: 'transparent',
  },
  [`& .${sliderClasses.rail}`]: {
    height: 0,
    backgroundColor: 'transparent',
  },
  [`& .${sliderClasses.thumb}`]: {
    width: 0,
    height: 0,
    boxShadow: 'none',
    '&:hover, &.Mui-focusVisible, &.Mui-active': {
      boxShadow: 'none',
      background: 'transparent',
      border: 'none',
    },
  },
  [`& .${sliderClasses.valueLabel}`]: {
    display: 'none',
  },
}));
