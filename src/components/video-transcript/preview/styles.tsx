export const customSliderStyles = {
  '&.MuiSlider-root': {
    padding: '12px 0',
  },
  '& .MuiSlider-track': {
    bgcolor: 'primary.main',
    height: 6,
    borderRadius: 3,
  },
  '& .MuiSlider-rail': {
    bgcolor: 'grey.300',
    height: 6,
    borderRadius: 3,
  },
  '& .MuiSlider-thumb': {
    width: 24,
    height: 24,
    bgcolor: 'primary.main',
    border: '3px solid white',
    boxShadow: 3,
    '&:hover, &.Mui-focusVisible': {
      boxShadow: 6,
    },
    '&.Mui-active': {
      boxShadow: 8,
    },
    transition: 'all 0.2s ease-in-out',
  },
  '& .MuiSlider-valueLabel': {
    bgcolor: 'primary.main',
    color: 'white',
    fontWeight: 600,
    fontSize: '0.875rem',
  },
};
