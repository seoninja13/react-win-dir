import './globals.css';
import './styles.css';

export const metadata = {
  title: 'Windows Doors CA',
  description: 'Sacramento\'s Leader in Windows, Doors, & Siding',
}

export default function RootLayout({
  children,
}: {
  children: React.ReactNode
}) {
  return (
    <html lang="en">
      <body>{children}</body>
    </html>
  )
}
