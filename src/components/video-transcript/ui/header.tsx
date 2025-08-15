import { Box, Typography } from '@mui/material';

const PanelHeader: React.FC<{ title: string }> = ({ title }) => (
  <Box borderBottom="1px solid" borderColor="divider" px={2} py={1.5}>
    <Typography fontWeight={600} variant="subtitle1">
      {title}
    </Typography>
  </Box>
);

export default PanelHeader;
