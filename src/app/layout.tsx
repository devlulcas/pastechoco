import type { Metadata } from 'next';
import { Inter } from 'next/font/google';
import Link from 'next/link';
import './globals.css';

const inter = Inter({ subsets: ['latin'] });

export const metadata: Metadata = {
  title: 'PasteChoco',
  description: 'Paste some text and share it with your friends!',
};

export default function RootLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <html lang="en">
      <body className={inter.className +" " + "bg-neutral-50"}>
        <nav className="flex items-center justify-between bg-neutral-900 text-neutral-50 p-4">
          <Link href="/" className="font-bold text-2xl">
            PasteChoco
          </Link>
        </nav>

        <div className="flex flex-col items-center min-h-screen">
          {children}
        </div>
      </body>
    </html>
  );
}
