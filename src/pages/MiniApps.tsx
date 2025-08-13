import React, { useState } from 'react';
import { Plus, Rocket } from 'lucide-react';
import { CategoryTabs } from '../components/miniapps/CategoryTabs';
import { MiniAppsGrid } from '../components/miniapps/MiniAppsGrid';
import { TankMixModal } from '../components/miniapps/TankMixModal';
import { WidgetMode } from '../components/miniapps/WidgetMode';

export function MiniApps() {
  const [activeCategory, setActiveCategory] = useState('All Apps');
  const [isTankMixOpen, setIsTankMixOpen] = useState(false);
  const [isWidgetOpen, setIsWidgetOpen] = useState(false);

  const categories = [
    'All Apps',
    'Field Ops',
    'Financial', 
    'Decisions',
    'Compliance',
    'Favorites ⭐'
  ];

  return (
    <div className="min-h-screen bg-gradient-to-br from-gray-50 to-gray-100">
      <div className="container mx-auto p-6">
        {/* Header */}
        <div className="flex items-center justify-between mb-6">
          <div>
            <h1 className="text-3xl font-bold text-gray-900 mb-2">Mini Apps</h1>
            <p className="text-gray-600">Quick tools for everyday farm decisions</p>
          </div>
          <button className="bg-gradient-to-r from-emerald-600 to-emerald-700 hover:from-emerald-700 hover:to-emerald-800 text-white px-6 py-3 rounded-xl font-semibold transition-all duration-200 shadow-sm hover:shadow-md transform hover:scale-105 flex items-center gap-2">
            <Plus className="w-4 h-4" />
            Add to Dashboard
          </button>
        </div>

        {/* Category Tabs */}
        <div className="bg-white rounded-2xl shadow-sm border border-gray-200 mb-6">
          <CategoryTabs 
            categories={categories}
            activeCategory={activeCategory}
            onCategoryChange={setActiveCategory}
          />
          
          {/* Mini Apps Grid */}
          <MiniAppsGrid onOpenTankMix={() => setIsTankMixOpen(true)} />
        </div>
      </div>

      {/* Tank Mix Modal */}
      <TankMixModal 
        isOpen={isTankMixOpen}
        onClose={() => setIsTankMixOpen(false)}
      />

      {/* Widget Mode */}
      <WidgetMode 
        isOpen={isWidgetOpen}
        onClose={() => setIsWidgetOpen(false)}
      />

      {/* Floating Action Button */}
      <button 
        onClick={() => setIsWidgetOpen(!isWidgetOpen)}
        className="fixed bottom-6 right-6 w-14 h-14 bg-gradient-to-br from-emerald-600 to-emerald-700 hover:from-emerald-700 hover:to-emerald-800 text-white rounded-full shadow-lg hover:shadow-xl transition-all duration-300 transform hover:scale-110 flex items-center justify-center z-40"
      >
        <Rocket className="w-6 h-6" />
      </button>
    </div>
  );
}