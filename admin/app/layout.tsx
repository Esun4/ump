import type { Metadata } from 'next';
import './globals.css';

export const metadata: Metadata = {
  title: 'Ump Admin',
  description: 'Question bank admin for the Ump quiz app',
};

export default function RootLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <html lang="en">
      <body>{children}</body>
    </html>
  );
}
