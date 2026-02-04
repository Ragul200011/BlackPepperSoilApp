import React, { useState } from 'react';
import { Helmet } from 'react-helmet';
import { motion, AnimatePresence } from 'framer-motion';
import { useApp } from '@/context/AppContext';
import { Button } from '@/components/ui/button';
import { ChevronDown, ChevronUp, AlertCircle, Info, Sparkles } from 'lucide-react';

export default function RecommendationScreen() {
  const { recommendations } = useApp();
  const [expandedId, setExpandedId] = useState(null);

  const getPriorityColor = (priority) => {
    switch (priority) {
      case 'high': return 'bg-red-100 text-red-800 border-red-300';
      case 'medium': return 'bg-yellow-100 text-yellow-800 border-yellow-300';
      case 'low': return 'bg-green-100 text-green-800 border-green-300';
      default: return 'bg-gray-100 text-gray-800 border-gray-300';
    }
  };

  const getPriorityIcon = (priority) => {
    switch (priority) {
      case 'high': return <AlertCircle className="w-5 h-5" />;
      case 'medium': return <Info className="w-5 h-5" />;
      default: return <Sparkles className="w-5 h-5" />;
    }
  };

  const getTypeLabel = (type) => {
    const labels = {
      fertilizer: 'Fertilizer',
      soil: 'Soil Management',
      variety: 'Crop Variety',
      insight: 'Best Practice',
      irrigation: 'Irrigation',
    };
    return labels[type] || 'General';
  };

  return (
    <div className="min-h-screen bg-gradient-to-b from-[#f5f1e8] to-[#e8e4db] pb-6">
      <Helmet>
        <title>Recommendations - Smart Farming</title>
      </Helmet>

      <div className="bg-gradient-to-br from-[#8b6f47] to-[#6d5837] text-white px-6 py-8 rounded-b-3xl shadow-lg">
        <h1 className="text-3xl font-bold">AI Recommendations</h1>
        <p className="text-sm opacity-90">Personalized insights based on your soil data</p>
      </div>

      <div className="px-6 mt-6 space-y-4">
        {recommendations.map((rec, index) => (
          <motion.div
            key={rec.id}
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: index * 0.1 }}
            className="bg-white rounded-2xl shadow-md"
          >
            <div className="p-5">
              <div className="flex justify-between mb-3">
                <div className={`px-3 py-1 rounded-full border flex items-center gap-2 ${getPriorityColor(rec.priority)}`}>
                  {getPriorityIcon(rec.priority)}
                  <span className="capitalize">{rec.priority} Priority</span>
                </div>
                <span className="text-xs bg-[#f5f1e8] px-3 py-1 rounded-full">
                  {getTypeLabel(rec.type)}
                </span>
              </div>

              <h3 className="text-xl font-bold text-[#2d5016]">{rec.title}</h3>
              <p className="text-sm text-gray-700">{rec.description}</p>

              <Button
                variant="ghost"
                className="w-full mt-4"
                onClick={() => setExpandedId(expandedId === rec.id ? null : rec.id)}
              >
                {expandedId === rec.id ? <ChevronUp /> : <ChevronDown />}
              </Button>
            </div>

            <AnimatePresence>
              {expandedId === rec.id && (
                <motion.div
                  initial={{ height: 0 }}
                  animate={{ height: 'auto' }}
                  exit={{ height: 0 }}
                  className="p-5 border-t"
                >
                  <p className="text-sm">{rec.details}</p>
                </motion.div>
              )}
            </AnimatePresence>
          </motion.div>
        ))}
      </div>
    </div>
  );
}
