import React from 'react';

interface SmartCardProps {
  children: React.ReactNode;
  className?: string;
  onClick?: () => void;
  hover?: boolean;
}

export function SmartCard({ children, className = '', onClick, hover = true }: SmartCardProps) {
  return (
    <div 
      className={`
        bg-white border border-gray-100 rounded-xl p-4 transition-all duration-300
        ${hover ? 'hover:shadow-lg hover:shadow-gray-100/50 hover:border-emerald-200 hover:-translate-y-1' : ''}
        ${onClick ? 'cursor-pointer' : ''}
        ${className}
      `}
      onClick={onClick}
    >
      {children}
    </div>
  );
}