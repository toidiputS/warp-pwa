import React from 'react';
import { motion } from 'framer-motion';

interface PricingTiersProps {
    onStartFree: () => void;
}

const STRIPE_NODE_LINK = import.meta.env.VITE_STRIPE_NODE_LINK || '';
const STRIPE_SQUAD_LINK = import.meta.env.VITE_STRIPE_SQUAD_LINK || '';
const STRIPE_SQUAD_PLUS_LINK = import.meta.env.VITE_STRIPE_SQUAD_PLUS_LINK || '';
const STRIPE_PLATOON_LINK = import.meta.env.VITE_STRIPE_PLATOON_LINK || '';
const STRIPE_PLATOON_YEARLY_LINK = import.meta.env.VITE_STRIPE_PLATOON_YEARLY_LINK || '';

const tiers = [
    {
        name: 'Free',
        price: '$0',
        period: '',
        description: 'Try any single node',
        features: [
            'Any single node',
            'Get your artifact',
            'Walk away',
        ],
        excluded: ['Memory', 'NotNotes', 'Oracle'],
        highlight: false,
        cta: 'Start Free',
        action: 'free' as const,
    },
    {
        name: 'Node',
        price: '$19',
        period: '/mo',
        altPrice: '$47 lifetime',
        description: '1 node, supercharged',
        features: [
            '1 node of your choice',
            'Memory (saves context)',
            'NotNotes integration',
        ],
        excluded: ['Oracle'],
        highlight: false,
        cta: 'Get Node',
        action: 'stripe-node' as const,
        stripeLink: STRIPE_NODE_LINK,
    },
    {
        name: 'Squad',
        price: '$97',
        period: ' flat',
        description: 'The full squad, unlocked',
        features: [
            'Every node in the squad',
            'All finished artifacts',
            'Complete growth system',
        ],
        excluded: ['Memory', 'NotNotes', 'Oracle'],
        highlight: true,
        cta: 'Get the Squad',
        badge: 'MOST POPULAR',
        action: 'stripe-squad' as const,
        stripeLink: STRIPE_SQUAD_LINK,
    },
    {
        name: 'Squad+',
        price: '$127',
        period: '/mo',
        description: 'Squad with full power',
        features: [
            'Every node in the squad',
            'Memory (persistent context)',
            'NotNotes integration',
        ],
        excluded: ['Oracle'],
        highlight: false,
        cta: 'Upgrade to Squad+',
        action: 'stripe-squad-plus' as const,
        stripeLink: STRIPE_SQUAD_PLUS_LINK,
    },
    {
        name: 'Platoon',
        price: '$297',
        period: '/mo',
        description: 'All 67 nodes. Everything.',
        features: [
            'All 67 nodes',
            'BooksOS memory',
            'NotNotes',
            'Oracle AI assistant',
        ],
        excluded: [],
        highlight: false,
        cta: 'Go Platoon',
        altPrice: '$1,997/yr',
        action: 'stripe-platoon' as const,
        stripeLink: STRIPE_PLATOON_LINK,
        yearlyStripeLink: STRIPE_PLATOON_YEARLY_LINK,
    },
];

const fadeUp = {
    hidden: { opacity: 0, y: 30 },
    visible: (i: number) => ({
        opacity: 1,
        y: 0,
        transition: { delay: i * 0.1, duration: 0.5, ease: [0.16, 1, 0.3, 1] as [number, number, number, number] },
    }),
};

