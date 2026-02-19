import React, { useState, useEffect } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { Download, X } from 'lucide-react';

interface BeforeInstallPromptEvent extends Event {
    prompt: () => Promise<void>;
    userChoice: Promise<{ outcome: 'accepted' | 'dismissed' }>;
}

export const InstallPrompt: React.FC = () => {
    const [deferredPrompt, setDeferredPrompt] = useState<BeforeInstallPromptEvent | null>(null);
    const [show, setShow] = useState(false);
    const [dismissed, setDismissed] = useState(false);

    useEffect(() => {
        // Don't show if already installed or previously dismissed this session
        if (window.matchMedia('(display-mode: standalone)').matches) return;

        const handler = (e: Event) => {
            e.preventDefault();
            setDeferredPrompt(e as BeforeInstallPromptEvent);
            // Show prompt after a 3s delay so it doesn't interrupt the first impression
            setTimeout(() => setShow(true), 3000);
        };

        window.addEventListener('beforeinstallprompt', handler);
        return () => window.removeEventListener('beforeinstallprompt', handler);
    }, []);

    const handleInstall = async () => {
        if (!deferredPrompt) return;
        await deferredPrompt.prompt();
        const { outcome } = await deferredPrompt.userChoice;
        if (outcome === 'accepted') {
            setShow(false);
        }
        setDeferredPrompt(null);
    };

    const handleDismiss = () => {
        setShow(false);
        setDismissed(true);
    };

    if (dismissed || !show) return null;

    return (
        <AnimatePresence>
            <motion.div
                initial={{ opacity: 0, y: 60 }}
                animate={{ opacity: 1, y: 0 }}
                exit={{ opacity: 0, y: 60 }}
                transition={{ duration: 0.4, ease: [0.16, 1, 0.3, 1] }}
                className="fixed bottom-6 left-1/2 -translate-x-1/2 z-50 w-[calc(100%-2rem)] max-w-md"
            >
                <div className="bg-warp-card/95 backdrop-blur-xl border border-white/10 rounded-2xl p-4 shadow-[0_0_40px_rgba(0,0,0,0.5)] flex items-center gap-4">
                    <div className="w-10 h-10 rounded-lg bg-gradient-to-br from-warp-blue to-blue-800 flex items-center justify-center shrink-0 shadow-[0_0_15px_rgba(37,99,235,0.3)]">
                        <span className="text-white font-bold text-sm">W</span>
                    </div>
                    <div className="flex-1 min-w-0">
                        <p className="text-white text-sm font-semibold">Install WARP</p>
                        <p className="text-warp-subtext text-xs truncate">Add to home screen for instant access</p>
                    </div>
                    <button
                        onClick={handleInstall}
                        className="shrink-0 bg-warp-blue hover:bg-warp-blue-dim text-white text-xs font-bold uppercase tracking-wider px-4 py-2 rounded-lg transition-all cursor-pointer flex items-center gap-1.5 shadow-[0_0_15px_rgba(37,99,235,0.2)]"
                    >
                        <Download className="w-3.5 h-3.5" />
                        Install
                    </button>
                    <button
                        onClick={handleDismiss}
                        className="shrink-0 text-white/30 hover:text-white/60 transition-colors cursor-pointer"
                    >
                        <X className="w-4 h-4" />
                    </button>
                </div>
            </motion.div>
        </AnimatePresence>
    );
};
