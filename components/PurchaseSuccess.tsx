import React from 'react';
import { motion } from 'framer-motion';
import { Zap, ArrowRight, Shield, Rocket, Crown } from 'lucide-react';
import { Button } from './Button';
import { Logo } from './Logo';

interface PurchaseSuccessProps {
    tier: string;
    onStartSprint: () => void;
    onGoHome: () => void;
}

const tierData: Record<string, {
    title: string;
    subtitle: string;
    description: string;
    icon: React.ReactNode;
    color: string;
    features: string[];
}> = {
    node: {
        title: 'Your Node is Active.',
        subtitle: 'WARP · Node Tier',
        description: 'You now have full access to WARP with memory, NotNotes integration, and supercharged sprint generation.',
        icon: <Zap className="w-8 h-8" />,
        color: '#2563eb',
        features: ['1 node of your choice', 'Memory (saves context)', 'NotNotes integration'],
    },
    squad: {
        title: 'Squad Unlocked.',
        subtitle: 'Growth Engine Squad',
        description: 'You now have access to every node in the Growth Engine squad. All 9 nodes. All artifacts. Full system.',
        icon: <Shield className="w-8 h-8" />,
        color: '#2563eb',
        features: ['Every node in the squad', 'All finished artifacts', 'Complete growth system'],
    },
    'squad-plus': {
        title: 'Squad+ Activated.',
        subtitle: 'Growth Engine Squad+',
        description: 'Full squad access with persistent memory and NotNotes integration. The complete growth engine at full power.',
        icon: <Rocket className="w-8 h-8" />,
        color: '#2563eb',
        features: ['Every node in the squad', 'Memory (persistent context)', 'NotNotes integration'],
    },
    platoon: {
        title: 'Welcome to the Platoon.',
        subtitle: 'Full Platoon Access',
        description: 'All 67 nodes. All 10 squads. Oracle AI. BooksOS memory. You have the entire system. Now go execute.',
        icon: <Crown className="w-8 h-8" />,
        color: '#2563eb',
        features: ['All 67 nodes', 'BooksOS memory', 'NotNotes', 'Oracle AI assistant'],
    },
};

export const PurchaseSuccess: React.FC<PurchaseSuccessProps> = ({ tier, onStartSprint, onGoHome }) => {
    const data = tierData[tier] || tierData.node;

    return (
        <div className="min-h-screen flex items-center justify-center px-4 relative z-10">
            <motion.div
                initial={{ opacity: 0, y: 30 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.8, ease: [0.16, 1, 0.3, 1] }}
                className="max-w-md w-full text-center space-y-8"
            >
                <Logo className="justify-center" />

                {/* Success Icon */}
                <motion.div
                    initial={{ scale: 0 }}
                    animate={{ scale: 1 }}
                    transition={{ delay: 0.3, type: 'spring', stiffness: 200, damping: 15 }}
                    className="relative mx-auto w-24 h-24"
                >
                    <div className="absolute inset-0 rounded-2xl bg-warp-blue/10 animate-pulse" />
                    <div
                        className="relative w-24 h-24 rounded-2xl border-2 border-warp-blue/40 flex items-center justify-center text-warp-blue shadow-[0_0_40px_rgba(37,99,235,0.15)]"
                    >
                        {data.icon}
                    </div>
                </motion.div>

                {/* Tier Badge */}
                <motion.div
                    initial={{ opacity: 0 }}
                    animate={{ opacity: 1 }}
                    transition={{ delay: 0.4 }}
                >
                    <span className="inline-block px-3 py-1 border border-warp-blue/30 rounded-full bg-warp-blue/5 text-xs font-bold text-warp-blue tracking-[0.2em] uppercase">
                        {data.subtitle}
                    </span>
                </motion.div>

                {/* Title & Description */}
                <motion.div
                    initial={{ opacity: 0 }}
                    animate={{ opacity: 1 }}
                    transition={{ delay: 0.5 }}
                    className="space-y-3"
                >
                    <h1 className="text-3xl md:text-4xl font-serif font-bold text-white">
                        {data.title}
                    </h1>
                    <p className="text-warp-subtext text-sm leading-relaxed max-w-sm mx-auto">
                        {data.description}
                    </p>
                </motion.div>

                {/* Features */}
                <motion.div
                    initial={{ opacity: 0 }}
                    animate={{ opacity: 1 }}
                    transition={{ delay: 0.6 }}
                    className="bg-warp-card/60 border border-white/5 rounded-xl p-5 text-left"
                >
                    <p className="text-[10px] text-white/40 uppercase tracking-wider font-bold mb-3">What's Included</p>
                    <div className="space-y-2">
                        {data.features.map((feature) => (
                            <div key={feature} className="flex items-center gap-2 text-sm">
                                <span className="text-green-400 shrink-0">✓</span>
                                <span className="text-warp-subtext">{feature}</span>
                            </div>
                        ))}
                    </div>
                </motion.div>

                {/* CTAs */}
                <motion.div
                    initial={{ opacity: 0 }}
                    animate={{ opacity: 1 }}
                    transition={{ delay: 0.7 }}
                    className="space-y-3 pt-2"
                >
                    <Button onClick={onStartSprint} className="w-full text-base py-4">
                        Launch Your First Sprint <ArrowRight className="w-4 h-4" />
                    </Button>
                    <button
                        onClick={onGoHome}
                        className="text-xs text-white/30 hover:text-white/50 transition-colors uppercase tracking-wider cursor-pointer"
                    >
                        Back to Home
                    </button>
                </motion.div>

                {/* Footer Note */}
                <motion.p
                    initial={{ opacity: 0 }}
                    animate={{ opacity: 1 }}
                    transition={{ delay: 0.8 }}
                    className="text-[10px] text-white/20"
                >
                    A confirmation email has been sent. Check your inbox for receipt details.
                </motion.p>
            </motion.div>
        </div>
    );
};
