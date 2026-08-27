import type { Metadata } from 'next';
import './globals.css';

export const metadata: Metadata = {
  title: 'SCOPED-Hiring | Beyond Outcome Gaps',
  description: 'Process-aware fairness diagnosis for LLM-based multi-agent decision systems.',
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en">
      <body>{children}</body>
    </html>
  );
}
