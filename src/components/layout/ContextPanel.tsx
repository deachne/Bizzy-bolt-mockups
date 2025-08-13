import React from 'react';
import { Bot, MapPin, Building, FileText, ExternalLink, CheckSquare } from 'lucide-react';
import { SmartCard } from '../ui/SmartCard';

interface RelatedEntity {
  id: string;
  name: string;
  description: string;
  icon: React.ReactNode;
  iconBg: string;
}

interface Document {
  id: string;
  name: string;
  icon: React.ReactNode;
  iconColor: string;
}

interface Task {
  id: string;
  text: string;
  completed: boolean;
}

export function ContextPanel() {
  const relatedEntities: RelatedEntity[] = [
    {
      id: '1',
      name: 'NW14',
      description: '160 acres • Spring Wheat',
      icon: <MapPin className="w-4 h-4" />,
      iconBg: 'bg-emerald-100 text-emerald-600'
    },
    {
      id: '2', 
      name: 'Nutrien',
      description: '12 quotes • 8 invoices',
      icon: <Building className="w-4 h-4" />,
      iconBg: 'bg-purple-100 text-purple-600'
    }
  ];

  const recentDocuments: Document[] = [
    {
      id: '1',
      name: 'JD_9650_Service_Manual.pdf',
      icon: <FileText className="w-4 h-4" />,
      iconColor: 'text-red-500'
    },
    {
      id: '2',
      name: '2025_Crop_Plan.xlsx', 
      icon: <FileText className="w-4 h-4" />,
      iconColor: 'text-emerald-600'
    },
    {
      id: '3',
      name: 'Herbicide_Label_Roundup.png',
      icon: <FileText className="w-4 h-4" />,
      iconColor: 'text-blue-500'
    }
  ];

  const [tasks, setTasks] = React.useState<Task[]>([
    { id: '1', text: 'Monitor NW14 aphids in 3 days', completed: false },
    { id: '2', text: 'Review fertilizer quotes', completed: false },
    { id: '3', text: 'Schedule tissue sampling', completed: true }
  ]);

  const toggleTask = (taskId: string) => {
    setTasks(prev => prev.map(task => 
      task.id === taskId ? { ...task, completed: !task.completed } : task
    ));
  };

  return (
    <aside className="w-80 bg-white border-l border-gray-200 p-6 overflow-y-auto">
      {/* AI Assistant */}
      <div className="mb-8">
        <h3 className="text-sm font-semibold text-gray-700 mb-4 flex items-center gap-2">
          <Bot className="w-4 h-4 text-emerald-600" />
          AI Insights
        </h3>
        <SmartCard className="bg-gradient-to-br from-blue-50 to-indigo-50 border-blue-100">
          <p className="text-blue-900 mb-3 font-medium text-sm">Based on your soil tests and weather forecast:</p>
          <ul className="text-blue-800 space-y-2 text-sm">
            {[
              'Consider increasing N application on NW14 by 15 lbs/ac',
              'Good spray window coming Thursday-Friday', 
              '3 fields due for tissue sampling this week'
            ].map((insight, index) => (
              <li key={index} className="flex items-start gap-2">
                <div className="w-1.5 h-1.5 bg-blue-400 rounded-full mt-2 flex-shrink-0"></div>
                <span>{insight}</span>
              </li>
            ))}
          </ul>
        </SmartCard>
      </div>
      
      {/* Related Entities */}
      <div className="mb-8">
        <h3 className="text-sm font-semibold text-gray-700 mb-4">Related Entities</h3>
        <div className="space-y-3">
          {relatedEntities.map((entity) => (
            <div 
              key={entity.id}
              className="flex items-center gap-3 p-3 hover:bg-gray-50 rounded-lg transition-all duration-200 cursor-pointer group"
            >
              <div className={`w-10 h-10 ${entity.iconBg} rounded-lg flex items-center justify-center group-hover:scale-105 transition-transform`}>
                {entity.icon}
              </div>
              <div className="flex-1">
                <div className="text-sm font-medium text-gray-900 group-hover:text-emerald-600 transition-colors">
                  {entity.name}
                </div>
                <div className="text-xs text-gray-500">{entity.description}</div>
              </div>
              <ExternalLink className="w-3 h-3 text-gray-400 opacity-0 group-hover:opacity-100 transition-opacity" />
            </div>
          ))}
        </div>
      </div>
      
      {/* Recent Documents */}
      <div className="mb-8">
        <h3 className="text-sm font-semibold text-gray-700 mb-4">Recent Documents</h3>
        <div className="space-y-2">
          {recentDocuments.map((doc) => (
            <div 
              key={doc.id}
              className="flex items-center gap-3 p-2 hover:bg-gray-50 rounded-lg transition-all duration-200 cursor-pointer group"
            >
              <div className={doc.iconColor}>
                {doc.icon}
              </div>
              <span className="flex-1 text-sm text-gray-700 group-hover:text-gray-900 transition-colors truncate">
                {doc.name}
              </span>
              <ExternalLink className="w-3 h-3 text-gray-400 opacity-0 group-hover:opacity-100 transition-opacity" />
            </div>
          ))}
        </div>
      </div>
      
      {/* Quick Tasks */}
      <div>
        <h3 className="text-sm font-semibold text-gray-700 mb-4">Tasks from Notes</h3>
        <div className="space-y-2">
          {tasks.map((task) => (
            <label 
              key={task.id}
              className="flex items-start gap-3 p-2 hover:bg-gray-50 rounded-lg cursor-pointer transition-all duration-200 group"
            >
              <div className="relative mt-0.5">
                <input 
                  type="checkbox" 
                  checked={task.completed}
                  onChange={() => toggleTask(task.id)}
                  className="w-4 h-4 text-emerald-600 rounded border-gray-300 focus:ring-emerald-500 focus:ring-2"
                />
                {task.completed && (
                  <CheckSquare className="w-4 h-4 text-emerald-600 absolute inset-0 pointer-events-none" />
                )}
              </div>
              <span className={`text-sm transition-colors flex-1 ${
                task.completed 
                  ? 'text-gray-500 line-through' 
                  : 'text-gray-700 group-hover:text-gray-900'
              }`}>
                {task.text}
              </span>
            </label>
          ))}
        </div>
      </div>
    </aside>
  );
}