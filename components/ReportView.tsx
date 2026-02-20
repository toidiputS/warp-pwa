import React, { useState } from 'react';
import { motion } from 'framer-motion';
import { SprintReport } from '../types';
import { Button } from './Button';
import { Check, AlertTriangle, TrendingUp, Send, Rocket, Clock, Target, Crown } from 'lucide-react';
import { clsx } from 'clsx';

interface ReportViewProps {
    report: SprintReport;
    onCommit: () => void;
}

export const ReportView: React.FC<ReportViewProps> = ({ report, onCommit }) => {
    const [isCommitting, setIsCommitting] = useState(false);

    const handleCommit = () => {
        setIsCommitting(true);
        setTimeout(() => {
            onCommit();
        }, 1500);
    };

    const ScoreCard = ({ label, score, rationale }: { label: string; score: number; rationale: string }) => (
        <div className="bg-white/5 border border-white/5 p-4 rounded-sm hover:border-warp-blue/20 transition-colors">
            <div className="flex justify-between items-center mb-2">
                <h4 className="text-sm font-semibold text-warp-text uppercase tracking-wider">{label}</h4>
                <div className={clsx(
                    "px-2 py-0.5 text-xs font-bold rounded-full",
                    score === 2 ? "bg-green-500/20 text-green-400" :
                        score === 1 ? "bg-yellow-500/20 text-yellow-400" :
                            "bg-red-500/20 text-red-400"
                )}>
                    {score}/2
                </div>
            </div>
            <p className="text-xs text-warp-subtext leading-relaxed">{rationale}</p>
        </div>
    );

    const priorityColor = (priority: string) => {
        switch (priority) {
            case 'critical': return 'bg-red-500/20 text-red-400 border-red-500/30';
            case 'high': return 'bg-orange-500/20 text-orange-400 border-orange-500/30';
            default: return 'bg-blue-500/20 text-blue-400 border-blue-500/30';
        }
    };

    return (
        <div className="w-full max-w-4xl mx-auto pb-20 relative z-10">
            <motion.div
                initial={{ opacity: 0, y: 40 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.8, ease: [0.16, 1, 0.3, 1] }}
                className="space-y-8"
            >
                {/* Header Section */}
                <div className="text-center space-y-4 mb-12 border-b border-white/10 pb-8">
                    <div className="inline-block px-3 py-1 border border-warp-blue/30 rounded-full bg-warp-blue/5 mb-4">
                        <span className="text-xs font-bold text-warp-blue tracking-[0.2em] uppercase">Sprint Map Generated</span>
                    </div>
                    <h1 className="text-4xl md:text-5xl font-serif font-bold text-white">
                        {report.projectName || "Launch Sprint"}
                    </h1>
                    <div className="flex items-center justify-center gap-4 text-warp-subtext text-sm">
                        <span>Generated: {new Date().toLocaleTimeString()}</span>
                        <span>•</span>
                        <span>Node ID: W</span>
                    </div>
                </div>

                {/* Main Score Dashboard */}
                <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
                    {/* Main Score */}
                    <div className="md:col-span-1 bg-gradient-to-br from-warp-card to-warp-dark border border-warp-blue/20 p-8 flex flex-col items-center justify-center relative overflow-hidden rounded-sm group">
                        <div className="absolute inset-0 bg-warp-blue/5 opacity-0 group-hover:opacity-100 transition-opacity duration-500" />
                        <h3 className="text-warp-subtext text-xs uppercase tracking-widest mb-4">Sprint Readiness</h3>
                        <div className="relative">
                            <svg className="w-40 h-40 transform -rotate-90">
                                <circle cx="80" cy="80" r="70" stroke="currentColor" strokeWidth="8" fill="transparent" className="text-white/5" />
                                <circle cx="80" cy="80" r="70" stroke="currentColor" strokeWidth="8" fill="transparent"
                                    strokeDasharray={440}
                                    strokeDashoffset={440 - (440 * report.sprintScore) / 10}
                                    className="text-warp-blue drop-shadow-[0_0_10px_rgba(37,99,235,0.5)] transition-all duration-1000 ease-out"
                                />
                            </svg>
                            <div className="absolute inset-0 flex items-center justify-center flex-col">
                                <span className="text-5xl font-bold text-white">{report.sprintScore}</span>
                                <span className="text-xs text-warp-subtext">/ 10.0</span>
                            </div>
                        </div>
                    </div>

                    {/* Breakdown Grid */}
                    <div className="md:col-span-2 grid grid-cols-1 sm:grid-cols-2 gap-4">
                        <ScoreCard label="Goal Clarity" {...report.scoringBreakdown.goalClarity} />
                        <ScoreCard label="Scope Realism" {...report.scoringBreakdown.scopeRealism} />
                        <ScoreCard label="Resource Readiness" {...report.scoringBreakdown.resourceReadiness} />
                        <ScoreCard label="Market Timing" {...report.scoringBreakdown.marketTiming} />
                        <ScoreCard label="Execution Risk" {...report.scoringBreakdown.executionRisk} />
                    </div>
                </div>

                {/* 7-Day Sprint Timeline */}
                <div className="bg-warp-card/50 border border-warp-blue/10 p-6 md:p-8 rounded-sm relative overflow-hidden">
                    <div className="absolute top-0 right-0 w-32 h-32 bg-warp-blue/5 blur-[50px] pointer-events-none" />
                    <h3 className="flex items-center gap-2 text-lg font-serif font-bold text-white mb-8">
                        <Rocket className="w-5 h-5 text-warp-blue" /> 7-Day Sprint Map
                    </h3>

                    <div className="space-y-6">
                        {report.sprintMap.map((day, i) => (
                            <motion.div
                                key={day.day}
                                initial={{ opacity: 0, x: -20 }}
                                animate={{ opacity: 1, x: 0 }}
                                transition={{ delay: i * 0.1, duration: 0.5 }}
                                className="relative pl-8 border-l-2 border-warp-blue/20 hover:border-warp-blue/60 transition-colors"
                            >
                                {/* Day marker */}
                                <div className="absolute -left-[9px] top-0 w-4 h-4 rounded-full bg-warp-dark border-2 border-warp-blue/50 shadow-[0_0_8px_rgba(37,99,235,0.3)]" />

                                {/* Day header */}
                                <div className="flex flex-wrap items-center gap-3 mb-3">
                                    <span className="text-warp-blue font-bold text-sm">DAY {day.day}</span>
                                    <span className="px-2 py-0.5 bg-warp-blue/10 border border-warp-blue/20 rounded-full text-[10px] font-bold text-warp-blue-glow uppercase tracking-wider">
                                        {day.theme}
                                    </span>
                                </div>

                                {/* Objective */}
                                <p className="text-sm text-white font-medium mb-3">{day.objective}</p>

                                {/* Tasks */}
                                <div className="space-y-2 mb-3">
                                    {day.tasks.map((task, j) => (
                                        <div key={j} className="flex items-start gap-3 text-xs">
                                            <span className={clsx("px-1.5 py-0.5 rounded text-[9px] font-bold uppercase border shrink-0 mt-0.5", priorityColor(task.priority))}>
                                                {task.priority}
                                            </span>
                                            <span className="text-warp-subtext flex-1">{task.task}</span>
                                            <span className="text-white/30 flex items-center gap-1 shrink-0">
                                                <Clock className="w-3 h-3" />{task.duration}
                                            </span>
                                        </div>
                                    ))}
                                </div>

                                {/* Deliverable */}
                                <div className="bg-white/5 p-3 rounded-sm border border-white/5">
                                    <span className="text-warp-blue text-xs font-bold uppercase mr-2">Deliverable:</span>
                                    <span className="text-xs text-white/90">{day.deliverable}</span>
                                </div>
                            </motion.div>
                        ))}
                    </div>
                </div>

                {/* Strengths & Risks */}
                <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
                    <div className="bg-warp-card/50 border border-white/5 p-6 rounded-sm">
                        <h3 className="flex items-center gap-2 text-lg font-serif font-bold text-white mb-4">
                            <Check className="w-5 h-5 text-green-400" /> Strengths
                        </h3>
                        <ul className="space-y-3">
                            {report.strengths.map((s, i) => (
                                <li key={i} className="flex items-start gap-3 text-sm text-warp-subtext">
                                    <span className="w-1.5 h-1.5 rounded-full bg-green-500 mt-1.5 shrink-0" />
                                    {s}
                                </li>
                            ))}
                        </ul>
                    </div>

                    <div className="bg-warp-card/50 border border-white/5 p-6 rounded-sm">
                        <h3 className="flex items-center gap-2 text-lg font-serif font-bold text-white mb-4">
                            <AlertTriangle className="w-5 h-5 text-red-400" /> Risks
                        </h3>
                        <ul className="space-y-3">
                            {report.risks.map((r, i) => (
                                <li key={i} className="flex items-start gap-3 text-sm text-warp-subtext">
                                    <span className="w-1.5 h-1.5 rounded-full bg-red-500 mt-1.5 shrink-0" />
                                    {r}
                                </li>
                            ))}
                        </ul>
                    </div>
                </div>

                {/* Launch Assets */}
                <div className="bg-warp-card/50 border border-white/5 p-6 rounded-sm">
                    <h3 className="flex items-center gap-2 text-lg font-serif font-bold text-white mb-4">
                        <Target className="w-5 h-5 text-warp-blue" /> Launch Assets (What You'll Have)
                    </h3>
                    <div className="flex flex-wrap gap-2">
                        {report.launchAssets.map((asset, i) => (
                            <span key={i} className="px-3 py-1.5 bg-warp-blue/10 border border-warp-blue/20 rounded-full text-xs font-bold text-warp-blue-glow uppercase tracking-wider">
                                {asset}
                            </span>
                        ))}
                    </div>
                </div>

                {/* Launch Readiness Verdict */}
                <div className="bg-gradient-to-r from-warp-card to-warp-dark border border-white/10 p-8 rounded-sm text-center">
                    <h3 className="text-sm font-bold text-warp-subtext uppercase tracking-widest mb-4">Launch Readiness Verdict</h3>
                    <p className="text-lg md:text-xl font-serif text-white leading-relaxed italic">
                        "{report.launchReadinessVerdict}"
                    </p>
                </div>

                {/* Upsell CTA */}
                <div className="bg-gradient-to-br from-warp-blue/10 to-transparent border border-warp-blue/20 rounded-sm p-6 md:p-8">
                    <div className="flex flex-col md:flex-row items-center gap-6">
                        <div className="flex-1 text-center md:text-left">
                            <div className="flex items-center justify-center md:justify-start gap-2 mb-2">
                                <Crown className="w-4 h-4 text-warp-blue" />
                                <span className="text-xs font-bold text-warp-blue uppercase tracking-wider">Unlock Full Power</span>
                            </div>
                            <h3 className="text-lg font-serif font-bold text-white mb-2">
                                Want Memory, NotNotes & Oracle?
                            </h3>
                            <p className="text-xs text-warp-subtext leading-relaxed">
                                Your free sprint map is just the start. Upgrade to save context across sessions,
                                auto-sync to NotNotes, and get access to the Oracle AI assistant.
                            </p>
                        </div>
                        <div className="flex flex-col gap-2 shrink-0">
                            <a
                                href={import.meta.env.VITE_STRIPE_SQUAD_PLUS_LINK || '#'}
                                target="_blank"
                                rel="noopener noreferrer"
                                className={`px-6 py-3 rounded-lg text-xs font-bold uppercase tracking-wider text-center transition-all ${import.meta.env.VITE_STRIPE_SQUAD_PLUS_LINK
                                        ? 'bg-warp-blue text-white hover:bg-warp-blue-dim shadow-[0_0_15px_rgba(37,99,235,0.2)] cursor-pointer'
                                        : 'bg-white/5 text-white/40 border border-white/5 cursor-default'
                                    }`}
                            >
                                Upgrade to Squad+ — $127/mo
                            </a>
                            <a
                                href={import.meta.env.VITE_STRIPE_PLATOON_LINK || '#'}
                                target="_blank"
                                rel="noopener noreferrer"
                                className="px-6 py-2 text-xs text-warp-blue/70 hover:text-warp-blue transition-colors text-center underline decoration-dotted underline-offset-2 cursor-pointer"
                            >
                                or Go Platoon — All 67 nodes
                            </a>
                        </div>
                    </div>
                </div>

                {/* Action Area */}
                <div className="sticky bottom-4 md:bottom-8 flex justify-center z-50">
                    <div className="bg-warp-dark/80 backdrop-blur-md p-2 rounded-lg border border-white/10 shadow-2xl">
                        <Button
                            onClick={handleCommit}
                            isLoading={isCommitting}
                            className="w-full md:w-auto min-w-[250px]"
                        >
                            {isCommitting ? (
                                <span className="flex items-center">Committing Artifact...</span>
                            ) : (
                                <>
                                    <Send className="w-4 h-4" /> Commit to NotNotes
                                </>
                            )}
                        </Button>
                    </div>
                </div>

            </motion.div>
        </div>
    );
};
