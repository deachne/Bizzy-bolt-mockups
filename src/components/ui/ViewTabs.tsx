import React from 'react';
import { BarChart3, Focus, Palette, Clock } from 'lucide-react';
import { motion } from 'framer-motion';

interface ViewTabsProps {
  activeView: string;
  onViewChange: (view: string) => void;
}

const views = [
  { id: 'timeline', label: 'Timeline', icon: Clock },
  { id: 'graph', label: 'Graph', icon: BarChart3 },
  { id: 'focus', label: 'Focus', icon: Focus },
  { id: 'forge', label: 'Forge', icon: Palette }
];

export function ViewTabs({ activeView, onViewChange }: ViewTabsProps) {
  return (
    <div className="flex gap-1 p-1 bg-gray-100 rounded-lg">
      {views.map((view) => {
        const Icon = view.icon;
        const isActive = activeView === view.id;
        
        return (
          <button
            key={view.id}
            onClick={() => onViewChange(view.id)}
            className={`relative flex items-center gap-2 px-4 py-2 rounded-md text-sm font-medium transition-all duration-200 ${
              isActive
                ? 'text-emerald-700'
                : 'text-gray-600 hover:text-gray-900 hover:bg-gray-50'
            }`}
          >
            {isActive && (
              <motion.div
                layoutId="activeTab"
                className="absolute inset-0 bg-white rounded-md shadow-sm"
                transition={{ type: 'spring', damping: 25, stiffness: 200 }}
              />
            )}
            <Icon className="w-4 h-4 relative z-10" />
            <span className="relative z-10">{view.label}</span>
          </button>
        );
      })}
    </div>
  );
}