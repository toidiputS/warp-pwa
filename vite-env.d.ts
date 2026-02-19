/// <reference types="vite/client" />

interface ImportMetaEnv {
    readonly VITE_GEMINI_API_KEY: string;
    readonly VITE_SUPABASE_URL: string;
    readonly VITE_SUPABASE_ANON_KEY: string;
    readonly VITE_STRIPE_NODE_LINK: string;
}

interface ImportMeta {
    readonly env: ImportMetaEnv;
}
