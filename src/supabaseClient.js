import { createClient } from '@supabase/supabase-js'

const supabaseUrl = "https://ogkihnuicantvuogoywo.supabase.co"
const supabaseAnonKey = "eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJyb2xlIjoiYW5vbiIsImlhdCI6MTY0NDI0NTI4MywiZXhwIjoxOTU5ODIxMjgzfQ.tabYcCuOIyw86iyfTW3u81_6BQ748K6SKSFQYbZ79Fc"

export const supabase = createClient(supabaseUrl, supabaseAnonKey)