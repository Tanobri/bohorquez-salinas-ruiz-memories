import { createClient } from '@supabase/supabase-js'

/**
 * Cliente Supabase compartido.
 *
 * Preferible usar variables de entorno Vite en frontend:
 * - VITE_SUPABASE_URL
 * - VITE_SUPABASE_KEY
 *
 * También se aceptan `process.env.SUPABASE_URL` y `process.env.SUPABASE_KEY`
 * para entornos Node/SSR.
 */
const DEFAULT_URL = 'https://hmbmlryefaccnnpgjuir.supabase.co'

const SUPABASE_URL = (typeof import.meta !== 'undefined' && (import.meta as any).env?.VITE_SUPABASE_URL)
  || process.env.SUPABASE_URL
  || DEFAULT_URL

const SUPABASE_KEY = (typeof import.meta !== 'undefined' && (import.meta as any).env?.VITE_SUPABASE_KEY)
  || process.env.SUPABASE_KEY

if (!SUPABASE_KEY) {
  // No lanzamos error para evitar romper builds en entornos donde la clave se inyecta en tiempo de ejecución,
  // pero avisamos para que el desarrollador la configure correctamente.
  // En producción/servidor es recomendable lanzar un error en lugar de usar un cliente sin key.
  // Si prefieres lanzar el error, reemplaza el console.warn por: throw new Error('Missing SUPABASE key')
  // Nota: en Vite las variables públicas deben comenzar con `VITE_`.
  // Agrega en `.env`:
  // VITE_SUPABASE_URL=https://... 
  // VITE_SUPABASE_KEY=your_anon_or_service_key
  // Luego reinicia el servidor de desarrollo.
  // Ejemplo: "VITE_SUPABASE_KEY=xxx"
  console.warn('[supabase] VITE_SUPABASE_KEY / SUPABASE_KEY not set. Create one to avoid runtime errors.')
}

export const supabase = createClient(String(SUPABASE_URL), String(SUPABASE_KEY ?? ''))

export default supabase
