import { createClient } from '@/lib/supabase/server';
import { redirect } from 'next/navigation';

export default async function AdminLayout({
  children
}: {
  children: React.ReactNode;
}) {
  const supabase = createClient();

  const {
    data: { session }
  } = await supabase.auth.getSession();

  if (!session) redirect('/login');

  return <>{children}</>;
}
