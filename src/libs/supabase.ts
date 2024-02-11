import { createClient, PostgrestError } from '@supabase/supabase-js';
import { StorageError } from '@supabase/storage-js';

import { SupabaseType } from '@/types';

export const supabase = createClient<SupabaseType.Database>(
  import.meta.env.VITE_SUPABASE_URL,
  import.meta.env.VITE_SUPABASE_KEY,
  { db: { schema: 'timeline' } },
);

export const errorCheck = async (error: PostgrestError | StorageError | null) => {
  if (error) throw new Error(error.message);
};
