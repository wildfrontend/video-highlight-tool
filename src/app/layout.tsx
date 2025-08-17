import { AppRouterCacheProvider } from '@mui/material-nextjs/v15-appRouter';
import type { Metadata } from 'next';

import MuiThemeProvider from '@/components/mui/theme';

export const metadata: Metadata = {
  title: 'Video Highlight Tool',
  description: 'A demo tool built with Next.js, MUI, and Zustand that allows users to upload videos, generate AI-assisted highlight clips, and edit transcripts with synchronized playback.',
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html data-theme="light" lang="en" suppressHydrationWarning>
      <body>
        <AppRouterCacheProvider>
          <MuiThemeProvider>{children}</MuiThemeProvider>
        </AppRouterCacheProvider>
      </body>
    </html>
  );
}
