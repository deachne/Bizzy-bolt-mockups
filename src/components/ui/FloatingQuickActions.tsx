import React, { useState, useEffect } from 'react';
import { Plus, Mic, Camera, Receipt, FileText } from 'lucide-react';
import { motion, AnimatePresence } from 'framer-motion';

interface FloatingQuickActionsProps {
  isCapturing?: boolean;
}

export function FloatingQuickActions({ isCapturing = false }: FloatingQuickActionsProps) {
  const [isExpanded, setIsExpanded] = useState(false);
  const [isVisible, setIsVisible] = useState(true);
  const [lastScrollY, setLastScrollY] = useState(0);

  useEffect(() => {
    const handleScroll = () => {
      const currentScrollY = window.scrollY;
      setIsVisible(currentScrollY < lastScrollY || currentScrollY < 100);
      setLastScrollY(currentScrollY);
    };

    window.addEventListener('scroll', handleScroll, { passive: true });
    return () => window.removeEventListener('scroll', handleScroll);
  }, [lastScrollY]);

  const actions = [
    { icon: FileText, label: 'Quick Note', color: 'bg-blue-500' },
    { icon: Mic, label: 'Voice Note', color: 'bg-purple-500' },
    { icon: Camera, label: 'Field Photo', color: 'bg-green-500' },
    { icon: Receipt, label: 'Scan Receipt', color: 'bg-orange-500' }
  ];

  return (
    <motion.div
      animate={{
        y: isVisible ? 0 : 100,
        opacity: isVisible ? 1 : 0
      }}
      transition={{ duration: 0.3 }}
      className="fixed bottom-6 left-6 z-40"
    >
      {/* Capture Mode Indicator */}
      <AnimatePresence>
        {isCapturing && (
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            exit={{ opacity: 0, y: 20 }}
            className="mb-4 bg-red-500 text-white px-4 py-2 rounded-full text-sm font-medium flex items-center gap-2"
          >
            <div className="w-2 h-2 bg-white rounded-full animate-pulse" />
            Quick Capture Active
          </motion.div>
        )}
      </AnimatePresence>

      {/* Action Buttons */}
      <div className="relative">
        <AnimatePresence>
          {isExpanded && (
            <motion.div
              initial={{ opacity: 0, scale: 0.8 }}
              animate={{ opacity: 1, scale: 1 }}
              exit={{ opacity: 0, scale: 0.8 }}
              transition={{ duration: 0.2 }}
              className="absolute bottom-16 left-0 space-y-3"
            >
              {actions.map((action, index) => {
                const Icon = action.icon;
                return (
                  <motion.button
                    key={action.label}
                    initial={{ opacity: 0, x: -20 }}
                    animate={{ opacity: 1, x: 0 }}
                    exit={{ opacity: 0, x: -20 }}
                    transition={{ delay: index * 0.05 }}
                    className={`w-12 h-12 ${action.color} text-white rounded-full shadow-lg hover:shadow-xl transition-all duration-200 flex items-center justify-center group`}
                  >
                    <Icon className="w-5 h-5" />
                    
                    {/* Tooltip */}
                    <div className="absolute left-full ml-3 px-3 py-1 bg-gray-900 text-white text-sm rounded-lg opacity-0 group-hover:opacity-100 transition-opacity duration-200 whitespace-nowrap">
                      {action.label}
                    </div>
                  </motion.button>
                );
              })}
            </motion.div>
          )}
        </AnimatePresence>

        {/* Main FAB */}
        <motion.button
          onClick={() => setIsExpanded(!isExpanded)}
          whileHover={{ scale: 1.05 }}
          whileTap={{ scale: 0.95 }}
          className="w-14 h-14 bg-emerald-600 hover:bg-emerald-700 text-white rounded-full shadow-lg hover:shadow-xl transition-all duration-200 flex items-center justify-center"
        >
          <motion.div
            animate={{ rotate: isExpanded ? 45 : 0 }}
            transition={{ duration: 0.2 }}
          >
            <Plus className="w-6 h-6" />
          </motion.div>
        </motion.button>
      </div>
    </motion.div>
  );
}