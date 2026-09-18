const { createClient } = require('@supabase/supabase-js');
const supabaseUrl = 'https://c--7fada959-25c6-4981-bf5f-c33d0089510f-prod.lovable.cloud';
const supabaseKey = 'sb_publishable_TI7wcZpL0G94tIlZ6av5Cw_hgFgShyG';
const supabase = createClient(supabaseUrl, supabaseKey);

async function check() {
  const { data, error } = await supabase.from('products').delete().eq('id', '70ae04ef-c269-4086-8eb2-344bb021b639').select();
  console.log("Delete real test:", data, error);
}
check();
