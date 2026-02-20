import React from 'react';
import { twMerge } from 'tailwind-merge';
import { motion } from 'framer-motion';

interface LogoProps {
    className?: string;
}

export const Logo: React.FC<LogoProps> = ({ className }) => {
    return (
        <div className={twMerge("flex items-center gap-3", className)}>
            <div className="relative">
                <motion.div
                    animate={{ scale: [1, 1.05, 1], opacity: [0.9, 1, 0.9] }}
                    transition={{ duration: 4, repeat: Infinity, ease: "easeInOut" }}
                    whileHover={{ scale: 1.1, filter: "brightness(1.2)" }}
                >
                    <img src="/icons/logo.svg" alt="WARP" className="w-10 h-10 object-contain" />
                </motion.div>
            </div>
            <div className="flex flex-col">
                <span className="text-white font-bold text-sm tracking-[0.15em] uppercase leading-none">WARP</span>
                <span className="text-warp-subtext text-[9px] tracking-[0.2em] uppercase">Launch Node</span>
            </div>
        </div>
    );
};
