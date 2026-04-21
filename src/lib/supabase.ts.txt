import { createClient } from '@supabase/supabase-js'

// Esta es la URL de conexión para la App
const supabaseUrl = 'https://afbussamfzqfvozrycsr.supabase.co'
const supabaseKey = 'sb_publishable_v70AbmzkIGerl7EQgxWE7g_JGSiShMg'

export const supabase = createClient(supabaseUrl, supabaseKey)