export const PricingTiers: React.FC<PricingTiersProps> = ({ onStartFree }) => {
    const handleClick = (tier: typeof tiers[number]) => {
        if (tier.action === 'free') {
            onStartFree();
            return;
        }
        if (tier.stripeLink) {
            window.open(tier.stripeLink, '_blank');
        }
    };

    return (
        <section className="w-full max-w-6xl mx-auto py-20 px-4">
            <motion.div
                initial="hidden"
                whileInView="visible"
                viewport={{ once: true, margin: "-50px" }}
                variants={fadeUp}
                custom={0}
                className="text-center mb-14"
            >
                <div className="h-px w-16 bg-warp-blue/50 mx-auto mb-4" />
                <span className="text-warp-blue text-xs uppercase tracking-[0.3em]">Pricing</span>
                <h2 className="text-3xl md:text-4xl font-serif font-bold text-white mt-4">
                    Precision Tools. Not Subscriptions.
                </h2>
                <p className="text-warp-subtext mt-3 max-w-lg mx-auto">
                    Use it free. Or unlock the full system. No courses, no communities, no fluff.
                </p>
            </motion.div>

            <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-5 gap-4">
                {tiers.map((tier, i) => (
                    <motion.div
                        key={tier.name}
                        initial="hidden"
                        whileInView="visible"
                        viewport={{ once: true, margin: "-30px" }}
                        variants={fadeUp}
                        custom={i + 1}
                        className={`relative rounded-2xl p-5 ${tier.badge ? 'pt-8' : ''} border flex flex-col transition-all ${tier.highlight
                            ? 'bg-warp-blue/5 border-warp-blue/40 shadow-[0_0_40px_rgba(37,99,235,0.08)]'
                            : 'bg-warp-card/60 border-white/5 hover:border-white/10'
                            }`}
                    >
                        {tier.badge && (
                            <div className="absolute -top-3 left-0 w-full flex justify-center pointer-events-none">
                                <span className="bg-warp-blue text-white text-[10px] font-bold uppercase tracking-wider px-3 py-1 rounded-full shadow-[0_0_10px_rgba(37,99,235,0.4)]">
                                    {tier.badge}
                                </span>
                            </div>
                        )}

                        <h3 className={`text-sm font-bold uppercase tracking-wider mb-1 ${tier.highlight ? 'text-warp-blue' : 'text-white/70'
                            }`}>
                            {tier.name}
                        </h3>

                        <div className="mb-3">
                            <span className="text-3xl font-bold text-white">{tier.price}</span>
                            {tier.period && <span className="text-sm text-warp-subtext">{tier.period}</span>}
                            {tier.altPrice && (
                                <div className="text-xs text-warp-subtext mt-0.5">
                                    or{' '}
                                    {/* @ts-ignore - yearlyStripeLink might not exist on all tiers */}
                                    {tier.yearlyStripeLink ? (
                                        <a
                                            href={tier.yearlyStripeLink}
                                            target="_blank"
                                            rel="noopener noreferrer"
                                            className="text-warp-blue/80 hover:text-warp-blue transition-colors underline decoration-dotted underline-offset-2 cursor-pointer"
                                        >
                                            {tier.altPrice}
                                        </a>
                                    ) : (
                                        tier.altPrice
                                    )}
                                </div>
                            )}
                        </div>

                        <p className="text-xs text-warp-subtext mb-4">{tier.description}</p>

                        <div className="h-px bg-white/5 mb-4" />

                        <div className="space-y-2 grow">
                            {tier.features.map((feature) => (
                                <div key={feature} className="flex items-start gap-2 text-xs">
                                    <span className="text-green-400 mt-0.5 shrink-0">✓</span>
                                    <span className="text-warp-subtext">{feature}</span>
                                </div>
                            ))}
                            {tier.excluded.map((item) => (
                                <div key={item} className="flex items-start gap-2 text-xs">
                                    <span className="text-white/20 mt-0.5 shrink-0">✕</span>
                                    <span className="text-white/20">{item}</span>
                                </div>
                            ))}
                        </div>

                        <button
                            onClick={() => handleClick(tier)}
                            className={`mt-5 w-full py-2.5 rounded-lg text-xs font-bold uppercase tracking-wider transition-all cursor-pointer ${tier.highlight
                                ? 'bg-warp-blue text-white hover:bg-warp-blue-dim shadow-[0_0_15px_rgba(37,99,235,0.2)]'
                                : (tier.action !== 'free' && !tier.stripeLink)
                                    ? 'bg-white/5 text-white/40 border border-white/5 cursor-default'
                                    : 'bg-white/5 text-white/70 hover:bg-white/10 border border-white/10'
                                }`}
                        >
                            {(tier.action !== 'free' && !tier.stripeLink) ? `${tier.cta} — Soon` : tier.cta}
                        </button>
                    </motion.div>
                ))}
            </div>

            <motion.div
                initial="hidden"
                whileInView="visible"
                viewport={{ once: true }}
                variants={fadeUp}
                custom={7}
                className="mt-12 text-center"
            >
                <div className="inline-flex flex-wrap items-center justify-center gap-3 text-xs text-white/30">
                    {['Not a course', 'Not a community', 'Not a coaching program', 'Not a subscription'].map((item) => (
                        <span key={item} className="px-3 py-1.5 rounded-full border border-white/5 bg-white/3">
                            {item}
                        </span>
                    ))}
                </div>
                <p className="text-warp-subtext text-sm mt-4 max-w-md mx-auto">
                    Precision tools. Run them. Get finished artifacts. Execute. Done.
                </p>
            </motion.div>

            <motion.div
                initial="hidden"
                whileInView="visible"
                viewport={{ once: true }}
                variants={fadeUp}
                custom={8}
                className="mt-8 text-center"
            >
                <a href="https://itsyouonline.com" target="_blank" rel="noopener noreferrer"
                    className="text-xs text-warp-blue/60 hover:text-warp-blue transition-colors uppercase tracking-widest">
                    Part of the itsyouonline.com ecosystem →
                </a>
            </motion.div>
        </section>
    );
};
