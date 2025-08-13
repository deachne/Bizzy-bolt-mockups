import React from 'react';
import { Sparkles, MoreHorizontal } from 'lucide-react';
import { SmartCard } from '../ui/SmartCard';
import { EntityBadge } from '../ui/EntityBadge';
import { motion } from 'framer-motion';

export interface TimelineEntryData {
  id: string;
  time: string;
  title: string;
  content: string;
  icon: React.ReactNode;
  iconColor: string;
  entities: Array<{ label: string; variant?: 'primary' | 'secondary' | 'accent' | 'warning' }>;
  tags: string[];
  action?: {
    label: string;
    onClick: () => void;
  };
  images?: string[];
  metadata?: React.ReactNode;
  hasAIInsights?: boolean;
}

interface TimelineEntryProps {
  entry: TimelineEntryData;
  isLast?: boolean;
}

export function TimelineEntry({ entry, isLast = false }: TimelineEntryProps) {
  const mockEntityData = {
    name: entry.entities[0]?.label || 'Unknown',
    lastActivity: '2 hours ago',
    status: 'Active',
    stats: '160 acres',
    type: 'field' as const
  };

  return (
    <div className={`relative ${!isLast ? 'pb-8' : ''}`}>
      {/* Timeline line */}
      {!isLast && (
        <div className="absolute left-4 top-8 w-0.5 h-full bg-gradient-to-b from-emerald-200 via-gray-200 to-transparent"></div>
      )}
      
      {/* Timeline dot */}
      <div className="absolute left-2 top-6 w-4 h-4 bg-gradient-to-br from-emerald-400 to-emerald-600 rounded-full border-2 border-white shadow-md z-10"></div>
      
      {/* Content */}
      <div className="ml-10">
        <SmartCard>
          {/* Header */}
          <div className="flex items-start justify-between mb-3">
            <div className="flex items-center gap-3">
              <div className={`p-1.5 rounded-lg ${entry.iconColor}`}>
                {entry.icon}
              </div>
              <span className="text-xs font-medium text-gray-500 bg-gray-50 px-2 py-1 rounded-md">
                {entry.time}
              </span>
              {entry.hasAIInsights && (
                <motion.div
                  animate={{ rotate: [0, 10, -10, 0] }}
                  transition={{ duration: 2, repeat: Infinity, repeatDelay: 3 }}
                  className="text-amber-500"
                >
                  <Sparkles className="w-4 h-4" />
                </motion.div>
              )}
            </div>
            <div className="flex items-center gap-2">
              <div className="flex gap-2 flex-wrap">
              {entry.entities.map((entity, index) => (
                <EntityBadge 
                  key={index} 
                  label={entity.label} 
                  variant={entity.variant || 'primary'} 
                  showTooltip={true}
                  entityData={mockEntityData}
                />
              ))}
              </div>
              <button className="p-1 hover:bg-gray-100 rounded-lg transition-colors opacity-0 group-hover:opacity-100">
                <MoreHorizontal className="w-4 h-4 text-gray-400" />
              </button>
            </div>
          </div>
          
          {/* Title and Content */}
          <h3 className="font-semibold text-gray-900 mb-2 text-lg leading-tight">
            {entry.title}
          </h3>
          <p className="text-gray-600 mb-4 leading-relaxed">
            {entry.content}
          </p>
          
          {/* Images */}
          {entry.images && entry.images.length > 0 && (
            <div className="flex gap-2 mb-4">
              {entry.images.map((image, index) => (
                <div key={index} className="relative group">
                  <img 
                    src={image}
                    className="w-24 h-18 object-cover rounded-lg shadow-sm group-hover:shadow-md transition-all duration-200" 
                    alt={`Field photo ${index + 1}`}
                  />
                  <div className="absolute inset-0 bg-black bg-opacity-0 group-hover:bg-opacity-10 rounded-lg transition-all duration-200"></div>
                </div>
              ))}
            </div>
          )}
          
          {/* Metadata */}
          {entry.metadata && (
            <div className="mb-4">
              {entry.metadata}
            </div>
          )}
          
          {/* Footer */}
          <div className="flex items-center justify-between pt-3 border-t border-gray-50">
            <div className="flex items-center gap-4 text-xs text-gray-500">
              <span className="flex items-center gap-1">
                <span className="w-2 h-2 bg-emerald-400 rounded-full"></span>
                {entry.tags.join(', ')}
              </span>
            </div>
            {entry.action && (
              <button 
                onClick={entry.action.onClick}
                className="text-emerald-600 hover:text-emerald-700 font-medium text-sm transition-colors duration-200 flex items-center gap-1 group"
              >
                {entry.action.label}
                <span className="group-hover:translate-x-0.5 transition-transform duration-200">→</span>
              </button>
            )}
          </div>
        </SmartCard>
      </div>
    </div>
  );
}