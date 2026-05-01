/// <reference types="vite/client" />
import { createClient } from '@supabase/supabase-js';

const supabaseUrl = import.meta.env.VITE_SUPABASE_URL || '';
const supabaseAnonKey = import.meta.env.VITE_SUPABASE_ANON_KEY || '';

// Provide dummy values if env variables are missing so the app doesn't crash on load.
// The `checkSupabaseSetup` function will prevent making actual requests.
export const supabase = createClient(
  supabaseUrl || 'https://dummy.supabase.co',
  supabaseAnonKey || 'dummy-key'
);

export const checkSupabaseSetup = () => {
  return supabaseUrl !== '' && supabaseAnonKey !== '';
};
