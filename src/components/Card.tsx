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
      whileHover={hover ? { scale: 1.02, boxShadow: '0 10px 30px rgba(0,0,0,0.1)' } : {}}
      className={`bg-white dark:bg-dark-card rounded-lg shadow-md p-4 ${className}`}
    >
      {children}
    </motion.div>
  );
};