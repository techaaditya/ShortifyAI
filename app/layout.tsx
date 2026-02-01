import './globals.css';
import type { Metadata } from 'next';
import { Inter } from 'next/font/google';
import { ThemeProvider } from '@/components/theme-provider';
import { Toaster } from '@/components/ui/sonner';
import { ParticleBackground } from '@/components/ui/particle-background';

const inter = Inter({ subsets: ['latin'] });

export const metadata: Metadata = {
  title: 'ShortifyAI - AI-Powered Video Shortening Platform',
  description: 'Transform long-form content into viral shorts with AI. Auto-generate captions, highlights, and export to TikTok, YouTube Shorts, and Instagram Reels.',
  keywords: 'AI video editing, short form content, TikTok, YouTube Shorts, Instagram Reels, video automation',
  authors: [{ name: 'ShortifyAI Team' }],
  creator: 'ShortifyAI',
  publisher: 'ShortifyAI',
  formatDetection: {
    email: false,
    address: false,
    telephone: false,
  },
  metadataBase: new URL('https://shortifyai.com'),
  alternates: {
    canonical: '/',
  },
  openGraph: {
    title: 'ShortifyAI - AI-Powered Video Shortening Platform',
    description: 'Transform long-form content into viral shorts with AI. Auto-generate captions, highlights, and export to TikTok, YouTube Shorts, and Instagram Reels.',
    url: 'https://shortifyai.com',
    siteName: 'ShortifyAI',
    locale: 'en_US',
    type: 'website',
  },
  twitter: {
    card: 'summary_large_image',
    title: 'ShortifyAI - AI-Powered Video Shortening Platform',
    description: 'Transform long-form content into viral shorts with AI.',
    creator: '@shortifyai',
  },
  robots: {
    index: true,
    follow: true,
    googleBot: {
      index: true,
      follow: true,
      'max-video-preview': -1,
      'max-image-preview': 'large',
      'max-snippet': -1,
    },
  },
  verification: {
    google: 'google-site-verification-key',
  },
  manifest: '/manifest.json',
};

export default function RootLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <html lang="en" suppressHydrationWarning>
      <body className={`${inter.className} bg-slate-950 text-white antialiased`} suppressHydrationWarning>
        <ThemeProvider attribute="class" defaultTheme="dark" enableSystem={false}>
          <ParticleBackground />
          {children}
          <Toaster position="top-right" />
        </ThemeProvider>
      </body>
    </html>
  );
}