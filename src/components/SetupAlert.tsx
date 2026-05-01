import { AlertCircle } from 'lucide-react';
import { checkSupabaseSetup } from '../lib/supabase';

export function SetupAlert() {
  if (checkSupabaseSetup()) return null;

  return (
    <div className="bg-amber-50 border-l-4 border-amber-500 p-4 mx-4 mt-4 sm:mx-8 sm:mt-8 rounded shadow-sm">
      <div className="flex items-start">
        <AlertCircle className="h-5 w-5 text-amber-500 mt-0.5 mr-3 flex-shrink-0" />
        <div>
          <h3 className="text-amber-800 font-bold mb-1">Supabase environment variables missing</h3>
          <p className="text-amber-700 text-sm">
            Please add your <code className="bg-amber-100 px-1 rounded">VITE_SUPABASE_URL</code> and <code className="bg-amber-100 px-1 rounded">VITE_SUPABASE_ANON_KEY</code> to the <code className="bg-amber-100 px-1 rounded">.env</code> file.
            <br />
            You also need to run the SQL query from <code>SUPABASE_SETUP.sql</code> in your Supabase SQL Editor.
            <br />
            For now, the app will show some mock data if it fails to fetch.
          </p>
        </div>
      </div>
    </div>
  );
}
