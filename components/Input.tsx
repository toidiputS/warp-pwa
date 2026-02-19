import React from 'react';
import { twMerge } from 'tailwind-merge';

interface InputProps extends React.InputHTMLAttributes<HTMLInputElement> {
    label?: string;
}

export const Input: React.FC<InputProps> = ({ className, label, ...props }) => {
    return (
        <div className="w-full">
            {label && <label className="block text-sm font-medium text-warp-subtext mb-2">{label}</label>}
            <div className="relative group">
                <input
                    className={twMerge(
                        "w-full bg-warp-dark/50 border border-white/10 text-xl md:text-2xl py-4 px-6 text-white placeholder-white/20 rounded-sm focus:outline-none focus:border-warp-blue/50 focus:ring-1 focus:ring-warp-blue/20 transition-all duration-300",
                        "group-hover:border-white/20",
                        className
                    )}
                    {...props}
                />
                <div className="absolute inset-0 -z-10 bg-warp-blue/5 blur-xl opacity-0 group-focus-within:opacity-100 transition-opacity duration-500" />
            </div>
        </div>
    );
};

interface TextAreaProps extends React.TextareaHTMLAttributes<HTMLTextAreaElement> {
    label?: string;
}

export const TextArea = React.forwardRef<HTMLTextAreaElement, TextAreaProps>(({ className, label, ...props }, ref) => {
    return (
        <div className="w-full">
            {label && <label className="block text-sm font-medium text-warp-subtext mb-2">{label}</label>}
            <div className="relative group">
                <textarea
                    ref={ref}
                    className={twMerge(
                        "w-full bg-warp-dark/50 border border-white/10 text-lg md:text-xl py-4 px-6 text-white placeholder-white/20 rounded-sm focus:outline-none focus:border-warp-blue/50 focus:ring-1 focus:ring-warp-blue/20 transition-all duration-300 resize-none min-h-[120px]",
                        "group-hover:border-white/20",
                        className
                    )}
                    {...props}
                />
                <div className="absolute inset-0 -z-10 bg-warp-blue/5 blur-xl opacity-0 group-focus-within:opacity-100 transition-opacity duration-500" />
            </div>
        </div>
    );
});
