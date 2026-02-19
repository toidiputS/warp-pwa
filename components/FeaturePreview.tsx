import React from 'react';
import { motion } from 'framer-motion';

const fadeUp = {
    hidden: { opacity: 0, y: 30 },
    visible: (i: number) => ({
        opacity: 1,
        y: 0,
        transition: { delay: i * 0.12, duration: 0.6, ease: [0.16, 1, 0.3, 1] as [number, number, number, number] },
    }),
};

const ScoreRing = () => (
    <div className="relative w-36 h-36 mx-auto">
        <svg className="w-full h-full -rotate-90" viewBox="0 0 100 100">
            <circle cx="50" cy="50" r="42" fill="none" stroke="rgba(255,255,255,0.05)" strokeWidth="5" />
            <circle cx="50" cy="50" r="42" fill="none" stroke="#2563eb" strokeWidth="5" strokeLinecap="round"
                strokeDasharray={`${2 * Math.PI * 42}`} strokeDashoffset="0"
                className="drop-shadow-[0_0_10px_rgba(37,99,235,0.4)]" />
        </svg>
        <div className="absolute inset-0 flex flex-col items-center justify-center">
            <span className="text-4xl font-bold text-white">9.2</span>
            <span className="text-sm text-warp-subtext">/ 10.0</span>
        </div>
    </div>
);

const ScoreCard = ({ label, score, rationale }: { label: string; score: string; rationale: string }) => (
    <div className="bg-white/3 border border-white/5 rounded-xl p-4 hover:border-warp-blue/20 transition-colors">
        <div className="flex items-center justify-between mb-2">
            <span className="text-xs font-bold text-white uppercase tracking-wider">{label}</span>
            <span className="text-xs font-bold text-green-400 bg-green-400/10 px-2.5 py-1 rounded-full">{score}</span>
        </div>
        <p className="text-xs text-warp-subtext leading-relaxed">{rationale}</p>
    </div>
);

const DayCard = ({ day, theme, tasks, deliverable }: { day: number; theme: string; tasks: string[]; deliverable: string }) => (
    <div className="bg-white/3 border border-white/5 rounded-xl p-4 hover:border-warp-blue/20 transition-colors">
        <div className="flex items-center gap-2 mb-3">
            <span className="text-warp-blue font-bold text-sm">DAY {day}</span>
            <span className="px-2 py-0.5 bg-warp-blue/10 border border-warp-blue/20 rounded-full text-[9px] font-bold text-warp-blue uppercase tracking-wider">{theme}</span>
        </div>
        <div className="space-y-1.5 mb-3">
            {tasks.map((task, i) => (
                <div key={i} className="flex items-start gap-2 text-[11px]">
                    <span className="text-warp-blue mt-0.5">▸</span>
                    <span className="text-warp-subtext">{task}</span>
                </div>
            ))}
        </div>
        <div className="bg-warp-blue/5 border border-warp-blue/10 rounded-lg px-3 py-2">
            <span className="text-[9px] text-warp-blue font-bold uppercase tracking-wider">Deliverable: </span>
            <span className="text-[10px] text-white/80">{deliverable}</span>
        </div>
    </div>
);

