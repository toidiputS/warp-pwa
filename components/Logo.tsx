import React from 'react';
import { twMerge } from 'tailwind-merge';

interface LogoProps {
    className?: string;
}

export const Logo: React.FC<LogoProps> = ({ className }) => {
    return (
        <div className={twMerge("flex items-center gap-3", className)}>
            <div className="relative">
                <div className="w-10 h-10 rounded-lg bg-gradient-to-br from-warp-blue to-blue-800 flex items-center justify-center shadow-[0_0_15px_rgba(37,99,235,0.3)]">
                    <span className="text-white font-bold text-sm tracking-tight">W</span>
                </div>
            </div>
            <div className="flex flex-col">
                <span className="text-white font-bold text-sm tracking-[0.15em] uppercase leading-none">WARP</span>
                <span className="text-warp-subtext text-[9px] tracking-[0.2em] uppercase">Launch Node</span>
            </div>
        </div>
    );
};
