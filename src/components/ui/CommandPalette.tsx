import React, { useState, useEffect } from 'react';
import { Search, Clock, FileText, Plus, Mic, Camera, Command as CommandIcon } from 'lucide-react';

interface CommandPaletteProps {
  isOpen: boolean;
  onClose: () => void;
}

interface CommandItem {
  id: string;
  title: string;
  subtitle?: string;
  icon: React.ReactNode;
  category: 'recent' | 'actions';
  shortcut?: string;
  action: () => void;
}

export function CommandPalette({ isOpen, onClose }: CommandPaletteProps) {
  const [searchQuery, setSearchQuery] = useState('');

  const commands: CommandItem[] = [
    {
      id: 'nw14-notes',
      title: 'NW14 Field Notes',
      subtitle: 'Opened 2 hours ago',
      icon: <Clock className="w-4 h-4" />,
      category: 'recent',
      action: () => console.log('Open NW14 notes')
    },
    {
      id: 'nutrien-quote',
      title: 'Nutrien Fertilizer Quote', 
      subtitle: 'Created yesterday',
      icon: <FileText className="w-4 h-4" />,
      category: 'recent',
      action: () => console.log('Open Nutrien quote')
    },
    {
      id: 'new-note',
      title: 'New Note',
      icon: <Plus className="w-4 h-4 text-emerald-600" />,
      category: 'actions',
      shortcut: '⌘N',
      action: () => console.log('New note')
    },
    {
      id: 'voice-note',
      title: 'Voice Note',
      icon: <Mic className="w-4 h-4 text-blue-600" />,
      category: 'actions', 
      shortcut: '⌘V',
      action: () => console.log('Voice note')
    },
    {
      id: 'take-photo',
      title: 'Take Photo',
      icon: <Camera className="w-4 h-4 text-purple-600" />,
      category: 'actions',
      shortcut: '⌘P', 
      action: () => console.log('Take photo')
    }
  ];

  const filteredCommands = commands.filter(cmd => 
    cmd.title.toLowerCase().includes(searchQuery.toLowerCase()) ||
    cmd.subtitle?.toLowerCase().includes(searchQuery.toLowerCase())
  );

  const recentCommands = filteredCommands.filter(cmd => cmd.category === 'recent');
  const actionCommands = filteredCommands.filter(cmd => cmd.category === 'actions');

  useEffect(() => {
    const handleKeyDown = (e: KeyboardEvent) => {
      if (e.key === 'Escape') {
        onClose();
      }
      if ((e.metaKey || e.ctrlKey) && e.key === 'k') {
        e.preventDefault();
      }
    };

    if (isOpen) {
      document.addEventListener('keydown', handleKeyDown);
      return () => document.removeEventListener('keydown', handleKeyDown);
    }
  }, [isOpen, onClose]);

  if (!isOpen) return null;

  return (
    <>
      {/* Backdrop */}
      <div 
        className="fixed inset-0 bg-black bg-opacity-25 backdrop-blur-sm z-50 transition-all duration-200"
        onClick={onClose}
      />
      
      {/* Command Palette */}
      <div className="fixed top-1/2 left-1/2 transform -translate-x-1/2 -translate-y-1/2 w-[600px] max-w-[90vw] bg-white rounded-2xl shadow-2xl z-50 overflow-hidden border border-gray-200">
        {/* Search Input */}
        <div className="p-4 border-b border-gray-100">
          <div className="flex items-center gap-3">
            <Search className="w-5 h-5 text-gray-400" />
            <input
              type="text"
              placeholder="Type a command or search..."
              value={searchQuery}
              onChange={(e) => setSearchQuery(e.target.value)}
              className="flex-1 outline-none text-lg placeholder-gray-500"
              autoFocus
            />
            <div className="flex items-center gap-1">
              <kbd className="px-2 py-1 text-xs bg-gray-100 rounded border">ESC</kbd>
            </div>
          </div>
        </div>

        {/* Results */}
        <div className="max-h-96 overflow-y-auto">
          {/* Recent */}
          {recentCommands.length > 0 && (
            <div className="p-2">
              <div className="text-xs text-gray-500 px-3 py-2 font-medium uppercase tracking-wider">
                Recent
              </div>
              {recentCommands.map((command) => (
                <button
                  key={command.id}
                  onClick={() => {
                    command.action();
                    onClose();
                  }}
                  className="w-full flex items-center gap-3 p-3 hover:bg-gray-100 rounded-lg transition-all duration-200 text-left group"
                >
                  <div className="text-gray-400 group-hover:text-gray-600 transition-colors">
                    {command.icon}
                  </div>
                  <div className="flex-1">
                    <div className="text-sm font-medium text-gray-900">{command.title}</div>
                    {command.subtitle && (
                      <div className="text-xs text-gray-500">{command.subtitle}</div>
                    )}
                  </div>
                </button>
              ))}
            </div>
          )}

          {/* Actions */}
          {actionCommands.length > 0 && (
            <div className="p-2">
              <div className="text-xs text-gray-500 px-3 py-2 font-medium uppercase tracking-wider">
                Actions
              </div>
              {actionCommands.map((command) => (
                <button
                  key={command.id}
                  onClick={() => {
                    command.action();
                    onClose();
                  }}
                  className="w-full flex items-center gap-3 p-3 hover:bg-gray-100 rounded-lg transition-all duration-200 text-left group"
                >
                  <div className="group-hover:scale-110 transition-transform">
                    {command.icon}
                  </div>
                  <span className="flex-1 text-sm font-medium text-gray-900">
                    {command.title}
                  </span>
                  {command.shortcut && (
                    <kbd className="text-xs bg-gray-100 px-2 py-1 rounded border">
                      {command.shortcut}
                    </kbd>
                  )}
                </button>
              ))}
            </div>
          )}

          {filteredCommands.length === 0 && (
            <div className="p-8 text-center text-gray-500">
              <Search className="w-8 h-8 mx-auto mb-2 text-gray-300" />
              <p>No results found for "{searchQuery}"</p>
            </div>
          )}
        </div>
      </div>
    </>
  );
}