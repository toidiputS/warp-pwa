import React from 'react';
import { motion } from 'framer-motion';
import { clsx } from 'clsx';
import { twMerge } from 'tailwind-merge';

interface ButtonProps {
    variant?: 'primary' | 'secondary' | 'ghost';
    isLoading?: boolean;
    children?: React.ReactNode;
    className?: string;
    disabled?: boolean;
    onClick?: () => void;
    type?: 'button' | 'submit' | 'reset';
}

export const Button: React.FC<ButtonProps> = ({
    children,
    variant = 'primary',
    className,
    isLoading,
    disabled,
    onClick,
}) => {
    const baseStyles = "relative px-8 py-3 font-medium transition-all duration-300 transform rounded-sm overflow-hidden focus:outline-none focus:ring-1 focus:ring-warp-blue/50";

    const variants = {
        primary: "bg-white text-warp-dark border border-white hover:bg-gray-100 hover:scale-[1.02] shadow-[0_0_20px_rgba(255,255,255,0.1)] hover:shadow-[0_0_25px_rgba(37,99,235,0.3)]",
        secondary: "bg-transparent text-warp-blue border border-warp-blue/30 hover:border-warp-blue hover:bg-warp-blue/5 hover:scale-[1.02] shadow-[0_0_10px_rgba(37,99,235,0.05)]",
        ghost: "text-gray-400 hover:text-white hover:bg-white/5",
    };

    return (
        <motion.button
            whileTap={{ scale: 0.98 }}
            className={twMerge(baseStyles, variants[variant], (disabled || isLoading) && "opacity-50 cursor-not-allowed", className)}
            disabled={disabled || isLoading}
            onClick={onClick}
        >
            {variant === 'primary' && (
                <div className="absolute inset-0 -translate-x-full group-hover:animate-[shimmer_2s_infinite] bg-gradient-to-r from-transparent via-white/20 to-transparent z-10" />
            )}

            <span className="relative z-20 flex items-center justify-center gap-2">
                {isLoading && (
                    <svg className="animate-spin -ml-1 mr-3 h-4 w-4 text-current" xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24">
                        <circle className="opacity-25" cx="12" cy="12" r="10" stroke="currentColor" strokeWidth="4"></circle>
                        <path className="opacity-75" fill="currentColor" d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4zm2 5.291A7.962 7.962 0 014 12H0c0 3.042 1.135 5.824 3 7.938l3-2.647z"></path>
                    </svg>
                )}
                {children}
            </span>
        </motion.button>
    );
};
