import React from 'react';
import { motion } from 'framer-motion';
import { Loader2 } from 'lucide-react';

function LoadingState() {
  return (
    <div className="min-h-screen flex items-center justify-center bg-gradient-to-b from-[#f5f1e8] to-[#e8e4db]">
      <motion.div
        initial={{ opacity: 0, scale: 0.8 }}
        animate={{ opacity: 1, scale: 1 }}
        className="flex flex-col items-center gap-4"
      >
        <motion.div
          animate={{ rotate: 360 }}
          transition={{ duration: 1, repeat: Infinity, ease: 'linear' }}
        >
          <Loader2 className="w-12 h-12 text-[#4a7c3c]" />
        </motion.div>
        <p className="text-[#2d5016] font-semibold">Loading...</p>
      </motion.div>
    </div>
  );
}

export default LoadingState;