import { Container } from '@mui/material';

import UploadVideo from '@/components/upload/form';

const Page = () => {
  return (
    <Container maxWidth="lg" sx={{ py: 4 }}>
      <UploadVideo />
    </Container>
  );
};

export default Page;
