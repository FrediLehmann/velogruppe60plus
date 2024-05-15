'use client';

import { useEffect } from 'react';
import { useRouter } from 'next/navigation';

import { createClient } from '@/lib/supabase/client';

export default function RefreshPage({ id }: { id: string }) {
  const supabase = createClient();
  const router = useRouter();

  useEffect(() => {
    async function checkId() {
      const { data: tour, error } = await supabase
        .from('touren')
        .select('id')
        .eq('next_tour', true)
        .single();

      if (!error && tour?.id !== id) router.refresh();
    }

    checkId();
  }, [id, router, supabase]);

  return <></>;
}
