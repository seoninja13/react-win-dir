import SupabaseConnectionStatus from './components/SupabaseConnectionStatus';
import DatabaseTableList from './components/DatabaseTableList';

export default function AdminPage() {
  return (
    <div className="p-6">
      <h1 className="text-3xl font-bold mb-6">Supabase Admin Dashboard</h1>
      <p className="mb-8 text-gray-700">Welcome to the Supabase Admin Dashboard. Manage your database and storage here.</p>
      
      <SupabaseConnectionStatus />
      <DatabaseTableList />

      {/* Components for Database Management, Storage Management will go here */}
    </div>
  );
}
