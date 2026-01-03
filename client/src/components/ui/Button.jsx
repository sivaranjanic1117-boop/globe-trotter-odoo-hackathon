import React from 'react';
import { cn } from '../../lib/utils';
import { motion } from 'framer-motion';

const Button = React.forwardRef(({ className, variant = 'primary', size = 'md', isLoading, children, ...props }, ref) => {
    const variants = {
        primary: 'bg-primary-600 text-white hover:bg-primary-700 shadow-md shadow-primary-500/20',
        secondary: 'bg-white text-slate-700 border border-slate-200 hover:bg-slate-50',
        ghost: 'bg-transparent text-slate-600 hover:bg-slate-100',
        outline: 'border-2 border-primary-600 text-primary-600 hover:bg-primary-50',
    };

    const sizes = {
        sm: 'h-9 px-3 text-sm',
        md: 'h-11 px-4 text-base',
        lg: 'h-14 px-8 text-lg',
    };

    return (
        <motion.button
            ref={ref}
            whileTap={{ scale: 0.98 }}
            className={cn(
                'inline-flex items-center justify-center rounded-xl font-medium transition-colors focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-primary-500 disabled:pointer-events-none disabled:opacity-50',
                variants[variant],
                sizes[size],
                className
            )}
            disabled={isLoading}
            {...props}
        >
            {isLoading ? (
                <span className="mr-2 h-4 w-4 animate-spin rounded-full border-2 border-white border-b-transparent" />
            ) : null}
            {children}
        </motion.button>
    );
});

Button.displayName = "Button";

export default Button;
