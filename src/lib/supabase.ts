import { createClient } from '@supabase/supabase-js';

const supabaseUrl = import.meta.env.VITE_SUPABASE_URL || 'https://c--7fada959-25c6-4981-bf5f-c33d0089510f-prod.lovable.cloud';
const supabaseKey = import.meta.env.VITE_SUPABASE_PUBLISHABLE_KEY || import.meta.env.VITE_SUPABASE_ANON_KEY || 'sb_publishable_TI7wcZpL0G94tIlZ6av5Cw_hgFgShyG';

export const supabase = createClient(supabaseUrl, supabaseKey);
