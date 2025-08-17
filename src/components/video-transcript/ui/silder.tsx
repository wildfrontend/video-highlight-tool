import { Slider, sliderClasses, styled } from '@mui/material';

export const StyledSlider = styled(Slider)(({ theme }) => ({
  padding: '12px 0',
  [`& .${sliderClasses.track}`]: {
    height: 6,
    borderRadius: 3,
    backgroundColor: theme.palette.common.white,
  },
  [`& .${sliderClasses.rail}`]: {
    height: 6,
    borderRadius: 3,
    backgroundColor: 'rgba(255, 255, 255, 0.3)',
  },
  [`& .${sliderClasses.thumb}`]: {
    width: 4,
    height: 12,
    borderRadius: 0,
    backgroundColor: theme.palette.common.white,
    boxShadow: theme.shadows[3],
    transition: 'all 0.2s ease-in-out',
    [`&:hover, &.${sliderClasses.focusVisible}`]: {
      boxShadow: theme.shadows[6],
    },
    [`&.${sliderClasses.active}`]: {
      boxShadow: theme.shadows[8],
    },
  },
  [`& .${sliderClasses.valueLabel}`]: {
    backgroundColor: theme.palette.primary.main,
    color: theme.palette.common.white,
    fontWeight: 600,
    fontSize: '0.875rem',
  },
}));
