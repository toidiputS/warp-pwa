import React, { useState, useEffect, useRef } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { Button } from './Button';
import { TextArea } from './Input';
import { ArrowRight } from 'lucide-react';

interface QuestionFlowProps {
    onComplete: (answers: string[]) => void;
}

const QUESTIONS = [
    {
        id: 1,
        text: "What's your MVP? Describe the product or idea you want to launch.",
        subtext: "INVENTORY REQUIRED: Minimum Viable Product description.",
        placeholder: "e.g., A Notion template marketplace for solopreneurs with 10 ready-made templates and a simple checkout page..."
    },
    {
        id: 2,
        text: "What's the basic offer? How will you package and sell this?",
        subtext: "INVENTORY REQUIRED: Basic offer structure.",
        placeholder: "e.g., $47 one-time for the full template bundle, with a $19 starter pack as a tripwire..."
    }
];

export const QuestionFlow: React.FC<QuestionFlowProps> = ({ onComplete }) => {
    const [currentStep, setCurrentStep] = useState(0);
    const [answers, setAnswers] = useState<string[]>(Array(QUESTIONS.length).fill(""));
    const [inputValue, setInputValue] = useState("");
    const inputRef = useRef<HTMLTextAreaElement>(null);

    useEffect(() => {
        if (inputRef.current) {
            inputRef.current.focus();
        }
    }, [currentStep]);

    const handleNext = () => {
        if (!inputValue.trim()) return;

        const newAnswers = [...answers];
        newAnswers[currentStep] = inputValue;
        setAnswers(newAnswers);

        if (currentStep < QUESTIONS.length - 1) {
            setInputValue("");
            setCurrentStep(prev => prev + 1);
        } else {
            onComplete(newAnswers);
        }
    };

    const handleKeyDown = (e: React.KeyboardEvent) => {
        if (e.key === 'Enter' && !e.shiftKey) {
            e.preventDefault();
            handleNext();
        }
    };

    const progress = ((currentStep + 1) / QUESTIONS.length) * 100;

    return (
        <div className="w-full max-w-2xl mx-auto px-4 relative z-10">
            {/* Progress Bar */}
            <div className="mb-12">
                <div className="flex justify-between text-xs uppercase tracking-widest text-warp-subtext mb-2 font-semibold">
                    <span>Sprint Inventory</span>
                    <span>{currentStep + 1} / {QUESTIONS.length}</span>
                </div>
                <div className="h-[2px] w-full bg-white/10 rounded-full overflow-hidden">
                    <motion.div
                        className="h-full bg-warp-blue shadow-[0_0_10px_#2563eb]"
                        initial={{ width: 0 }}
                        animate={{ width: `${progress}%` }}
                        transition={{ duration: 0.5, ease: "easeInOut" }}
                    />
                </div>
            </div>

            <AnimatePresence mode="wait">
                <motion.div
                    key={currentStep}
                    initial={{ opacity: 0, y: 20 }}
                    animate={{ opacity: 1, y: 0 }}
                    exit={{ opacity: 0, y: -20 }}
                    transition={{ duration: 0.4 }}
                    className="space-y-8"
                >
                    <div>
                        <h2 className="text-3xl md:text-4xl font-serif font-bold text-white mb-3 leading-tight">
                            {QUESTIONS[currentStep].text}
                        </h2>
                        <p className="text-warp-subtext text-lg">
                            {QUESTIONS[currentStep].subtext}
                        </p>
                    </div>

                    <TextArea
                        ref={inputRef}
                        value={inputValue}
                        onChange={(e) => setInputValue(e.target.value)}
                        onKeyDown={handleKeyDown}
                        placeholder={QUESTIONS[currentStep].placeholder}
                        className="bg-warp-card/50 border-white/5 focus:border-warp-blue/30 min-h-[160px]"
                    />

                    <div className="flex justify-end pt-4">
                        <Button
                            onClick={handleNext}
                            disabled={!inputValue.trim()}
                            className="group"
                        >
                            {currentStep === QUESTIONS.length - 1 ? 'Generate Sprint Map' : 'Next'}
                            <ArrowRight className="w-4 h-4 transition-transform group-hover:translate-x-1" />
                        </Button>
                    </div>
                </motion.div>
            </AnimatePresence>
        </div>
    );
};
