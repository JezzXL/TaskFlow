import type { ReactNode } from 'react';
import { motion } from 'framer-motion';

interface CardProps {
  children: ReactNode;
  className?: string;
  hover?: boolean;
}

export const Card = ({ children, className = '', hover = false }: CardProps) => {
  return (
    <motion.div
      initial={{ opacity: 0, y: 20 }}
      animate={{ opacity: 1, y: 0 }}
      exit={{ opacity: 0, y: -20 }}
      whileHover={hover ? { 
        y: -4,
        transition: { duration: 0.2 }
      } : {}}
      className={`
        relative
        bg-white dark:bg-dark-card 
        rounded-2xl 
        shadow-lg 
        border-2 border-gray-100 dark:border-gray-700
        p-6
        transition-all duration-300
        ${hover ? 'hover:shadow-2xl hover:border-purple-300 dark:hover:border-purple-600' : ''}
        ${className}
      `}
    >
      {hover && (
        <div className="absolute bottom-0 left-0 right-0 h-1 bg-linear-to-br from-purple-500 to-pink-500 rounded-b-2xl opacity-0 group-hover:opacity-100 transition-opacity duration-300" />
      )}
      {children}
    </motion.div>
  );
};