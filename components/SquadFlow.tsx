import React from 'react';
import { motion } from 'framer-motion';

const nodes = [
    { id: 'D', name: 'DRIVE', role: 'Acquisition Roadmap', pain: "I have no acquisition roadmap", artifact: 'Acquisition roadmap / traffic model', active: false },
    { id: 'DD', name: 'DYNAMO', role: 'Hook Generator', pain: "My content has no hooks", artifact: '10 hooks / creative directions', active: false },
    { id: 'FF', name: 'FRONTIER', role: 'Cold Outreach', pain: "My cold outreach is ignored", artifact: 'Cold outreach scripts / lead response sequences', active: false },
    { id: 'E', name: 'EXPAND', role: 'Amplification', pain: "I can't amplify what I've already built", artifact: 'Amplification map / reach forecast', active: false },
    { id: 'W', name: 'WARP', role: 'Launch Sprint', pain: "I sit on ideas and never launch", artifact: '7-day sprint map / daily task breakdown', active: true },
    { id: 'WW', name: 'WARP+', role: 'Velocity Engine', pain: "My launch schedule has no velocity", artifact: 'WARP schedule / velocity audit', active: false },
    { id: 'T', name: 'TRACTION', role: 'Momentum Builder', pain: "Nothing is building momentum", artifact: 'Traction roadmap / momentum score', active: false },
    { id: 'R', name: 'RIFT', role: 'Market Disruption', pain: "I don't know how to disrupt my market", artifact: 'Disruption strategy / market rift analysis', active: false },
    { id: 'M', name: 'MIDAS', role: 'Referral Architect', pain: "I have no referral or affiliate system", artifact: 'Referral SOP / affiliate link map', active: false },
];

const fadeUp = {
    hidden: { opacity: 0, y: 30 },
    visible: (i: number) => ({
        opacity: 1,
        y: 0,
        transition: { delay: i * 0.08, duration: 0.5, ease: [0.16, 1, 0.3, 1] as [number, number, number, number] },
    }),
};

export const SquadFlow: React.FC = () => {
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
                <div className="flex items-center justify-center gap-2 mb-4">
                    <span className="text-[#2563eb] text-xs uppercase tracking-[0.3em]">Growth Engine Squad</span>
                    <span className="w-2 h-2 rounded-full bg-[#2563eb]/50" />
                    <span className="text-white/30 text-[10px] uppercase tracking-wider">itsaiagents.online</span>
                </div>
                <h2 className="text-3xl md:text-4xl font-serif font-bold text-white mt-2">
                    9 Nodes. 9 Artifacts. One Mission.
                </h2>
                <p className="text-warp-subtext mt-3 max-w-lg mx-auto">
                    From stuck idea to live product. Each node solves one growth problem and produces one finished artifact.
                </p>
                <p className="text-white/30 text-xs mt-2 italic">
                    "Operators who have ideas but can't launch, amplify, or build momentum."
                </p>
            </motion.div>

            <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-3 gap-3">
                {nodes.map((node, i) => (
                    <motion.div
                        key={node.id}
                        initial="hidden"
                        whileInView="visible"
                        viewport={{ once: true, margin: "-20px" }}
                        variants={fadeUp}
                        custom={i + 1}
                        className={`rounded-xl p-4 border transition-all ${node.active
                            ? 'bg-[#2563eb]/5 border-[#2563eb]/30 shadow-[0_0_25px_rgba(37,99,235,0.06)]'
                            : 'bg-warp-card/60 border-white/5 hover:border-white/10'
                            }`}
                    >
                        <div className="flex items-center gap-2 mb-2">
                            <span className={`text-[10px] font-bold px-2 py-0.5 rounded-full ${node.active ? 'bg-[#2563eb]/20 text-[#2563eb]' : 'bg-white/5 text-white/35'
                                }`}>
                                {node.id}
                            </span>
                            <span className={`text-xs font-bold ${node.active ? 'text-white' : 'text-white/60'}`}>
                                {node.name}
                            </span>
                        </div>
                        <p className="text-[10px] text-warp-subtext mb-2 italic leading-snug">"{node.pain}"</p>
                        <div className="h-px bg-white/5 my-2" />
                        <p className="text-[10px] text-warp-subtext leading-snug">
                            <span className="text-white/40 uppercase text-[8px] tracking-wider">Artifact: </span>
                            {node.artifact}
                        </p>
                        {node.active && (
                            <span className="inline-block text-[8px] text-[#2563eb] bg-[#2563eb]/10 px-2 py-0.5 rounded-full mt-2 uppercase tracking-widest font-bold">
                                You Are Here
                            </span>
                        )}
                    </motion.div>
                ))}
            </div>
        </section>
    );
};
