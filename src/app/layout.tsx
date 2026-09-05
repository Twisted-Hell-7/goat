import type { Metadata } from 'next';
import { Bebas_Neue, Playfair_Display, Inter } from 'next/font/google';
import './globals.css';
import { SmoothScroll } from '@/components/SmoothScroll';
import { Cursor } from '@/components/Cursor';
import { Loader } from '@/components/Loader';
import { Nav } from '@/components/Nav';

const display = Bebas_Neue({
  subsets: ['latin'],
  weight: ['400'],
  variable: '--font-display',
  display: 'swap',
});

const editorial = Playfair_Display({
  subsets: ['latin'],
  weight: ['400'],
  style: ['italic'],
  variable: '--font-editorial',
  display: 'swap',
});

const body = Inter({
  subsets: ['latin'],
  weight: ['400', '500', '600'],
  variable: '--font-body',
  display: 'swap',
});

export const metadata: Metadata = {
  title: 'MESSI — The Living Archive',
  description:
    'A living archive of the impossible. A digital monument to the greatest footballer who has ever lived.',
  applicationName: 'MESSI',
  authors: [{ name: 'The Living Archive' }],
  openGraph: {
    title: 'MESSI — The Living Archive',
    description:
      'A living archive of the impossible. A digital monument to the greatest footballer who has ever lived.',
    type: 'website',
  },
  icons: {
    icon: '/favicon.svg',
  },
};

export default function RootLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <html
      lang="en"
      className={`${display.variable} ${editorial.variable} ${body.variable}`}
    >
      <body>
        <Loader />
        <Cursor />
        <Nav />
        <SmoothScroll>{children}</SmoothScroll>
      </body>
    </html>
  );
}