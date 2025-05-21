import { Metadata } from 'next';

export const metadata: Metadata = {
  title: 'Admin Dashboard - Windows Doors CA',
  description: 'Admin dashboard for managing Windows Doors CA website content and operations',
};

export default function AdminLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <div className="min-h-screen bg-gray-100">
      {children}
    </div>
  );
}
