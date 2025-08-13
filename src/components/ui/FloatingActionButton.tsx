import React from 'react';
import { Plus } from 'lucide-react';

export function FloatingActionButton() {
  return (
    <button className="fixed bottom-6 right-6 w-14 h-14 bg-gradient-to-br from-emerald-500 to-emerald-600 rounded-full flex items-center justify-center text-white shadow-lg hover:shadow-xl transition-all duration-300 transform hover:scale-110 z-40">
      <Plus className="w-6 h-6" />
    </button>
  );
}