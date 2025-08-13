import React, { useState } from 'react';
import { Palette, Plus, Save, Download, Layers, Square, Circle, Type, Pen } from 'lucide-react';
import { SmartCard } from '../components/ui/SmartCard';

interface CanvasProject {
  id: string;
  name: string;
  description: string;
  lastModified: string;
  thumbnail: string;
  type: 'field-map' | 'diagram' | 'sketch' | 'plan';
}

export function Canvas() {
  const [selectedTool, setSelectedTool] = useState('pen');

  const projects: CanvasProject[] = [
    {
      id: '1',
      name: 'Field Layout 2025',
      description: 'Crop rotation planning diagram with field boundaries',
      lastModified: '2024-01-15',
      thumbnail: 'https://images.pexels.com/photos/1595104/pexels-photo-1595104.jpeg?auto=compress&cs=tinysrgb&w=300&h=200&dpr=1',
      type: 'field-map'
    },
    {
      id: '2',
      name: 'Irrigation System Design',
      description: 'Sprinkler system layout for SW22 field',
      lastModified: '2024-01-12',
      thumbnail: 'https://images.pexels.com/photos/2132227/pexels-photo-2132227.jpeg?auto=compress&cs=tinysrgb&w=300&h=200&dpr=1',
      type: 'diagram'
    },
    {
      id: '3',
      name: 'Equipment Shed Layout',
      description: 'Storage optimization plan for machinery',
      lastModified: '2024-01-10',
      thumbnail: 'https://images.pexels.com/photos/1595104/pexels-photo-1595104.jpeg?auto=compress&cs=tinysrgb&w=300&h=200&dpr=1',
      type: 'plan'
    }
  ];

  const tools = [
    { id: 'pen', icon: Pen, label: 'Pen' },
    { id: 'rectangle', icon: Square, label: 'Rectangle' },
    { id: 'circle', icon: Circle, label: 'Circle' },
    { id: 'text', icon: Type, label: 'Text' }
  ];

  const getTypeColor = (type: string) => {
    switch (type) {
      case 'field-map': return 'bg-emerald-100 text-emerald-800';
      case 'diagram': return 'bg-blue-100 text-blue-800';
      case 'sketch': return 'bg-purple-100 text-purple-800';
      case 'plan': return 'bg-amber-100 text-amber-800';
      default: return 'bg-gray-100 text-gray-800';
    }
  };

  return (
    <div className="p-6">
      <div className="mb-6">
        <div className="flex items-center justify-between">
          <div>
            <div className="flex items-center gap-3 mb-2">
              <Palette className="w-6 h-6 text-emerald-600" />
              <h1 className="text-2xl font-bold text-gray-900">Canvas</h1>
            </div>
            <p className="text-gray-600">Create visual plans, diagrams, and field layouts</p>
          </div>
          <button className="px-4 py-2 bg-emerald-600 text-white rounded-lg hover:bg-emerald-700 transition-colors flex items-center gap-2">
            <Plus className="w-4 h-4" />
            New Canvas
          </button>
        </div>
      </div>

      {/* Canvas Workspace */}
      <div className="grid grid-cols-1 lg:grid-cols-4 gap-6 mb-6">
        {/* Tools Panel */}
        <div className="lg:col-span-1">
          <SmartCard>
            <h3 className="text-lg font-semibold text-gray-900 mb-4">Tools</h3>
            <div className="space-y-2">
              {tools.map((tool) => (
                <button
                  key={tool.id}
                  onClick={() => setSelectedTool(tool.id)}
                  className={`w-full flex items-center gap-3 p-3 rounded-lg transition-colors ${
                    selectedTool === tool.id 
                      ? 'bg-emerald-100 text-emerald-700 border border-emerald-200' 
                      : 'hover:bg-gray-100 text-gray-700'
                  }`}
                >
                  <tool.icon className="w-5 h-5" />
                  <span className="text-sm font-medium">{tool.label}</span>
                </button>
              ))}
            </div>

            <div className="mt-6 pt-6 border-t border-gray-200">
              <h4 className="text-sm font-semibold text-gray-700 mb-3">Layers</h4>
              <div className="space-y-2">
                <div className="flex items-center justify-between p-2 bg-emerald-50 rounded-lg">
                  <div className="flex items-center gap-2">
                    <Layers className="w-4 h-4 text-emerald-600" />
                    <span className="text-sm font-medium text-emerald-700">Field Boundaries</span>
                  </div>
                  <input type="checkbox" checked className="text-emerald-600" />
                </div>
                <div className="flex items-center justify-between p-2 hover:bg-gray-50 rounded-lg">
                  <div className="flex items-center gap-2">
                    <Layers className="w-4 h-4 text-gray-400" />
                    <span className="text-sm text-gray-600">Crop Areas</span>
                  </div>
                  <input type="checkbox" />
                </div>
                <div className="flex items-center justify-between p-2 hover:bg-gray-50 rounded-lg">
                  <div className="flex items-center gap-2">
                    <Layers className="w-4 h-4 text-gray-400" />
                    <span className="text-sm text-gray-600">Equipment Paths</span>
                  </div>
                  <input type="checkbox" />
                </div>
              </div>
            </div>
          </SmartCard>
        </div>

        {/* Canvas Area */}
        <div className="lg:col-span-3">
          <SmartCard className="h-96">
            <div className="flex items-center justify-between mb-4">
              <h3 className="text-lg font-semibold text-gray-900">Canvas Workspace</h3>
              <div className="flex gap-2">
                <button className="px-3 py-1 bg-gray-100 text-gray-700 rounded-lg hover:bg-gray-200 transition-colors text-sm flex items-center gap-1">
                  <Save className="w-4 h-4" />
                  Save
                </button>
                <button className="px-3 py-1 bg-gray-100 text-gray-700 rounded-lg hover:bg-gray-200 transition-colors text-sm flex items-center gap-1">
                  <Download className="w-4 h-4" />
                  Export
                </button>
              </div>
            </div>
            
            {/* Canvas Drawing Area */}
            <div className="w-full h-full bg-gray-50 rounded-lg border-2 border-dashed border-gray-300 flex items-center justify-center">
              <div className="text-center text-gray-500">
                <Palette className="w-12 h-12 mx-auto mb-2 text-gray-300" />
                <p className="text-sm">Select a tool and start drawing</p>
                <p className="text-xs text-gray-400 mt-1">Click and drag to create shapes and diagrams</p>
              </div>
            </div>
          </SmartCard>
        </div>
      </div>

      {/* Recent Projects */}
      <div>
        <h3 className="text-lg font-semibold text-gray-900 mb-4">Recent Projects</h3>
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
          {projects.map((project) => (
            <SmartCard key={project.id}>
              <div className="aspect-video bg-gray-100 rounded-lg mb-3 overflow-hidden">
                <img 
                  src={project.thumbnail} 
                  alt={project.name}
                  className="w-full h-full object-cover"
                />
              </div>
              
              <div className="flex items-start justify-between mb-2">
                <h4 className="font-semibold text-gray-900">{project.name}</h4>
                <span className={`px-2 py-1 rounded-md text-xs font-medium ${getTypeColor(project.type)}`}>
                  {project.type}
                </span>
              </div>
              
              <p className="text-sm text-gray-600 mb-3">{project.description}</p>
              
              <div className="flex items-center justify-between text-xs text-gray-500">
                <span>Modified {new Date(project.lastModified).toLocaleDateString()}</span>
                <button className="text-emerald-600 hover:text-emerald-700 font-medium">
                  Open →
                </button>
              </div>
            </SmartCard>
          ))}
        </div>
      </div>
    </div>
  );
}