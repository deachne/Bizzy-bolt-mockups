import React from 'react';

interface MiniAppCardProps {
  icon: React.ReactNode;
  title: string;
  subtitle: string;
  gradient: string;
  onClick?: () => void;
  isPlaceholder?: boolean;
}

export function MiniAppCard({ icon, title, subtitle, gradient, onClick, isPlaceholder }: MiniAppCardProps) {
  if (isPlaceholder) {
    return (
      <div className="bg-gray-50 border-2 border-dashed border-gray-200 rounded-xl p-4 flex flex-col items-center justify-center text-center hover:border-gray-300 transition-all duration-200 cursor-pointer group">
        <div className="text-gray-400 text-2xl mb-2 group-hover:text-gray-500 transition-colors">
          {icon}
        </div>
        <div className="text-xs text-gray-500 font-medium">{title}</div>
      </div>
    );
  }

  return (
    <div 
      className="bg-white rounded-xl p-4 shadow-sm hover:shadow-lg transition-all duration-300 cursor-pointer border border-gray-100 hover:border-emerald-200 hover:-translate-y-1 group"
      onClick={onClick}
    >
      <div className={`w-12 h-12 ${gradient} rounded-xl flex items-center justify-center text-white mb-3 group-hover:scale-110 transition-transform duration-200 shadow-sm`}>
        {icon}
      </div>
      <div className="text-sm font-semibold text-gray-900 mb-1">{title}</div>
      <div className="text-xs text-gray-500">{subtitle}</div>
    </div>
  );
}