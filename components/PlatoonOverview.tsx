import React from 'react';
import { motion } from 'framer-motion';

const fadeUp = {
    hidden: { opacity: 0, y: 30 },
    visible: (i: number) => ({
        opacity: 1,
        y: 0,
        transition: { delay: i * 0.08, duration: 0.5, ease: [0.16, 1, 0.3, 1] as [number, number, number, number] },
    }),
};

const squads = [
    { name: 'Legacy Vault', nodes: 5, focus: 'Legacy / VIP Strategy / Executive Transition', color: '#6366f1', domain: 'itsai.vip', active: false },
    { name: 'Ops Iron', nodes: 7, focus: 'Systems / SOPs / Automation / Team Alignment', color: '#0d9488', domain: 'itsaiagent.solutions', active: false },
    { name: 'Capital Floor', nodes: 6, focus: 'Pricing / Unit Economics / Monetization / Pivot', color: '#dc2626', domain: 'itsai.services', active: false },
    { name: 'Growth Engine', nodes: 9, focus: 'Acquisition / Hooks / Outreach / Launch / Momentum', color: '#2563eb', domain: 'itsaiagents.online', active: true },
    { name: 'Cash Velocity', nodes: 11, focus: 'Offer Validation / DMs / Closing / Funnels / Upsells', color: '#06b6d4', domain: 'itsai.chat', active: false },
    { name: 'Trust Shield', nodes: 6, focus: 'Contracts / Retention / PR / Compliance / Reputation', color: '#059669', domain: 'itsai.help', active: false },
    { name: 'Brand Alive', nodes: 6, focus: 'Brand Voice / Content / Distribution / Community', color: '#db2777', domain: 'itsai.life', active: false },
    { name: 'Intel Core', nodes: 6, focus: 'North Star / Competitive Intel / Trends / Market Sizing', color: '#ca8a04', domain: 'itsai.wiki', active: false },
    { name: 'Signal', nodes: 5, focus: 'SEO / Keywords / Technical Audit / Content Ranking', color: '#84cc16', domain: 'itsai.blog', active: false },
    { name: 'Convert', nodes: 5, focus: 'E-commerce / Product Pages / Cart Recovery / Checkout', color: '#b45309', domain: 'itsai.store', active: false },
];

export const PlatoonOverview: React.FC = () => {
    return (
        <section className="w-full max-w-5xl mx-auto py-20 px-4">
            <motion.div
                initial="hidden"
                whileInView="visible"
                viewport={{ once: true, margin: "-50px" }}
                variants={fadeUp}
                custom={0}
                className="text-center mb-14"
            >
                <div className="h-px w-16 bg-warp-blue/50 mx-auto mb-4" />
                <span className="text-warp-blue text-xs uppercase tracking-[0.3em]">The Platoon Ecosystem</span>
                <h2 className="text-3xl md:text-4xl font-serif font-bold text-white mt-4">
                    67 Nodes. 10 Squads. 1 Oracle.
                </h2>
                <p className="text-warp-subtext mt-3 max-w-lg mx-auto">
                    WARP is one node inside the Growth Engine squad. The full Platoon covers every business function.
                </p>
            </motion.div>

            {/* Squad Grid */}
            <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-4">
                {squads.map((squad, i) => (
                    <motion.div
                        key={squad.name}
                        initial="hidden"
                        whileInView="visible"
                        viewport={{ once: true, margin: "-20px" }}
                        variants={fadeUp}
                        custom={i + 1}
                        className={`rounded-xl p-5 border transition-all ${squad.active
                            ? 'border-warp-blue/40 bg-warp-blue/5 shadow-[0_0_30px_rgba(37,99,235,0.08)]'
                            : 'border-white/5 bg-warp-card/60 hover:border-white/10'
                            }`}
                    >
                        <div className="flex items-center gap-3 mb-3">
                            <div
                                className="w-3 h-3 rounded-full shadow-lg"
                                style={{ backgroundColor: squad.color, boxShadow: `0 0 10px ${squad.color}40` }}
                            />
                            <h3 className={`text-sm font-bold uppercase tracking-wider ${squad.active ? 'text-white' : 'text-white/70'}`}>
                                {squad.name}
                            </h3>
                            <span className="ml-auto text-[10px] text-white/30 font-bold">{squad.nodes} nodes</span>
                        </div>
                        <p className="text-[11px] text-warp-subtext leading-relaxed mb-3">{squad.focus}</p>
                        <div className="flex items-center justify-between">
                            <span className="text-[9px] text-white/20 font-mono uppercase">{squad.domain}</span>
                            {squad.active && (
                                <span className="text-[8px] text-warp-blue bg-warp-blue/10 px-2 py-0.5 rounded-full uppercase tracking-widest font-bold">
                                    Current Squad
                                </span>
                            )}
                        </div>
                    </motion.div>
                ))}
            </div>

            {/* Oracle Link */}
            <motion.div
                initial="hidden"
                whileInView="visible"
                viewport={{ once: true }}
                variants={fadeUp}
                custom={12}
                className="mt-10 text-center"
            >
                <div className="inline-flex items-center gap-3 px-6 py-3 rounded-full border border-white/5 bg-warp-card/40">
                    <span className="text-xl">🔮</span>
                    <div className="text-left">
                        <span className="text-[10px] text-white/40 uppercase tracking-wider block">Central Intelligence</span>
                        <span className="text-sm font-bold text-white">The Oracle</span>
                    </div>
                    <span className="text-[9px] text-white/20 font-mono ml-2">itsyouonline.com</span>
                </div>
            </motion.div>
        </section>
    );
};
