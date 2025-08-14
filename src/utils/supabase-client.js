import { createClient } from "@supabase/supabase-js";

const supabaseUrl = "https://vzamkpwhdqplouipgwjj.supabase.co";
const supabaseKey =
  "eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpc3MiOiJzdXBhYmFzZSIsInJlZiI6InZ6YW1rcHdoZHFwbG91aXBnd2pqIiwicm9sZSI6ImFub24iLCJpYXQiOjE3NTUxNzI3MDksImV4cCI6MjA3MDc0ODcwOX0.UuFnoiR0j3jOX60FP1NyL_QJcBlpwuYBhf_uE9y7Vuk";
 export const supabase = createClient(supabaseUrl,supabaseKey);