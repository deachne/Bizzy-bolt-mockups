import React, { useState } from 'react';
import { X, Send, Sparkles, Clock, TrendingUp, MapPin } from 'lucide-react';
import { motion, AnimatePresence } from 'framer-motion';

interface BizzyAssistantProps {
  isOpen: boolean;
  onClose: () => void;
}

interface Message {
  id: string;
  type: 'user' | 'assistant';
  content: string;
  timestamp: Date;
}

interface RecentAction {
  id: string;
  action: string;
  context: string;
  time: string;
}

interface SuggestedAction {
  id: string;
  title: string;
  description: string;
  icon: React.ReactNode;
}

export function BizzyAssistant({ isOpen, onClose }: BizzyAssistantProps) {
  const [messages, setMessages] = useState<Message[]>([
    {
      id: '1',
      type: 'assistant',
      content: "Hi! I'm Bizzy, your farm management assistant. I can help you with field notes, weather insights, crop planning, and more. What would you like to know?",
      timestamp: new Date()
    }
  ]);
  const [inputValue, setInputValue] = useState('');

  const recentActions: RecentAction[] = [
    { id: '1', action: 'Viewed NW14 field notes', context: 'Aphid scouting results', time: '2 min ago' },
    { id: '2', action: 'Received Nutrien quote', context: 'UAN fertilizer pricing', time: '1 hour ago' },
    { id: '3', action: 'Updated crop plan', context: 'Spring wheat rotation', time: '3 hours ago' }
  ];

  const suggestedActions: SuggestedAction[] = [
    {
      id: '1',
      title: 'Schedule field scouting',
      description: 'Based on weather forecast',
      icon: <MapPin className="w-4 h-4" />
    },
    {
      id: '2',
      title: 'Review fertilizer quotes',
      description: '3 pending quotes to compare',
      icon: <TrendingUp className="w-4 h-4" />
    },
    {
      id: '3',
      title: 'Update spray records',
      description: 'Recent applications need logging',
      icon: <Clock className="w-4 h-4" />
    }
  ];

  const handleSendMessage = () => {
    if (!inputValue.trim()) return;

    const userMessage: Message = {
      id: Date.now().toString(),
      type: 'user',
      content: inputValue,
      timestamp: new Date()
    };

    setMessages(prev => [...prev, userMessage]);
    setInputValue('');

    // Simulate AI response
    setTimeout(() => {
      const aiResponse: Message = {
        id: (Date.now() + 1).toString(),
        type: 'assistant',
        content: `I understand you're asking about "${inputValue}". Let me help you with that. Based on your recent activity, I can provide insights about your fields, weather conditions, and upcoming tasks.`,
        timestamp: new Date()
      };
      setMessages(prev => [...prev, aiResponse]);
    }, 1000);
  };

  const handleKeyPress = (e: React.KeyboardEvent) => {
    if (e.key === 'Enter' && !e.shiftKey) {
      e.preventDefault();
      handleSendMessage();
    }
  };

  return (
    <AnimatePresence>
      {isOpen && (
        <motion.div
          initial={{ x: '100%', opacity: 0 }}
          animate={{ x: 0, opacity: 1 }}
          exit={{ x: '100%', opacity: 0 }}
          transition={{ type: 'spring', damping: 25, stiffness: 200 }}
          className="fixed right-0 top-0 h-full w-96 bg-white shadow-2xl border-l border-gray-200 z-50 flex flex-col"
        >
          {/* Header */}
          <div className="p-4 border-b border-gray-200 bg-gradient-to-r from-emerald-50 to-emerald-100">
            <div className="flex items-center justify-between">
              <div className="flex items-center gap-3">
                <div className="w-8 h-8 bg-emerald-600 rounded-full flex items-center justify-center">
                  <Sparkles className="w-4 h-4 text-white" />
                </div>
                <div>
                  <h3 className="font-semibold text-gray-900">🤖 Bizzy Assistant</h3>
                  <p className="text-xs text-emerald-700">Always here to help</p>
                </div>
              </div>
              <button
                onClick={onClose}
                className="p-1 hover:bg-emerald-200 rounded-lg transition-colors"
              >
                <X className="w-5 h-5 text-gray-600" />
              </button>
            </div>
          </div>

          {/* Recent Context */}
          <div className="p-4 border-b border-gray-100">
            <h4 className="text-sm font-semibold text-gray-700 mb-3">Recent Context</h4>
            <div className="space-y-2">
              {recentActions.map((action) => (
                <div key={action.id} className="text-xs bg-gray-50 rounded-lg p-2">
                  <div className="font-medium text-gray-900">{action.action}</div>
                  <div className="text-gray-500">{action.context} • {action.time}</div>
                </div>
              ))}
            </div>
          </div>

          {/* Suggested Actions */}
          <div className="p-4 border-b border-gray-100">
            <h4 className="text-sm font-semibold text-gray-700 mb-3">Suggested Actions</h4>
            <div className="space-y-2">
              {suggestedActions.map((action) => (
                <button
                  key={action.id}
                  className="w-full text-left p-3 bg-gray-50 hover:bg-gray-100 rounded-lg transition-colors"
                >
                  <div className="flex items-start gap-3">
                    <div className="text-emerald-600 mt-0.5">{action.icon}</div>
                    <div>
                      <div className="text-sm font-medium text-gray-900">{action.title}</div>
                      <div className="text-xs text-gray-500">{action.description}</div>
                    </div>
                  </div>
                </button>
              ))}
            </div>
          </div>

          {/* Messages */}
          <div className="flex-1 overflow-y-auto p-4 space-y-4">
            {messages.map((message) => (
              <div
                key={message.id}
                className={`flex ${message.type === 'user' ? 'justify-end' : 'justify-start'}`}
              >
                <div
                  className={`max-w-[80%] p-3 rounded-lg ${
                    message.type === 'user'
                      ? 'bg-emerald-600 text-white'
                      : 'bg-gray-100 text-gray-900'
                  }`}
                >
                  <div className="text-sm">{message.content}</div>
                  <div
                    className={`text-xs mt-1 ${
                      message.type === 'user' ? 'text-emerald-100' : 'text-gray-500'
                    }`}
                  >
                    {message.timestamp.toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' })}
                  </div>
                </div>
              </div>
            ))}
          </div>

          {/* Input */}
          <div className="p-4 border-t border-gray-200">
            <div className="flex gap-2">
              <input
                type="text"
                value={inputValue}
                onChange={(e) => setInputValue(e.target.value)}
                onKeyPress={handleKeyPress}
                placeholder="Ask Bizzy anything..."
                className="flex-1 p-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-emerald-500 focus:border-emerald-500 text-sm"
              />
              <button
                onClick={handleSendMessage}
                disabled={!inputValue.trim()}
                className="p-3 bg-emerald-600 text-white rounded-lg hover:bg-emerald-700 disabled:opacity-50 disabled:cursor-not-allowed transition-colors"
              >
                <Send className="w-4 h-4" />
              </button>
            </div>
          </div>
        </motion.div>
      )}
    </AnimatePresence>
  );
}