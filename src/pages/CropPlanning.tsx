import React, { useState } from 'react';
import { Scaling as Seedling, Calendar, TrendingUp, MapPin, BarChart3 } from 'lucide-react';
import { SmartCard } from '../components/ui/SmartCard';
import { EntityBadge } from '../components/ui/EntityBadge';

interface CropPlan {
  id: string;
  field: string;
  acres: number;
  crop: string;
  variety: string;
  plantingWindow: string;
  expectedYield: number;
  breakEvenPrice: number;
  rotationYear: number;
  previousCrop: string;
  notes: string;
}

export function CropPlanning() {
  const [selectedYear, setSelectedYear] = useState('2025');

  const cropPlans: CropPlan[] = [
    {
      id: '1',
      field: 'NW14',
      acres: 160,
      crop: 'Canola',
      variety: 'InVigor L233P',
      plantingWindow: 'May 10-20',
      expectedYield: 45,
      breakEvenPrice: 14.50,
      rotationYear: 1,
      previousCrop: 'Spring Wheat',
      notes: 'Switch to canola for disease break. High yield potential field.'
    },
    {
      id: '2',
      field: 'SW22',
      acres: 240,
      crop: 'Spring Wheat',
      variety: 'AAC Brandon',
      plantingWindow: 'May 5-15',
      expectedYield: 65,
      breakEvenPrice: 8.25,
      rotationYear: 2,
      previousCrop: 'Canola',
      notes: 'Excellent wheat field. Consider protein premium varieties.'
    },
    {
      id: '3',
      field: 'SE18',
      acres: 180,
      crop: 'Peas',
      variety: 'CDC Amarillo',
      plantingWindow: 'May 1-10',
      expectedYield: 50,
      breakEvenPrice: 11.00,
      rotationYear: 1,
      previousCrop: 'Barley',
      notes: 'Add nitrogen fixation to rotation. Good pea ground.'
    },
    {
      id: '4',
      field: 'NE25',
      acres: 200,
      crop: 'Barley',
      variety: 'AC Metcalfe',
      plantingWindow: 'May 8-18',
      expectedYield: 80,
      breakEvenPrice: 6.75,
      rotationYear: 3,
      previousCrop: 'Peas',
      notes: 'Malt barley contract opportunity. Premium potential.'
    }
  ];

  const getCropColor = (crop: string) => {
    switch (crop.toLowerCase()) {
      case 'spring wheat': return 'variant-secondary' as const;
      case 'canola': return 'variant-warning' as const;
      case 'barley': return 'variant-accent' as const;
      case 'peas': return 'variant-primary' as const;
      default: return 'variant-primary' as const;
    }
  };

  const totalAcres = cropPlans.reduce((sum, plan) => sum + plan.acres, 0);
  const avgYield = cropPlans.reduce((sum, plan) => sum + plan.expectedYield, 0) / cropPlans.length;

  return (
    <div className="p-6">
      <div className="mb-6">
        <div className="flex items-center justify-between">
          <div>
            <div className="flex items-center gap-3 mb-2">
              <Seedling className="w-6 h-6 text-emerald-600" />
              <h1 className="text-2xl font-bold text-gray-900">Crop Planning</h1>
            </div>
            <p className="text-gray-600">Plan and optimize your crop rotation strategy</p>
          </div>
          <select 
            value={selectedYear}
            onChange={(e) => setSelectedYear(e.target.value)}
            className="px-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-emerald-500 focus:border-emerald-500"
          >
            <option value="2024">2024 Season</option>
            <option value="2025">2025 Season</option>
            <option value="2026">2026 Season</option>
          </select>
        </div>
      </div>

      {/* Summary Cards */}
      <div className="grid grid-cols-1 md:grid-cols-4 gap-4 mb-6">
        <SmartCard className="text-center">
          <div className="text-2xl font-bold text-emerald-600 mb-1">{totalAcres.toLocaleString()}</div>
          <div className="text-sm text-gray-600">Total Planned Acres</div>
        </SmartCard>
        <SmartCard className="text-center">
          <div className="text-2xl font-bold text-emerald-600 mb-1">{cropPlans.length}</div>
          <div className="text-sm text-gray-600">Crop Types</div>
        </SmartCard>
        <SmartCard className="text-center">
          <div className="text-2xl font-bold text-emerald-600 mb-1">{avgYield.toFixed(1)}</div>
          <div className="text-sm text-gray-600">Avg. Expected Yield</div>
        </SmartCard>
        <SmartCard className="text-center">
          <div className="text-2xl font-bold text-emerald-600 mb-1">
            ${(cropPlans.reduce((sum, plan) => sum + (plan.expectedYield * plan.breakEvenPrice * plan.acres), 0) / 1000).toFixed(0)}K
          </div>
          <div className="text-sm text-gray-600">Est. Revenue</div>
        </SmartCard>
      </div>

      {/* Crop Distribution */}
      <div className="mb-6">
        <SmartCard>
          <h3 className="text-lg font-semibold text-gray-900 mb-4">Crop Distribution</h3>
          <div className="grid grid-cols-2 md:grid-cols-4 gap-4">
            {Object.entries(
              cropPlans.reduce((acc, plan) => {
                acc[plan.crop] = (acc[plan.crop] || 0) + plan.acres;
                return acc;
              }, {} as Record<string, number>)
            ).map(([crop, acres]) => (
              <div key={crop} className="text-center">
                <div className="text-xl font-bold text-gray-900 mb-1">{acres}</div>
                <div className="text-sm text-gray-600 mb-2">acres</div>
                <EntityBadge label={crop} variant={getCropColor(crop)} />
              </div>
            ))}
          </div>
        </SmartCard>
      </div>

      {/* Crop Plans */}
      <div className="grid gap-4">
        {cropPlans.map((plan) => (
          <SmartCard key={plan.id}>
            <div className="flex items-start justify-between mb-4">
              <div className="flex items-center gap-4">
                <div className="w-12 h-12 bg-emerald-100 rounded-lg flex items-center justify-center">
                  <MapPin className="w-6 h-6 text-emerald-600" />
                </div>
                <div>
                  <h3 className="text-lg font-semibold text-gray-900">{plan.field}</h3>
                  <p className="text-sm text-gray-500">{plan.acres} acres</p>
                </div>
              </div>
              <div className="flex items-center gap-2">
                <EntityBadge label={plan.crop} variant={getCropColor(plan.crop)} />
                <span className="text-xs text-gray-500 bg-gray-100 px-2 py-1 rounded-md">
                  Year {plan.rotationYear}
                </span>
              </div>
            </div>

            <div className="grid grid-cols-2 md:grid-cols-4 gap-4 mb-4">
              <div>
                <div className="text-xs text-gray-500 mb-1">Variety</div>
                <div className="text-sm font-medium text-gray-900">{plan.variety}</div>
              </div>
              <div>
                <div className="text-xs text-gray-500 mb-1">Planting Window</div>
                <div className="text-sm font-medium text-gray-900 flex items-center gap-1">
                  <Calendar className="w-3 h-3" />
                  {plan.plantingWindow}
                </div>
              </div>
              <div>
                <div className="text-xs text-gray-500 mb-1">Expected Yield</div>
                <div className="text-sm font-medium text-gray-900 flex items-center gap-1">
                  <TrendingUp className="w-3 h-3" />
                  {plan.expectedYield} bu/ac
                </div>
              </div>
              <div>
                <div className="text-xs text-gray-500 mb-1">Break-even Price</div>
                <div className="text-sm font-medium text-gray-900">
                  ${plan.breakEvenPrice}/bu
                </div>
              </div>
            </div>

            <div className="mb-4">
              <div className="text-xs text-gray-500 mb-1">Previous Crop</div>
              <EntityBadge label={plan.previousCrop} variant="accent" />
            </div>

            <div className="mb-4">
              <div className="text-xs text-gray-500 mb-1">Notes</div>
              <p className="text-sm text-gray-700">{plan.notes}</p>
            </div>

            <div className="flex items-center justify-between pt-4 border-t border-gray-100">
              <div className="text-sm text-gray-600">
                Est. Revenue: <span className="font-semibold text-gray-900">
                  ${(plan.expectedYield * plan.breakEvenPrice * plan.acres).toLocaleString()}
                </span>
              </div>
              <div className="flex gap-2">
                <button className="px-3 py-1 text-sm bg-emerald-600 text-white rounded-lg hover:bg-emerald-700 transition-colors">
                  Edit Plan
                </button>
                <button className="px-3 py-1 text-sm bg-gray-100 text-gray-700 rounded-lg hover:bg-gray-200 transition-colors">
                  <BarChart3 className="w-4 h-4" />
                </button>
              </div>
            </div>
          </SmartCard>
        ))}
      </div>
    </div>
  );
}