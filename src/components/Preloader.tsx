import { useEffect, useState } from 'react';
import { motion, AnimatePresence } from 'motion/react';
import { PROFILE_DATA } from '../data/profile';
import { useReducedMotionPreference } from '../hooks/useReducedMotionPreference';

export default function Preloader() {
  const reducedMotion = useReducedMotionPreference();
  const [visible, setVisible] = useState(!reducedMotion);

  useEffect(() => {
    if (reducedMotion) {
      setVisible(false);
      return;
    }
    const timer = window.setTimeout(() => {
      setVisible(false);
    }, 650);
    return () => window.clearTimeout(timer);
  }, [reducedMotion]);

  return (
    <AnimatePresence>
      {visible && (
        <motion.div
          initial={{ opacity: 1 }}
          exit={{ opacity: 0 }}
          transition={{ duration: 0.35, ease: [0.16, 1, 0.3, 1] }}
          className="fixed inset-0 z-50 flex flex-col items-center justify-center bg-[#F2F6FB] engineering-grid-bg"
          aria-hidden="true"
        >
          <motion.div
            initial={{ scale: 0.92, opacity: 0 }}
            animate={{ scale: 1, opacity: 1 }}
            transition={{ duration: 0.35, ease: [0.16, 1, 0.3, 1] }}
            className="flex flex-col items-center gap-4"
          >
            <div className="relative h-16 w-16 overflow-hidden rounded-full border-2 border-[#1463FF] bg-white shadow-[0_8px_24px_rgba(20,99,255,0.2)]">
              <img
                src={PROFILE_DATA.logoImage}
                alt=""
                className="h-full w-full object-cover object-center"
              />
            </div>
            <div className="h-1 w-36 overflow-hidden rounded-full bg-[#DCE6F3]">
              <motion.div
                initial={{ x: '-100%' }}
                animate={{ x: '100%' }}
                transition={{ duration: 0.6, ease: 'easeInOut' }}
                className="h-full w-full bg-gradient-to-r from-[#1463FF] via-[#0284C7] to-[#06B6D4]"
              />
            </div>
            <span className="font-mono text-xs font-medium tracking-widest text-[#334A6B]">
              NIRUDI RAMU
            </span>
          </motion.div>
        </motion.div>
      )}
    </AnimatePresence>
  );
}
