import React, { useState } from 'react';
import { Inbox as InboxIcon, Clock, User, MapPin, AlertCircle, CheckCircle2, Archive } from 'lucide-react';
import { SmartCard } from '../components/ui/SmartCard';
import { EntityBadge } from '../components/ui/EntityBadge';

interface InboxItem {
  id: string;
  type: 'task' | 'notification' | 'approval' | 'alert';
  title: string;
  description: string;
  timestamp: string;
  priority: 'high' | 'medium' | 'low';
  from?: string;
  field?: string;
  isRead: boolean;
}

export function Inbox() {
  const [items, setItems] = useState<InboxItem[]>([
    {
      id: '1',
      type: 'alert',
      title: 'Weather Alert: High Winds Expected',
      description: 'Wind speeds of 25-30 mph expected tomorrow. Consider postponing spray applications.',
      timestamp: '2 hours ago',
      priority: 'high',
      isRead: false
    },
    {
      id: '2',
      type: 'task',
      title: 'Soil Test Results Ready',
      description: 'A&L Labs has completed soil analysis for NW14 and SW22. Review recommended.',
      timestamp: '4 hours ago',
      priority: 'medium',
      from: 'A&L Labs',
      field: 'NW14, SW22',
      isRead: false
    },
    {
      id: '3',
      type: 'approval',
      title: 'Fertilizer Purchase Order Approval',
      description: 'Purchase order #2024-156 for $12,450 requires your approval.',
      timestamp: '1 day ago',
      priority: 'medium',
      from: 'Nutrien',
      isRead: true
    },
    {
      id: '4',
      type: 'notification',
      title: 'Equipment Maintenance Due',
      description: 'John Deere 9650 combine is due for 250-hour service in 15 hours.',
      timestamp: '2 days ago',
      priority: 'low',
      isRead: true
    }
  ]);

  const markAsRead = (id: string) => {
    setItems(items.map(item => 
      item.id === id ? { ...item, isRead: true } : item
    ));
  };

  const archiveItem = (id: string) => {
    setItems(items.filter(item => item.id !== id));
  };

  const getTypeIcon = (type: string) => {
    switch (type) {
      case 'alert': return <AlertCircle className="w-5 h-5 text-red-600" />;
      case 'task': return <CheckCircle2 className="w-5 h-5 text-blue-600" />;
      case 'approval': return <User className="w-5 h-5 text-amber-600" />;
      case 'notification': return <InboxIcon className="w-5 h-5 text-gray-600" />;
      default: return <InboxIcon className="w-5 h-5 text-gray-600" />;
    }
  };

  const getPriorityColor = (priority: string) => {
    switch (priority) {
      case 'high': return 'border-l-red-500';
      case 'medium': return 'border-l-amber-500';
      case 'low': return 'border-l-green-500';
      default: return 'border-l-gray-300';
    }
  };

  const unreadCount = items.filter(item => !item.isRead).length;

  return (
    <div className="p-6">
      <div className="mb-6">
        <div className="flex items-center gap-3 mb-2">
          <InboxIcon className="w-6 h-6 text-emerald-600" />
          <h1 className="text-2xl font-bold text-gray-900">Inbox</h1>
          {unreadCount > 0 && (
            <span className="bg-emerald-600 text-white text-sm px-2 py-1 rounded-full font-medium">
              {unreadCount}
            </span>
          )}
        </div>
        <p className="text-gray-600">Stay on top of important farm notifications and tasks</p>
      </div>

      <div className="flex gap-4 mb-6">
        <button className="px-4 py-2 bg-emerald-600 text-white rounded-lg hover:bg-emerald-700 transition-colors">
          All Items
        </button>
        <button className="px-4 py-2 bg-gray-100 text-gray-700 rounded-lg hover:bg-gray-200 transition-colors">
          Unread ({unreadCount})
        </button>
        <button className="px-4 py-2 bg-gray-100 text-gray-700 rounded-lg hover:bg-gray-200 transition-colors">
          High Priority
        </button>
      </div>

      <div className="space-y-4">
        {items.map((item) => (
          <SmartCard 
            key={item.id} 
            className={`border-l-4 ${getPriorityColor(item.priority)} ${!item.isRead ? 'bg-blue-50' : ''}`}
          >
            <div className="flex items-start justify-between">
              <div className="flex items-start gap-4 flex-1">
                <div className="mt-1">
                  {getTypeIcon(item.type)}
                </div>
                <div className="flex-1">
                  <div className="flex items-center gap-2 mb-2">
                    <h3 className={`font-semibold ${!item.isRead ? 'text-gray-900' : 'text-gray-700'}`}>
                      {item.title}
                    </h3>
                    {!item.isRead && (
                      <div className="w-2 h-2 bg-blue-500 rounded-full"></div>
                    )}
                  </div>
                  <p className="text-gray-600 mb-3">{item.description}</p>
                  <div className="flex items-center gap-4 text-sm text-gray-500">
                    <div className="flex items-center gap-1">
                      <Clock className="w-4 h-4" />
                      {item.timestamp}
                    </div>
                    {item.from && (
                      <div className="flex items-center gap-1">
                        <User className="w-4 h-4" />
                        {item.from}
                      </div>
                    )}
                    {item.field && (
                      <div className="flex items-center gap-1">
                        <MapPin className="w-4 h-4" />
                        <EntityBadge label={item.field} />
                      </div>
                    )}
                  </div>
                </div>
              </div>
              <div className="flex items-center gap-2">
                {!item.isRead && (
                  <button 
                    onClick={() => markAsRead(item.id)}
                    className="text-blue-600 hover:text-blue-700 text-sm font-medium"
                  >
                    Mark Read
                  </button>
                )}
                <button 
                  onClick={() => archiveItem(item.id)}
                  className="text-gray-400 hover:text-gray-600 p-1"
                >
                  <Archive className="w-4 h-4" />
                </button>
              </div>
            </div>
          </SmartCard>
        ))}
      </div>
    </div>
  );
}