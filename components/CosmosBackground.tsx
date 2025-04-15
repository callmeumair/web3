import { useEffect, useRef } from 'react';
import { motion, useScroll, useTransform } from 'framer-motion';

const CosmosBackground = () => {
  const containerRef = useRef<HTMLDivElement>(null);
  const { scrollYProgress } = useScroll({
    target: containerRef,
    offset: ['start start', 'end end']
  });

  const backgroundOpacity = useTransform(scrollYProgress, [0, 0.2], [1, 0]);
  const scale = useTransform(scrollYProgress, [0, 0.5], [1, 1.2]);
  const rotate = useTransform(scrollYProgress, [0, 1], [0, 5]);

  return (
    <div ref={containerRef} className="fixed inset-0 overflow-hidden">
      <motion.div
        className="absolute inset-0 bg-gradient-to-br from-purple-900 via-black to-blue-900"
        style={{
          opacity: backgroundOpacity,
          scale,
          rotate
        }}
      >
        {/* Animated particles */}
        {[...Array(50)].map((_, i) => (
          <motion.div
            key={i}
            className="absolute w-1 h-1 bg-white rounded-full"
            style={{
              x: Math.random() * window.innerWidth,
              y: Math.random() * window.innerHeight,
              opacity: useTransform(scrollYProgress, [0, 0.5], [0.3, 0]),
              scale: useTransform(scrollYProgress, [0, 0.5], [1, 0.5])
            }}
            animate={{
              y: [0, -20, 0],
              opacity: [0.3, 0.5, 0.3],
            }}
            transition={{
              duration: 2 + Math.random() * 3,
              repeat: Infinity,
              ease: "easeInOut"
            }}
          />
        ))}
      </motion.div>
    </div>
  );
};

export default CosmosBackground; 