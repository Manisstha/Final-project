import { createClient } from "@supabase/supabase-js";

function getEnvVar(name) {
  if (typeof process !== 'undefined' && process.env && process.env[name]) {
    return process.env[name];
  }
  if (typeof import.meta !== 'undefined' && import.meta.env && import.meta.env[name]) {
    return import.meta.env[name];
  }
  throw new Error(`Environment variable ${name} is not defined`);
}

export const supabase = createClient(
  getEnvVar('VITE_PROJECT_URL'),
  getEnvVar('VITE_API_KEY')
);