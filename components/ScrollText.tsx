import { motion, useScroll, useTransform } from 'framer-motion';
import { useRef } from 'react';

interface ScrollTextProps {
  text: string;
  className?: string;
}

const ScrollText = ({ text, className = '' }: ScrollTextProps) => {
  const ref = useRef<HTMLDivElement>(null);
  const { scrollYProgress } = useScroll({
    target: ref,
    offset: ['start end', 'end start']
  });

  const opacity = useTransform(scrollYProgress, [0, 0.2, 0.8, 1], [0, 1, 1, 0]);
  const y = useTransform(scrollYProgress, [0, 1], [100, -100]);

  return (
    <motion.div
      ref={ref}
      className={`relative ${className}`}
      style={{ opacity, y }}
    >
      <motion.h1
        className="text-6xl font-bold text-white"
        initial={{ opacity: 0, y: 50 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.8 }}
      >
        {text}
      </motion.h1>
    </motion.div>
  );
};

export default ScrollText; 