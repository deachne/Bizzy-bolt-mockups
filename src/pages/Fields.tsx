import React, { useState } from 'react';
import { Map, MapPin, Scaling as Seedling, BarChart3, Calendar, Thermometer } from 'lucide-react';
import { SmartCard } from '../components/ui/SmartCard';
import { EntityBadge } from '../components/ui/EntityBadge';

interface Field {
  id: string;
  name: string;
  acres: number;
  crop: string;
  variety?: string;
  plantingDate?: string;
  soilType: string;
  lastActivity: string;
  status: 'planted' | 'growing' | 'ready' | 'harvested';
  notes: string;
  coordinates?: { lat: number; lng: number };
}

export function Fields() {
  const [selectedField, setSelectedField] = useState<string | null>(null);

  const fields: Field[] = [
    {
      id: '1',
      name: 'NW14',
      acres: 160,
      crop: 'Spring Wheat',
      variety: 'AAC Brandon',
      plantingDate: '2024-05-15',
      soilType: 'Clay Loam',
      lastActivity: 'Herbicide Application',
      status: 'growing',
      notes: 'Monitoring aphid levels. Population below threshold but increasing.',
      coordinates: { lat: 52.1579, lng: -106.6702 }
    },
    {
      id: '2',
      name: 'SW22',
      acres: 240,
      crop: 'Canola',
      variety: 'InVigor L140P',
      plantingDate: '2024-05-20',
      soilType: 'Sandy Loam',
      lastActivity: 'Fungicide Application',
      status: 'growing',
      notes: 'Excellent stand establishment. Considering tissue sampling.',
      coordinates: { lat: 52.1456, lng: -106.6890 }
    },
    {
      id: '3',
      name: 'SE18',
      acres: 180,
      crop: 'Barley',
      variety: 'AC Metcalfe',
      plantingDate: '2024-05-10',
      soilType: 'Loam',
      lastActivity: 'Seeding',
      status: 'planted',
      notes: 'Recently seeded. Waiting for emergence.',
      coordinates: { lat: 52.1234, lng: -106.6543 }
    },
    {
      id: '4',
      name: 'NE25',
      acres: 200,
      crop: 'Peas',
      variety: 'CDC Amarillo',
      plantingDate: '2024-05-05',
      soilType: 'Clay',
      lastActivity: 'Pre-emergent Herbicide',
      status: 'growing',
      notes: 'Good nodulation observed. No disease pressure yet.',
      coordinates: { lat: 52.1678, lng: -106.6321 }
    }
  ];

  const getStatusColor = (status: string) => {
    switch (status) {
      case 'planted': return 'bg-blue-100 text-blue-800';
      case 'growing': return 'bg-emerald-100 text-emerald-800';
      case 'ready': return 'bg-amber-100 text-amber-800';
      case 'harvested': return 'bg-gray-100 text-gray-800';
      default: return 'bg-gray-100 text-gray-800';
    }
  };

  const getCropColor = (crop: string) => {
    switch (crop.toLowerCase()) {
      case 'spring wheat': return 'variant-secondary' as const;
      case 'canola': return 'variant-warning' as const;
      case 'barley': return 'variant-accent' as const;
      case 'peas': return 'variant-primary' as const;
      default: return 'variant-primary' as const;
    }
  };

  const totalAcres = fields.reduce((sum, field) => sum + field.acres, 0);

  return (
    <div className="p-6">
      <div className="mb-6">
        <div className="flex items-center gap-3 mb-2">
          <Map className="w-6 h-6 text-emerald-600" />
          <h1 className="text-2xl font-bold text-gray-900">Fields</h1>
        </div>
        <p className="text-gray-600">Manage and monitor all your field operations</p>
      </div>

      {/* Summary Cards */}
      <div className="grid grid-cols-1 md:grid-cols-4 gap-4 mb-6">
        <SmartCard className="text-center">
          <div className="text-2xl font-bold text-emerald-600 mb-1">{fields.length}</div>
          <div className="text-sm text-gray-600">Total Fields</div>
        </SmartCard>
        <SmartCard className="text-center">
          <div className="text-2xl font-bold text-emerald-600 mb-1">{totalAcres.toLocaleString()}</div>
          <div className="text-sm text-gray-600">Total Acres</div>
        </SmartCard>
        <SmartCard className="text-center">
          <div className="text-2xl font-bold text-emerald-600 mb-1">
            {fields.filter(f => f.status === 'growing').length}
          </div>
          <div className="text-sm text-gray-600">Growing</div>
        </SmartCard>
        <SmartCard className="text-center">
          <div className="text-2xl font-bold text-emerald-600 mb-1">
            {Math.round(totalAcres / fields.length)}
          </div>
          <div className="text-sm text-gray-600">Avg. Field Size</div>
        </SmartCard>
      </div>

      {/* Fields Grid */}
      <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
        {fields.map((field) => (
          <SmartCard 
            key={field.id}
            className={selectedField === field.id ? 'border-emerald-500 bg-emerald-50' : ''}
            onClick={() => setSelectedField(selectedField === field.id ? null : field.id)}
          >
            <div className="flex items-start justify-between mb-4">
              <div className="flex items-center gap-3">
                <div className="w-12 h-12 bg-emerald-100 rounded-lg flex items-center justify-center">
                  <MapPin className="w-6 h-6 text-emerald-600" />
                </div>
                <div>
                  <h3 className="text-lg font-semibold text-gray-900">{field.name}</h3>
                  <p className="text-sm text-gray-500">{field.acres} acres • {field.soilType}</p>
                </div>
              </div>
              <div className="flex flex-col items-end gap-2">
                <EntityBadge label={field.crop} variant={getCropColor(field.crop)} />
                <span className={`px-2 py-1 rounded-md text-xs font-medium ${getStatusColor(field.status)}`}>
                  {field.status}
                </span>
              </div>
            </div>

            <div className="grid grid-cols-2 gap-4 mb-4">
              <div>
                <div className="text-xs text-gray-500 mb-1">Variety</div>
                <div className="text-sm font-medium text-gray-900">{field.variety || 'N/A'}</div>
              </div>
              <div>
                <div className="text-xs text-gray-500 mb-1">Planted</div>
                <div className="text-sm font-medium text-gray-900">
                  {field.plantingDate ? new Date(field.plantingDate).toLocaleDateString() : 'N/A'}
                </div>
              </div>
            </div>

            <div className="mb-4">
              <div className="text-xs text-gray-500 mb-1">Last Activity</div>
              <div className="text-sm font-medium text-gray-900">{field.lastActivity}</div>
            </div>

            <div className="mb-4">
              <div className="text-xs text-gray-500 mb-1">Notes</div>
              <p className="text-sm text-gray-700">{field.notes}</p>
            </div>

            {selectedField === field.id && (
              <div className="border-t pt-4 mt-4">
                <div className="grid grid-cols-3 gap-4">
                  <button className="flex flex-col items-center gap-2 p-3 bg-white rounded-lg hover:bg-gray-50 transition-colors">
                    <Seedling className="w-5 h-5 text-emerald-600" />
                    <span className="text-xs font-medium">Scout</span>
                  </button>
                  <button className="flex flex-col items-center gap-2 p-3 bg-white rounded-lg hover:bg-gray-50 transition-colors">
                    <BarChart3 className="w-5 h-5 text-blue-600" />
                    <span className="text-xs font-medium">Analytics</span>
                  </button>
                  <button className="flex flex-col items-center gap-2 p-3 bg-white rounded-lg hover:bg-gray-50 transition-colors">
                    <Calendar className="w-5 h-5 text-purple-600" />
                    <span className="text-xs font-medium">Schedule</span>
                  </button>
                </div>
              </div>
            )}
          </SmartCard>
        ))}
      </div>
    </div>
  );
}