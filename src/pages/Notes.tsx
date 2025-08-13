import React, { useState } from 'react';
import { StickyNote, Search, Plus, Filter, Calendar, Tag } from 'lucide-react';
import { SmartCard } from '../components/ui/SmartCard';
import { EntityBadge } from '../components/ui/EntityBadge';
import { ViewTabs } from '../components/ui/ViewTabs';
import { EmptyState } from '../components/ui/EmptyState';

interface Note {
  id: string;
  title: string;
  content: string;
  date: string;
  tags: string[];
  field?: string;
  type: 'observation' | 'decision' | 'reminder' | 'meeting';
}

export function Notes() {
  const [searchQuery, setSearchQuery] = useState('');
  const [selectedFilter, setSelectedFilter] = useState('all');
  const [activeView, setActiveView] = useState('timeline');

  const notes: Note[] = [
    {
      id: '1',
      title: 'Aphid Scouting Results - NW14',
      content: 'Found low levels of aphids on south edge. Population below economic threshold but monitoring recommended. Weather conditions favorable for population growth.',
      date: '2024-01-15',
      tags: ['scouting', 'pest', 'monitoring'],
      field: 'NW14',
      type: 'observation'
    },
    {
      id: '2',
      title: 'Fertilizer Application Decision',
      content: 'Based on soil test results, decided to increase nitrogen application by 15 lbs/acre on NW14. Phosphorus levels adequate. Potassium excellent.',
      date: '2024-01-14',
      tags: ['fertilizer', 'soil-test', 'decision'],
      field: 'NW14',
      type: 'decision'
    },
    {
      id: '3',
      title: 'Equipment Maintenance Reminder',
      content: 'John Deere 9650 combine needs 250-hour service. Schedule with dealer for next week. Check concave clearance and rotor speed settings.',
      date: '2024-01-13',
      tags: ['equipment', 'maintenance', 'combine'],
      type: 'reminder'
    },
    {
      id: '4',
      title: 'Agronomist Meeting Notes',
      content: 'Discussed crop rotation strategy for 2025. Recommended adding cover crops to improve soil health. Consider cereal rye after canola harvest.',
      date: '2024-01-12',
      tags: ['agronomy', 'rotation', 'cover-crops'],
      type: 'meeting'
    }
  ];

  const filteredNotes = notes.filter(note => {
    const matchesSearch = note.title.toLowerCase().includes(searchQuery.toLowerCase()) ||
                         note.content.toLowerCase().includes(searchQuery.toLowerCase()) ||
                         note.tags.some(tag => tag.toLowerCase().includes(searchQuery.toLowerCase()));
    
    const matchesFilter = selectedFilter === 'all' || note.type === selectedFilter;
    
    return matchesSearch && matchesFilter;
  });

  const getTypeColor = (type: string) => {
    switch (type) {
      case 'observation': return 'bg-blue-100 text-blue-800';
      case 'decision': return 'bg-emerald-100 text-emerald-800';
      case 'reminder': return 'bg-amber-100 text-amber-800';
      case 'meeting': return 'bg-purple-100 text-purple-800';
      default: return 'bg-gray-100 text-gray-800';
    }
  };

  return (
    <div className="p-6">
      <div className="mb-6">
        <div className="flex items-center gap-3 mb-2">
          <StickyNote className="w-6 h-6 text-emerald-600" />
          <h1 className="text-2xl font-bold text-gray-900">Notes</h1>
        </div>
        <p className="text-gray-600">Capture and organize your farm observations and decisions</p>
      </div>

      {/* View Tabs */}
      <div className="mb-6">
        <ViewTabs activeView={activeView} onViewChange={setActiveView} />
      </div>

      <div className="flex gap-4 mb-6">
        <div className="flex-1 relative">
          <Search className="w-5 h-5 absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-400" />
          <input
            type="text"
            placeholder="Search notes..."
            value={searchQuery}
            onChange={(e) => setSearchQuery(e.target.value)}
            className="w-full pl-10 pr-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-emerald-500 focus:border-emerald-500"
          />
        </div>
        <select 
          value={selectedFilter}
          onChange={(e) => setSelectedFilter(e.target.value)}
          className="px-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-emerald-500 focus:border-emerald-500"
        >
          <option value="all">All Types</option>
          <option value="observation">Observations</option>
          <option value="decision">Decisions</option>
          <option value="reminder">Reminders</option>
          <option value="meeting">Meetings</option>
        </select>
        <button className="px-4 py-2 bg-emerald-600 text-white rounded-lg hover:bg-emerald-700 transition-colors flex items-center gap-2">
          <Plus className="w-4 h-4" />
          New Note
        </button>
      </div>

      {activeView === 'timeline' && (
        <div className="grid gap-4">
        {filteredNotes.map((note) => (
          <SmartCard key={note.id}>
            <div className="flex items-start justify-between mb-3">
              <div className="flex items-center gap-3">
                <span className={`px-2 py-1 rounded-md text-xs font-medium ${getTypeColor(note.type)}`}>
                  {note.type}
                </span>
                <div className="flex items-center gap-1 text-sm text-gray-500">
                  <Calendar className="w-4 h-4" />
                  {new Date(note.date).toLocaleDateString()}
                </div>
              </div>
              {note.field && <EntityBadge label={note.field} />}
            </div>
            
            <h3 className="font-semibold text-gray-900 mb-2">{note.title}</h3>
            <p className="text-gray-600 mb-4 leading-relaxed">{note.content}</p>
            
            <div className="flex items-center justify-between">
              <div className="flex items-center gap-2">
                <Tag className="w-4 h-4 text-gray-400" />
                <div className="flex gap-1 flex-wrap">
                  {note.tags.map((tag, index) => (
                    <span key={index} className="px-2 py-1 bg-gray-100 text-gray-600 text-xs rounded-md">
                      {tag}
                    </span>
                  ))}
                </div>
              </div>
              <button className="text-emerald-600 hover:text-emerald-700 text-sm font-medium">
                Edit →
              </button>
            </div>
          </SmartCard>
        ))}
        </div>
      )}

      {activeView === 'graph' && (
        <EmptyState
          title="Knowledge Graph View"
          description="Visualize connections between your notes, fields, and insights. This feature is coming soon!"
          actionLabel="Switch to Timeline"
          onAction={() => setActiveView('timeline')}
        />
      )}

      {activeView === 'focus' && (
        <EmptyState
          title="Focus Mode"
          description="Distraction-free writing and editing experience. Select a note to enter focus mode."
          actionLabel="Create New Note"
          onAction={() => console.log('Create note')}
        />
      )}

      {activeView === 'forge' && (
        <EmptyState
          title="Forge - AI Artifacts"
          description="Create interactive tools, calculators, and visual aids from your notes using AI."
          actionLabel="Start Forging"
          onAction={() => console.log('Start forge')}
        />
      )}

      {filteredNotes.length === 0 && (
        <EmptyState
          title="Start capturing your farm knowledge"
          description="Try voice note or quick add to get started! Bizzy can help you organize and connect your observations."
          actionLabel="Create First Note"
          onAction={() => console.log('Create note')}
        />
      )}
    </div>
  );
}