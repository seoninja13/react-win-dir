import type { Metadata } from "next";
import { Inter } from "next/font/google";
import './globals.css';
import './styles.css';
import { LoggingProvider } from '@/components/LoggingProvider';
import { Navbar } from '@/components/layout/Navbar';
import { Footer } from '@/components/layout/Footer';

const inter = Inter({ subsets: ["latin"] });

export const metadata: Metadata = {
  title: 'Windows Doors CA',
  description: 'Sacramento\'s Leader in Windows, Doors, & Siding',
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en">
      <body className={inter.className}>
        <LoggingProvider>
          <Navbar />
          <main>{children}</main>
          <Footer />
        </LoggingProvider>
      </body>
    </html>
  );
}
