import React, { useState, useRef, useEffect } from 'react';
import { Search, Mic, Sparkles, Command } from 'lucide-react';
import { motion, AnimatePresence } from 'framer-motion';

interface CommandBarProps {
  onCommandPaletteToggle: () => void;
}

interface AIResponse {
  id: string;
  query: string;
  response: string;
  type: 'suggestion' | 'answer' | 'action';
}

export function CommandBar({ onCommandPaletteToggle }: CommandBarProps) {
  const [isActive, setIsActive] = useState(false);
  const [query, setQuery] = useState('');
  const [isListening, setIsListening] = useState(false);
  const [aiResponses, setAiResponses] = useState<AIResponse[]>([]);
  const inputRef = useRef<HTMLInputElement>(null);

  const mockAIResponses: AIResponse[] = [
    {
      id: '1',
      query: 'weather',
      response: 'Current conditions: 22°C, partly cloudy. Good spray window tomorrow 6-10 AM.',
      type: 'answer'
    },
    {
      id: '2',
      query: 'nw14',
      response: 'NW14 field: 160 acres of spring wheat. Last scouted 2 days ago - aphid levels below threshold.',
      type: 'answer'
    },
    {
      id: '3',
      query: 'fertilizer',
      response: 'Recent quote from Nutrien: $385/MT for UAN. 12% higher than last month.',
      type: 'suggestion'
    }
  ];

  useEffect(() => {
    const handleKeyDown = (e: KeyboardEvent) => {
      if ((e.metaKey || e.ctrlKey) && e.key === 'k') {
        e.preventDefault();
        handleFocus();
      }
    };

    document.addEventListener('keydown', handleKeyDown);
    return () => document.removeEventListener('keydown', handleKeyDown);
  }, []);

  useEffect(() => {
    if (query.length > 2) {
      const filtered = mockAIResponses.filter(response =>
        response.query.toLowerCase().includes(query.toLowerCase())
      );
      setAiResponses(filtered);
    } else {
      setAiResponses([]);
    }
  }, [query]);

  const handleFocus = () => {
    setIsActive(true);
    inputRef.current?.focus();
  };

  const handleBlur = () => {
    setTimeout(() => {
      setIsActive(false);
      setQuery('');
      setAiResponses([]);
    }, 200);
  };

  const toggleVoice = () => {
    setIsListening(!isListening);
    // Voice recognition would be implemented here
  };

  return (
    <div className="relative flex-1 max-w-2xl">
      <motion.div
        animate={{
          scale: isActive ? 1.02 : 1,
          boxShadow: isActive 
            ? '0 0 0 3px rgba(16, 185, 129, 0.1), 0 4px 20px rgba(0, 0, 0, 0.1)' 
            : '0 1px 3px rgba(0, 0, 0, 0.1)'
        }}
        transition={{ duration: 0.2 }}
        className="relative"
      >
        <div className="flex items-center gap-3 bg-white hover:bg-gray-50 rounded-xl px-4 py-3 border border-gray-200 transition-all duration-200">
          <Sparkles className="w-5 h-5 text-emerald-500" />
          <input
            ref={inputRef}
            type="text"
            placeholder="Ask Bizzy anything... (⌘K)"
            value={query}
            onChange={(e) => setQuery(e.target.value)}
            onFocus={handleFocus}
            onBlur={handleBlur}
            className="flex-1 outline-none bg-transparent text-gray-700 placeholder-gray-500"
          />
          <div className="flex items-center gap-2">
            <button
              onClick={toggleVoice}
              className={`p-1.5 rounded-lg transition-all duration-200 ${
                isListening 
                  ? 'bg-red-100 text-red-600 animate-pulse' 
                  : 'hover:bg-gray-100 text-gray-400'
              }`}
            >
              <Mic className="w-4 h-4" />
            </button>
            <div className="flex gap-1">
              <kbd className="px-1.5 py-0.5 text-xs bg-gray-100 border rounded font-mono">
                <Command className="w-3 h-3 inline" />
              </kbd>
              <kbd className="px-1.5 py-0.5 text-xs bg-gray-100 border rounded font-mono">K</kbd>
            </div>
          </div>
        </div>
      </motion.div>

      {/* AI Responses Dropdown */}
      <AnimatePresence>
        {isActive && aiResponses.length > 0 && (
          <motion.div
            initial={{ opacity: 0, y: -10 }}
            animate={{ opacity: 1, y: 0 }}
            exit={{ opacity: 0, y: -10 }}
            transition={{ duration: 0.2 }}
            className="absolute top-full left-0 right-0 mt-2 bg-white rounded-xl shadow-lg border border-gray-200 z-50 overflow-hidden"
          >
            <div className="p-2">
              <div className="text-xs text-gray-500 px-3 py-2 font-medium">
                <Sparkles className="w-3 h-3 inline mr-1" />
                Bizzy suggests:
              </div>
              {aiResponses.map((response) => (
                <motion.div
                  key={response.id}
                  initial={{ opacity: 0 }}
                  animate={{ opacity: 1 }}
                  className="p-3 hover:bg-gray-50 rounded-lg cursor-pointer transition-colors"
                >
                  <div className="text-sm text-gray-900 mb-1">{response.response}</div>
                  <div className="text-xs text-gray-500">
                    {response.type === 'suggestion' ? '💡 Suggestion' : '📊 Data'}
                  </div>
                </motion.div>
              ))}
            </div>
          </motion.div>
        )}
      </AnimatePresence>
    </div>
  );
}