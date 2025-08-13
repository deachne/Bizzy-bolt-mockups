import React, { useState } from 'react';
import { Calendar, TrendingUp, MapPin } from 'lucide-react';
import { motion, AnimatePresence } from 'framer-motion';

interface EntityTooltipProps {
  children: React.ReactNode;
  entityData: {
    name: string;
    lastActivity: string;
    status: string;
    stats: string;
    type: 'field' | 'supplier' | 'crop';
  };
}

export function EntityTooltip({ children, entityData }: EntityTooltipProps) {
  const [isVisible, setIsVisible] = useState(false);

  const getIcon = () => {
    switch (entityData.type) {
      case 'field': return <MapPin className="w-3 h-3" />;
      case 'supplier': return <TrendingUp className="w-3 h-3" />;
      case 'crop': return <Calendar className="w-3 h-3" />;
      default: return <MapPin className="w-3 h-3" />;
    }
  };

  return (
    <div
      className="relative inline-block"
      onMouseEnter={() => setIsVisible(true)}
      onMouseLeave={() => setIsVisible(false)}
    >
      {children}
      
      <AnimatePresence>
        {isVisible && (
          <motion.div
            initial={{ opacity: 0, y: 5, scale: 0.95 }}
            animate={{ opacity: 1, y: 0, scale: 1 }}
            exit={{ opacity: 0, y: 5, scale: 0.95 }}
            transition={{ duration: 0.15 }}
            className="absolute bottom-full left-1/2 transform -translate-x-1/2 mb-2 z-50"
          >
            <div className="bg-gray-900 text-white p-3 rounded-lg shadow-lg min-w-48">
              <div className="flex items-center gap-2 mb-2">
                {getIcon()}
                <span className="font-semibold text-sm">{entityData.name}</span>
              </div>
              
              <div className="space-y-1 text-xs">
                <div className="flex justify-between">
                  <span className="text-gray-300">Last Activity:</span>
                  <span>{entityData.lastActivity}</span>
                </div>
                <div className="flex justify-between">
                  <span className="text-gray-300">Status:</span>
                  <span className="text-emerald-400">{entityData.status}</span>
                </div>
                <div className="flex justify-between">
                  <span className="text-gray-300">Stats:</span>
                  <span>{entityData.stats}</span>
                </div>
              </div>
              
              <div className="mt-2 pt-2 border-t border-gray-700">
                <span className="text-xs text-gray-400">Click for full history →</span>
              </div>
              
              {/* Arrow */}
              <div className="absolute top-full left-1/2 transform -translate-x-1/2 w-0 h-0 border-l-4 border-r-4 border-t-4 border-transparent border-t-gray-900" />
            </div>
          </motion.div>
        )}
      </AnimatePresence>
    </div>
  );
}