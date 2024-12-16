// Import Google Fonts from next/font/google
import { JetBrains_Mono as FontMono, Inter as FontSans } from 'next/font/google';

// Initialize Inter font (Sans-serif)
export const fontSans = FontSans({
  subsets: ['latin'],
  variable: '--font-sans',
});

// Initialize JetBrains Mono font (Monospace)
export const fontMono = FontMono({
  subsets: ['latin'],
  variable: '--font-mono',
});
