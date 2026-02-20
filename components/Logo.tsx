import React from 'react';
import { twMerge } from 'tailwind-merge';

interface LogoProps {
    className?: string;
}

export const Logo: React.FC<LogoProps> = ({ className }) => {
    return (
        <div className={twMerge("flex items-center gap-3", className)}>
            <div className="relative">
                <img src="/icons/logo.svg" alt="WARP" className="w-10 h-10 rounded-lg shadow-[0_0_15px_rgba(37,99,235,0.3)]" />
            </div>
            <div className="flex flex-col">
                <span className="text-white font-bold text-sm tracking-[0.15em] uppercase leading-none">WARP</span>
                <span className="text-warp-subtext text-[9px] tracking-[0.2em] uppercase">Launch Node</span>
            </div>
        </div>
    );
};
