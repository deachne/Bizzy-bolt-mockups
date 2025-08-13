import React from 'react';
import { Plus, CloudSun } from 'lucide-react';
import { CommandBar } from '../ui/CommandBar';

interface HeaderProps {
  onCommandPaletteToggle: () => void;
}

export function Header({ onCommandPaletteToggle }: HeaderProps) {
  return (
    <header className="glass h-14 border-b border-gray-200 flex items-center px-6 gap-4 backdrop-blur-lg">
      {/* AI Command Bar */}
      <CommandBar onCommandPaletteToggle={onCommandPaletteToggle} />
      
      {/* Quick Add Button */}
      <button className="flex items-center gap-2 bg-gradient-to-r from-emerald-600 to-emerald-700 hover:from-emerald-700 hover:to-emerald-800 text-white px-4 py-2 rounded-lg transition-all duration-200 shadow-sm hover:shadow-md transform hover:scale-105">
        <Plus className="w-4 h-4" />
        <span className="text-sm font-medium">Quick Add</span>
      </button>
      
      {/* Weather Widget */}
      <div className="flex items-center gap-2 px-3 py-1.5 bg-gradient-to-r from-blue-50 to-sky-50 rounded-lg border border-blue-100 shadow-sm">
        <CloudSun className="w-4 h-4 text-blue-600" />
        <span className="text-sm font-semibold text-blue-900">22°C</span>
        <span className="text-xs text-blue-700">Partly Cloudy</span>
      </div>
    </header>
  );
}