export const FeaturePreview: React.FC = () => {
    return (
        <section className="w-full max-w-5xl mx-auto py-16 px-4">
            {/* Section Header */}
            <motion.div
                initial="hidden"
                whileInView="visible"
                viewport={{ once: true, margin: "-50px" }}
                variants={fadeUp}
                custom={0}
                className="text-center mb-12"
            >
                <div className="h-px w-16 bg-warp-blue/50 mx-auto mb-4" />
                <span className="text-warp-blue text-xs uppercase tracking-[0.3em]">What You Get</span>
                <h2 className="text-3xl md:text-4xl font-serif font-bold text-white mt-4">
                    AI-Generated Sprint Map
                </h2>
                <p className="text-warp-subtext mt-3 max-w-lg mx-auto">
                    2 inputs. 60 seconds. A 7-day battle plan that takes you from idea to checkout.
                </p>
            </motion.div>

            {/* CARD 1: Score + Breakdown */}
            <motion.div
                initial="hidden"
                whileInView="visible"
                viewport={{ once: true, margin: "-50px" }}
                variants={fadeUp}
                custom={1}
                className="bg-warp-card/80 border border-white/5 rounded-2xl overflow-hidden mb-6 backdrop-blur-sm"
            >
                <div className="text-center py-8 px-6 border-b border-white/5">
                    <span className="inline-block text-xs font-bold text-green-400 bg-green-400/10 border border-green-400/20 px-4 py-1.5 rounded-full uppercase tracking-widest mb-5">
                        Sprint Map Generated
                    </span>
                    <h3 className="text-2xl md:text-3xl font-serif font-bold text-white mb-3">
                        Notion Template Marketplace
                    </h3>
                    <p className="text-xs text-warp-subtext">
                        Generated: 6:15 PM &nbsp;•&nbsp; Node ID: W
                    </p>
                </div>

                <div className="p-6 md:p-8">
                    <div className="grid grid-cols-1 md:grid-cols-[220px_1fr] gap-8 items-start">
                        <div className="text-center">
                            <span className="text-xs text-warp-subtext uppercase tracking-widest block mb-5">Sprint Readiness</span>
                            <ScoreRing />
                        </div>
                        <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                            <ScoreCard label="Goal Clarity" score="2/2"
                                rationale="Launch objective is razor-sharp: Notion template marketplace live with checkout in 7 days. No ambiguity." />
                            <ScoreCard label="Scope Realism" score="2/2"
                                rationale="10 templates already built. Checkout via Gumroad is a proven 2-hour setup. Highly realistic scope for 7 days." />
                            <ScoreCard label="Resource Readiness" score="2/2"
                                rationale="Templates exist, pricing is set, tech stack is decided. Zero resource gaps identified." />
                            <ScoreCard label="Market Timing" score="1.5/2"
                                rationale="Notion ecosystem is growing fast. 'Template marketplace' has 40K+ monthly searches. Good timing but competitive." />
                            <ScoreCard label="Execution Risk" score="1.7/2"
                                rationale="Low risk overall. Minor risk: landing page copy and SEO could delay organic traffic. Mitigated by Day 5 content sprint." />
                        </div>
                    </div>
                </div>
            </motion.div>

            {/* CARD 2: Sample Sprint Days */}
            <motion.div
                initial="hidden"
                whileInView="visible"
                viewport={{ once: true, margin: "-50px" }}
                variants={fadeUp}
                custom={2}
                className="grid grid-cols-1 md:grid-cols-3 gap-4 mb-6"
            >
                <DayCard day={1} theme="Foundation" deliverable="Tech stack live, domain connected"
                    tasks={["Set up Gumroad store (2h)", "Configure custom domain (1h)", "Design brand kit in Canva (2h)"]} />
                <DayCard day={4} theme="Build & Stack" deliverable="All 10 templates listed with copy"
                    tasks={["Write sales copy for each template (3h)", "Create preview images (2h)", "Set up email capture (1h)"]} />
                <DayCard day={7} theme="Launch" deliverable="Store live, first traffic flowing"
                    tasks={["Final QA on checkout flow (1h)", "Post launch thread on Twitter (1h)", "Send launch email blast (1h)"]} />
            </motion.div>

            {/* CARD 3: Verdict */}
            <motion.div
                initial="hidden"
                whileInView="visible"
                viewport={{ once: true, margin: "-50px" }}
                variants={fadeUp}
                custom={3}
                className="bg-warp-card/80 border border-white/5 rounded-2xl p-6 md:p-10 backdrop-blur-sm text-center"
            >
                <span className="text-warp-blue text-xs uppercase tracking-[0.3em]">Launch Readiness Verdict</span>
                <blockquote className="mt-5 text-white/80 font-serif text-base md:text-lg italic leading-relaxed max-w-3xl mx-auto">
                    "This project is exceptionally sprint-ready. All core assets exist, the scope is tight,
                    and the market window is open. Ship it in 7 days or less. The only risk is overthinking it —
                    which is exactly what WARP is designed to prevent."
                </blockquote>
            </motion.div>
        </section>
    );
};
