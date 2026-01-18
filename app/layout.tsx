import type { Metadata } from 'next';
import './globals.css';

export const metadata: Metadata = {
  title: 'Popup Generator - Create Beautiful Popups in Minutes',
  description:
    'A modern popup generator tool to create and customize stunning popup templates. Built by Görkem Derin Alpaslan. Choose from 16 pre-designed templates, customize everything, and export ready-to-use code in React or HTML format.',
  authors: [{ name: 'Görkem Derin Alpaslan' }],
  keywords: [
    'popup generator',
    'popup templates',
    'react popups',
    'html popups',
    'frontend development',
    'web development',
  ],
  openGraph: {
    title: 'Popup Generator - Create Beautiful Popups in Minutes',
    description:
      'A modern popup generator tool to create and customize stunning popup templates.',
    type: 'website',
  },
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en" className="dark">
      <body className="antialiased min-h-screen bg-background text-foreground font-sans selection:bg-primary/30 selection:text-primary-foreground">
        {children}
      </body>
    </html>
  );
}
