import React from 'react';
import { motion } from 'framer-motion';
import { FileQuestion } from 'lucide-react';

function EmptyState({ message = 'No data available' }) {
  return (
    <motion.div
      initial={{ opacity: 0, y: 20 }}
      animate={{ opacity: 1, y: 0 }}
      className="flex flex-col items-center justify-center py-12 px-6"
    >
      <div className="w-24 h-24 rounded-full bg-[#f5f1e8] flex items-center justify-center mb-4">
        <FileQuestion className="w-12 h-12 text-[#8b6f47]" />
      </div>
      <p className="text-[#2d5016] font-semibold text-lg">{message}</p>
      <p className="text-gray-600 text-sm mt-2 text-center">
        Check back later or sync your sensors
      </p>
    </motion.div>
  );
}

export default EmptyState;