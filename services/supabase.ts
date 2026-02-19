import { createClient } from '@supabase/supabase-js';

const supabaseUrl = import.meta.env.VITE_SUPABASE_URL;
const supabaseAnonKey = import.meta.env.VITE_SUPABASE_ANON_KEY;

const supabase = supabaseUrl && supabaseAnonKey
    ? createClient(supabaseUrl, supabaseAnonKey)
    : null;

export const signInWithEmail = async (email: string) => {
    if (!supabase) {
        console.warn('Supabase not configured — skipping auth');
        return;
    }

    const { error } = await supabase.auth.signInWithOtp({
        email,
        options: {
            emailRedirectTo: window.location.origin,
        },
    });

    if (error) throw error;
};
