import React from 'react';
import { Link, useLocation } from 'react-router-dom';
import { Inbox, StickyNote, Book, Map, Scaling as Seedling, DollarSign, Palette, Mic, Camera, Receipt, ChevronDown, Tractor } from 'lucide-react';

interface NavigationItem {
  icon: React.ReactNode;
  label: string;
  path: string;
  badge?: number;
}

interface QuickAction {
  icon: React.ReactNode;
  label: string;
  action: () => void;
}

export function Sidebar() {
  const location = useLocation();
  const navigationItems: NavigationItem[] = [
    { icon: <Inbox className="w-5 h-5" />, label: 'Inbox', path: '/inbox', badge: 3 },
    { icon: <StickyNote className="w-5 h-5" />, label: 'Notes', path: '/notes' },
    { icon: <Book className="w-5 h-5" />, label: 'Library', path: '/library' },
    { icon: <Map className="w-5 h-5" />, label: 'Fields', path: '/fields' },
    { icon: <Seedling className="w-5 h-5" />, label: 'Crop Planning', path: '/crop-planning' },
    { icon: <DollarSign className="w-5 h-5" />, label: 'Accounting', path: '/accounting' },
    { icon: <Palette className="w-5 h-5" />, label: 'Canvas', path: '/canvas' },
  ];

  const quickActions: QuickAction[] = [
    { icon: <Mic className="w-5 h-5" />, label: 'Voice Note', action: () => console.log('Voice note') },
    { icon: <Camera className="w-5 h-5" />, label: 'Field Photo', action: () => console.log('Field photo') },
    { icon: <Receipt className="w-5 h-5" />, label: 'Scan Receipt', action: () => console.log('Scan receipt') },
  ];

  return (
    <div className="w-64 bg-white border-r border-gray-200 flex flex-col h-full">
      {/* Workspace Switcher */}
      <div className="p-4 border-b border-gray-200">
        <div className="flex items-center gap-3 p-2 hover:bg-gray-50 rounded-lg cursor-pointer transition-all duration-200 group">
          <div className="w-8 h-8 bg-gradient-to-br from-emerald-500 to-emerald-600 rounded-lg flex items-center justify-center text-white shadow-sm group-hover:shadow-md transition-shadow">
            <Tractor className="w-4 h-4" />
          </div>
          <div className="flex-1">
            <div className="text-sm font-semibold text-gray-900">Farm Business</div>
            <div className="text-xs text-gray-500">2025 Season</div>
          </div>
          <ChevronDown className="w-4 h-4 text-gray-400 group-hover:text-gray-600 transition-colors" />
        </div>
      </div>
      
      {/* Navigation */}
      <nav className="flex-1 p-4 overflow-y-auto">
        <div className="space-y-1">
          {navigationItems.map((item) => (
            <Link
              key={item.label}
              to={item.path}
              className={`
                flex items-center gap-3 p-2 rounded-lg transition-all duration-200 group
                ${location.pathname === item.path
                  ? 'bg-emerald-50 text-emerald-700 shadow-sm' 
                  : 'hover:bg-gray-50 text-gray-700'
                }
              `}
            >
              <div className={`transition-colors ${location.pathname === item.path ? 'text-emerald-600' : 'text-gray-500 group-hover:text-gray-700'}`}>
                {item.icon}
              </div>
              <span className="flex-1 text-sm font-medium">{item.label}</span>
              {item.badge && (
                <span className="bg-emerald-600 text-white text-xs px-1.5 py-0.5 rounded-full font-medium">
                  {item.badge}
                </span>
              )}
            </Link>
          ))}
        </div>
        
        {/* Quick Actions */}
        <div className="mt-8">
          <div className="text-xs font-semibold text-gray-400 uppercase tracking-wider mb-3 px-2">
            Quick Actions
          </div>
          <div className="space-y-1">
            {quickActions.map((action) => (
              <button
                key={action.label}
                onClick={action.action}
                className="flex items-center gap-3 p-2 hover:bg-gray-50 rounded-lg w-full text-left transition-all duration-200 group"
              >
                <div className="text-gray-500 group-hover:text-gray-700 transition-colors">
                  {action.icon}
                </div>
                <span className="text-sm text-gray-600 group-hover:text-gray-800 transition-colors">
                  {action.label}
                </span>
              </button>
            ))}
          </div>
        </div>
      </nav>
      
      {/* User Section */}
      <div className="p-4 border-t border-gray-200">
        <div className="flex items-center gap-3 p-2 hover:bg-gray-50 rounded-lg transition-all duration-200 cursor-pointer group">
          <div className="w-8 h-8 bg-gradient-to-br from-gray-300 to-gray-400 rounded-full flex items-center justify-center text-white text-sm font-medium shadow-sm">
            DN
          </div>
          <div className="flex-1">
            <div className="text-sm font-medium text-gray-900">Darcy N.</div>
            <div className="text-xs text-gray-500 group-hover:text-gray-600 transition-colors">Settings</div>
          </div>
        </div>
      </div>
    </div>
  );
}