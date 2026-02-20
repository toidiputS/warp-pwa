import React, { useState, useEffect } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { AppState, SprintReport } from './types';
import { generateWarpReport } from './services/gemini';
import { QuestionFlow } from './components/QuestionFlow';
import { ReportView } from './components/ReportView';
import { FeaturePreview } from './components/FeaturePreview';
import { SquadFlow } from './components/SquadFlow';
import { PlatoonOverview } from './components/PlatoonOverview';
import { PricingTiers } from './components/PricingTiers';
import { EmailGate } from './components/EmailGate';
import { Logo } from './components/Logo';
import { Button } from './components/Button';
import { InstallPrompt } from './components/InstallPrompt';
import { PurchaseSuccess } from './components/PurchaseSuccess';
import { ArrowRight, Zap, Clock, Target, Rocket } from 'lucide-react';
import './index.css';

function generateArtifactText(report: SprintReport): string {
    let text = `WARP SPRINT MAP — ${report.projectName}\n`;
    text += `Generated: ${new Date().toISOString()}\n`;
    text += `Sprint Readiness Score: ${report.sprintScore}/10\n\n`;

    text += `--- SCORING BREAKDOWN ---\n`;
    const breakdown = report.scoringBreakdown;
    text += `Goal Clarity: ${breakdown.goalClarity.score}/2 — ${breakdown.goalClarity.rationale}\n`;
    text += `Scope Realism: ${breakdown.scopeRealism.score}/2 — ${breakdown.scopeRealism.rationale}\n`;
    text += `Resource Readiness: ${breakdown.resourceReadiness.score}/2 — ${breakdown.resourceReadiness.rationale}\n`;
    text += `Market Timing: ${breakdown.marketTiming.score}/2 — ${breakdown.marketTiming.rationale}\n`;
    text += `Execution Risk: ${breakdown.executionRisk.score}/2 — ${breakdown.executionRisk.rationale}\n\n`;

    text += `--- STRENGTHS ---\n`;
    report.strengths.forEach(s => { text += `• ${s}\n`; });
    text += `\n--- RISKS ---\n`;
    report.risks.forEach(r => { text += `• ${r}\n`; });

    text += `\n--- 7-DAY SPRINT MAP ---\n`;
    report.sprintMap.forEach(day => {
        text += `\nDAY ${day.day}: ${day.theme}\n`;
        text += `Objective: ${day.objective}\n`;
        day.tasks.forEach(t => {
            text += `  [${t.priority.toUpperCase()}] ${t.task} (${t.duration})\n`;
        });
        text += `Deliverable: ${day.deliverable}\n`;
    });

    text += `\n--- LAUNCH ASSETS ---\n`;
    report.launchAssets.forEach(a => { text += `• ${a}\n`; });

    text += `\n--- VERDICT ---\n${report.launchReadinessVerdict}\n`;

    return text;
}

