import React, { useState } from 'react';
import { BrowserRouter as Router, Routes, Route, Navigate } from 'react-router-dom';
import { Header } from './components/layout/Header';
import { Sidebar } from './components/layout/Sidebar';
import { Timeline } from './components/timeline/Timeline';
import { ContextPanel } from './components/layout/ContextPanel';
import { CommandPalette } from './components/ui/CommandPalette';
import { BizzyButton } from './components/ui/BizzyButton';
import { BizzyAssistant } from './components/ui/BizzyAssistant';
import { FloatingQuickActions } from './components/ui/FloatingQuickActions';
import { Toast } from './components/ui/Toast';
import { Inbox } from './pages/Inbox';
import { Notes } from './pages/Notes';
import { Library } from './pages/Library';
import { Fields } from './pages/Fields';
import { CropPlanning } from './pages/CropPlanning';
import { Accounting } from './pages/Accounting';
import { Canvas } from './pages/Canvas';
import { MiniApps } from './pages/MiniApps';

function App() {
  const [isCommandPaletteOpen, setIsCommandPaletteOpen] = useState(false);
  const [isBizzyOpen, setIsBizzyOpen] = useState(false);
  const [toast, setToast] = useState<{
    message: string;
    type: 'success' | 'error' | 'info';
    isVisible: boolean;
  }>({ message: '', type: 'info', isVisible: false });

  return (
    <Router>
      <div className="flex h-screen bg-gray-50">
        {/* Left Sidebar */}
        <Sidebar />
        
        {/* Main Content Area */}
        <div className="flex-1 flex flex-col">
          {/* Top Header */}
          <Header onCommandPaletteToggle={() => setIsCommandPaletteOpen(true)} />
          
          {/* Main Content */}
          <div className="flex-1 flex">
            {/* Content Area */}
            <main className="flex-1 overflow-y-auto">
              <Routes>
                <Route path="/" element={<Navigate to="/inbox" replace />} />
                <Route path="/inbox" element={<Inbox />} />
                <Route path="/notes" element={
                  <div className="p-6">
                    {/* Page Header */}
                    <div className="mb-6">
                      <div className="flex items-center gap-2 text-sm text-gray-500 mb-2">
                        <a href="#" className="hover:text-gray-700 transition-colors">Home</a>
                        <span className="text-gray-300">›</span>
                        <a href="#" className="hover:text-gray-700 transition-colors">Notes</a>
                        <span className="text-gray-300">›</span>
                        <span className="text-gray-700">Today's Observations</span>
                      </div>
                      <h1 className="text-2xl font-bold text-gray-900">Field Notes & Observations</h1>
                    </div>
                    
                    {/* Filter Bar */}
                    <div className="flex items-center gap-3 mb-6">
                      <button className="px-3 py-1.5 bg-white border border-gray-300 rounded-lg text-sm hover:bg-gray-50 flex items-center gap-2 transition-all duration-200">
                        <span className="text-gray-500">🔍</span>
                        Filters
                      </button>
                      <div className="bg-gradient-to-r from-emerald-500 to-emerald-600 text-white px-2 py-1 rounded-md text-xs font-semibold inline-flex items-center gap-1 cursor-pointer transition-all duration-200 hover:scale-105 hover:shadow-md transform">
                        📍 NW14
                      </div>
                      <div className="bg-gradient-to-r from-amber-500 to-amber-600 text-white px-2 py-1 rounded-md text-xs font-semibold inline-flex items-center gap-1 cursor-pointer transition-all duration-200 hover:scale-105 hover:shadow-md transform">
                        🌾 Spring Wheat
                      </div>
                      <button className="px-3 py-1.5 bg-white border border-gray-300 rounded-lg text-sm hover:bg-gray-50 transition-all duration-200">
                        Last 7 days
                      </button>
                    </div>
                    
                    {/* Timeline */}
                    <Timeline />
                  </div>
                } />
                <Route path="/library" element={<Library />} />
                <Route path="/fields" element={<Fields />} />
                <Route path="/crop-planning" element={<CropPlanning />} />
                <Route path="/accounting" element={<Accounting />} />
                <Route path="/canvas" element={<Canvas />} />
                <Route path="/mini-apps" element={<MiniApps />} />
              </Routes>
            </main>
            
            {/* Context Panel - Only show on notes page */}
            <Routes>
              <Route path="/notes" element={<ContextPanel />} />
            </Routes>
          </div>
        </div>
        
        {/* Command Palette */}
        <CommandPalette 
          isOpen={isCommandPaletteOpen}
          onClose={() => setIsCommandPaletteOpen(false)}
        />
        
        {/* Bizzy Assistant */}
        <BizzyAssistant 
          isOpen={isBizzyOpen}
          onClose={() => setIsBizzyOpen(false)}
        />
        
        {/* Floating Actions */}
        <FloatingQuickActions />
        <BizzyButton 
          onClick={() => setIsBizzyOpen(true)}
          hasNotification={false}
        />
        
        {/* Toast Notifications */}
        <Toast
          message={toast.message}
          type={toast.type}
          isVisible={toast.isVisible}
          onClose={() => setToast(prev => ({ ...prev, isVisible: false }))}
        />
      </div>
    </Router>
  );
}

export default App;