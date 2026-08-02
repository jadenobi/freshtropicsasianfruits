const { createClient } = require('@supabase/supabase-js');
const fs = require('fs');
const path = require('path');

const envFile = fs.readFileSync(path.join(__dirname, '..', '.env.local'), 'utf8');
const env = {};
envFile.split('\n').forEach(line => {
  const match = line.match(/^([^#\s][^=]*)=([^#\n]*)/);
  if (match) {
    env[match[1].trim()] = match[2].trim();
  }
});

const supabaseUrl = env.NEXT_PUBLIC_SUPABASE_URL;
const supabaseServiceKey = env.SUPABASE_SERVICE_ROLE_KEY;

const supabase = createClient(supabaseUrl, supabaseServiceKey);

async function checkData() {
  const { data: orders, error: oError } = await supabase.from('orders').select('order_id, customer_email, total');
  const { data: customers, error: cError } = await supabase.from('customers').select('email');

  console.log("Orders:", orders);
  console.log("Customers:", customers);
  
  if (oError) console.error("O Error:", oError);
  if (cError) console.error("C Error:", cError);
}

checkData();
