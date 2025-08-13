import React from 'react';
import { EntityTooltip } from './EntityTooltip';

interface EntityBadgeProps {
  icon?: React.ReactNode;
  label: string;
  variant?: 'primary' | 'secondary' | 'accent' | 'warning';
  onClick?: () => void;
  showTooltip?: boolean;
  entityData?: {
    name: string;
    lastActivity: string;
    status: string;
    stats: string;
    type: 'field' | 'supplier' | 'crop';
  };
}

const variants = {
  primary: 'bg-gradient-to-r from-emerald-500 to-emerald-600',
  secondary: 'bg-gradient-to-r from-amber-500 to-amber-600', 
  accent: 'bg-gradient-to-r from-purple-500 to-purple-600',
  warning: 'bg-gradient-to-r from-orange-500 to-orange-600'
};

export function EntityBadge({ 
  icon, 
  label, 
  variant = 'primary', 
  onClick, 
  showTooltip = false,
  entityData 
}: EntityBadgeProps) {
  const badge = (
    <div 
      className={`
        ${variants[variant]} text-white px-2 py-1 rounded-md text-xs font-semibold
        inline-flex items-center gap-1 cursor-pointer transition-all duration-200
        hover:scale-105 hover:shadow-md transform
      `}
      onClick={onClick}
    >
      {icon}
      {label}
    </div>
  );

  if (showTooltip && entityData) {
    return (
      <EntityTooltip entityData={entityData}>
        {badge}
      </EntityTooltip>
    );
  }

  return badge;
}