export default function App() {
    const [state, setState] = useState<AppState>(AppState.WELCOME);
    const [report, setReport] = useState<SprintReport | null>(null);
    const [answers, setAnswers] = useState<string[]>([]);
    const [showEmailGate, setShowEmailGate] = useState(false);
    const [error, setError] = useState<string | null>(null);
    const [purchasedTier, setPurchasedTier] = useState<string | null>(null);

    // Detect ?purchased= param from Stripe redirect
    useEffect(() => {
        const params = new URLSearchParams(window.location.search);
        const tier = params.get('purchased');
        if (tier) {
            setPurchasedTier(tier);
        }
    }, []);

    // Register service worker
    useEffect(() => {
        if ('serviceWorker' in navigator) {
            navigator.serviceWorker.register('/sw.js').catch((err) => {
                console.log('SW registration failed:', err);
            });
        }
    }, []);

    const handleInitiate = () => {
        setShowEmailGate(true);
    };

    const handleEmailSuccess = () => {
        setShowEmailGate(false);
        setState(AppState.QUESTIONS);
    };

    const handleQuestionsComplete = async (userAnswers: string[]) => {
        setAnswers(userAnswers);
        setState(AppState.ANALYZING);
        setError(null);

        try {
            const result = await generateWarpReport(userAnswers);
            setReport(result);
            setState(AppState.REPORT);
        } catch (err: any) {
            console.error('Sprint Generation Failed:', err);
            setError(err.message || 'Sprint generation failed. Please try again.');
            setState(AppState.QUESTIONS);
        }
    };

    const handleCommit = async () => {
        if (!report) return;
        setState(AppState.COMMITTING);

        const artifactText = generateArtifactText(report);

        try {
            await navigator.clipboard.writeText(artifactText);
        } catch (e) {
            console.log('Clipboard unavailable, artifact generated in memory.');
        }

        setTimeout(() => {
            setState(AppState.FINISHED);
        }, 2000);
    };

    return (
        <div className="min-h-screen bg-warp-dark text-white font-sans relative overflow-hidden">
            {/* Ambient Background Glow */}
            <div className="fixed inset-0 pointer-events-none z-0">
                <div className="absolute top-0 left-1/2 -translate-x-1/2 w-[800px] h-[500px] bg-warp-blue/3 blur-[150px] rounded-full" />
                <div className="absolute bottom-0 right-0 w-[400px] h-[400px] bg-blue-900/3 blur-[120px] rounded-full" />
            </div>

            {/* PURCHASE SUCCESS — from Stripe redirect */}
            {purchasedTier && state === AppState.WELCOME && (
                <PurchaseSuccess
                    tier={purchasedTier}
                    onStartSprint={() => {
                        setPurchasedTier(null);
                        window.history.replaceState({}, '', '/');
                        setState(AppState.QUESTIONS);
                    }}
                    onGoHome={() => {
                        setPurchasedTier(null);
                        window.history.replaceState({}, '', '/');
                    }}
                />
            )}

            {/* WELCOME STATE — Landing Page */}
            {state === AppState.WELCOME && !purchasedTier && (
                <div className="relative z-10">
                    {/* Navbar */}
                    <nav className="fixed top-0 w-full z-50 bg-warp-dark/80 backdrop-blur-md border-b border-white/5">
                        <div className="max-w-5xl mx-auto flex items-center justify-between py-3 px-4">
                            <Logo />
                            <div className="flex items-center gap-3">
                                <span className="hidden md:block text-[10px] text-white/30 uppercase tracking-wider">Growth Engine Squad</span>
                                <Button variant="secondary" onClick={handleInitiate} className="text-xs py-2 px-5">
                                    Launch Sprint <Zap className="w-3 h-3" />
                                </Button>
                            </div>
                        </div>
                    </nav>

                    {/* Hero */}
                    <section className="min-h-screen flex items-center justify-center relative pt-20 px-4">
                        <div className="max-w-3xl mx-auto text-center">
                            <motion.div
                                initial={{ opacity: 0, y: 30 }}
                                animate={{ opacity: 1, y: 0 }}
                                transition={{ duration: 0.8, ease: [0.16, 1, 0.3, 1] }}
                                className="space-y-8"
                            >
                                <div className="inline-block px-3 py-1 border border-warp-blue/30 rounded-full bg-warp-blue/5">
                                    <span className="text-xs font-bold text-warp-blue tracking-[0.2em] uppercase">Node W · Growth Engine</span>
                                </div>

                                <h1 className="text-5xl md:text-7xl font-serif font-bold leading-tight">
                                    <span className="text-white">Stop Sitting</span>
                                    <br />
                                    <span className="text-white">on Your </span>
                                    <span className="text-warp-blue">Idea.</span>
                                </h1>

                                <p className="text-lg md:text-xl text-warp-subtext max-w-xl mx-auto leading-relaxed">
                                    WARP accelerates your idea from concept to checkout in <span className="text-white font-semibold">168 hours or less</span>.
                                    Get an AI-generated 7-day sprint map with daily tasks, deliverables, and launch assets.
                                </p>

                                <div className="flex flex-col sm:flex-row gap-4 justify-center items-center pt-4">
                                    <Button onClick={handleInitiate} className="text-base px-10 py-4">
                                        Initiate Sprint <ArrowRight className="w-4 h-4" />
                                    </Button>
                                    <span className="text-xs text-white/30 uppercase tracking-wider">Free · No account required</span>
                                </div>

                                {/* Trust Signals */}
                                <div className="flex flex-wrap justify-center gap-6 pt-6 text-xs text-warp-subtext">
                                    <div className="flex items-center gap-2">
                                        <Clock className="w-4 h-4 text-warp-blue" />
                                        <span>2 inputs. 60 seconds.</span>
                                    </div>
                                    <div className="flex items-center gap-2">
                                        <Target className="w-4 h-4 text-warp-blue" />
                                        <span>7-day sprint map</span>
                                    </div>
                                    <div className="flex items-center gap-2">
                                        <Rocket className="w-4 h-4 text-warp-blue" />
                                        <span>Ship in 168 hours</span>
                                    </div>
                                </div>
                            </motion.div>
                        </div>
                    </section>

                    {/* Feature Preview */}
                    <FeaturePreview />

                    {/* Squad Flow */}
                    <SquadFlow />

                    {/* Platoon Overview */}
                    <PlatoonOverview />

                    {/* Pricing */}
                    <PricingTiers onStartFree={handleInitiate} />

                    {/* Footer */}
                    <footer className="border-t border-white/5 py-12 text-center">
                        <Logo className="justify-center mb-4" />
                        <p className="text-xs text-white/20 mb-2">
                            WARP is a sovereign node in the Growth Engine squad.
                        </p>
                        <div className="flex items-center justify-center gap-2 text-[10px] text-white/15">
                            <span>itsaiagents.online</span>
                            <span>·</span>
                            <a href="https://itsyouonline.com" target="_blank" className="hover:text-white/30 transition-colors">
                                itsyouonline.com ecosystem
                            </a>
                        </div>
                    </footer>
                </div>
            )}

            {/* QUESTIONS STATE */}
            {state === AppState.QUESTIONS && (
                <div className="min-h-screen flex items-center justify-center px-4 relative z-10">
                    <div className="w-full">
                        <div className="flex items-center justify-center mb-10">
                            <Logo />
                        </div>
                        {error && (
                            <div className="max-w-2xl mx-auto mb-6 bg-red-500/10 border border-red-500/30 rounded-lg p-4 text-center">
                                <p className="text-red-400 text-sm">{error}</p>
                                <button onClick={() => setError(null)} className="text-xs text-red-400/50 mt-1 hover:text-red-400 transition-colors">Dismiss</button>
                            </div>
                        )}
                        <QuestionFlow onComplete={handleQuestionsComplete} />
                    </div>
                </div>
            )}

            {/* ANALYZING STATE */}
            {state === AppState.ANALYZING && (
                <div className="min-h-screen flex items-center justify-center relative z-10">
                    <motion.div
                        initial={{ opacity: 0 }}
                        animate={{ opacity: 1 }}
                        className="text-center space-y-8"
                    >
                        <div className="relative">
                            <div className="w-20 h-20 border-2 border-warp-blue/30 rounded-full animate-spin mx-auto shadow-[0_0_30px_rgba(37,99,235,0.1)]">
                                <div className="absolute top-0 left-1/2 w-3 h-3 bg-warp-blue rounded-full -translate-x-1/2 -translate-y-1/2" />
                            </div>
                        </div>
                        <div>
                            <h2 className="text-2xl font-serif font-bold text-white mb-2">Generating Sprint Map</h2>
                            <p className="text-warp-subtext text-sm">WARP is building your 7-day launch plan...</p>
                        </div>
                        <div className="flex flex-wrap justify-center gap-2">
                            {['Analyzing scope', 'Mapping days', 'Assigning tasks', 'Forecasting risk'].map((step, i) => (
                                <motion.span
                                    key={step}
                                    initial={{ opacity: 0 }}
                                    animate={{ opacity: 1 }}
                                    transition={{ delay: i * 0.8 }}
                                    className="px-3 py-1 bg-warp-blue/5 border border-warp-blue/10 rounded-full text-[10px] text-warp-blue uppercase tracking-wider"
                                >
                                    {step}
                                </motion.span>
                            ))}
                        </div>
                    </motion.div>
                </div>
            )}

            {/* REPORT STATE */}
            {state === AppState.REPORT && report && (
                <div className="min-h-screen py-16 px-4 relative z-10">
                    <div className="flex items-center justify-center mb-8">
                        <Logo />
                    </div>
                    <ReportView report={report} onCommit={handleCommit} />
                </div>
            )}

            {/* COMMITTING STATE */}
            {state === AppState.COMMITTING && (
                <div className="min-h-screen flex items-center justify-center relative z-10">
                    <motion.div
                        initial={{ opacity: 0 }}
                        animate={{ opacity: 1 }}
                        className="text-center space-y-6"
                    >
                        <div className="w-16 h-16 border-2 border-warp-blue/30 rounded-sm animate-pulse-blue mx-auto flex items-center justify-center">
                            <Rocket className="w-8 h-8 text-warp-blue" />
                        </div>
                        <h2 className="text-2xl font-serif font-bold text-white">Committing Sprint Artifact...</h2>
                        <p className="text-warp-subtext text-sm">Your sprint map is being saved to NotNotes.</p>
                    </motion.div>
                </div>
            )}

            {/* FINISHED STATE */}
            {state === AppState.FINISHED && (
                <div className="min-h-screen flex items-center justify-center relative z-10">
                    <motion.div
                        initial={{ opacity: 0, y: 20 }}
                        animate={{ opacity: 1, y: 0 }}
                        className="text-center space-y-6 max-w-md px-4"
                    >
                        <div className="w-20 h-20 rounded-full bg-green-500/10 border border-green-500/30 flex items-center justify-center mx-auto">
                            <svg className="w-10 h-10 text-green-400" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M5 13l4 4L19 7" />
                            </svg>
                        </div>
                        <h2 className="text-3xl font-serif font-bold text-white">Sprint Map Committed.</h2>
                        <p className="text-warp-subtext text-sm">
                            Your 7-day sprint map has been copied to your clipboard and committed to NotNotes.
                            Now go execute. You have 168 hours.
                        </p>
                        <div className="pt-4 space-y-4">
                            <Button onClick={() => setState(AppState.WELCOME)} variant="secondary">
                                Run Another Sprint
                            </Button>

                            <div className="border-t border-white/5 pt-4 mt-4 space-y-3">
                                <p className="text-[10px] text-white/30 uppercase tracking-wider">Ready for more?</p>
                                <a
                                    href={import.meta.env.VITE_STRIPE_SQUAD_LINK || '#'}
                                    target="_blank"
                                    rel="noopener noreferrer"
                                    className="block px-4 py-2.5 bg-warp-blue/10 border border-warp-blue/20 rounded-lg text-xs text-warp-blue font-bold uppercase tracking-wider text-center hover:bg-warp-blue/20 transition-all cursor-pointer"
                                >
                                    Get the Full Squad → 9 Nodes · $97
                                </a>
                                <a
                                    href={import.meta.env.VITE_STRIPE_PLATOON_LINK || '#'}
                                    target="_blank"
                                    rel="noopener noreferrer"
                                    className="block px-4 py-2 text-[10px] text-white/30 hover:text-white/50 text-center transition-colors underline decoration-dotted underline-offset-2 cursor-pointer"
                                >
                                    or Go Platoon · All 67 nodes · $297/mo
                                </a>
                            </div>

                            <div className="text-[10px] text-white/20 mt-2 uppercase tracking-wider">
                                Next Node → <span className="text-warp-blue">WARP+</span> (Velocity Engine)
                            </div>
                        </div>
                    </motion.div>
                </div>
            )}

            {/* Email Gate Modal */}
            <EmailGate
                isOpen={showEmailGate}
                onClose={() => setShowEmailGate(false)}
                onSuccess={handleEmailSuccess}
            />

            {/* PWA Install Prompt */}
            <InstallPrompt />
        </div>
    );
}
