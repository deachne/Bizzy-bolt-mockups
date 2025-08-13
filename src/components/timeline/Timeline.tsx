import React from 'react';
import { TimelineEntry, TimelineEntryData } from './TimelineEntry';
import { Camera, Mic, FileText, MapPin, Scaling as Seedling } from 'lucide-react';

export function Timeline() {
  const timelineData: TimelineEntryData[] = [
    {
      id: '1',
      time: '8:30 AM',
      title: 'Morning Field Check - Aphids Spotted',
      content: 'Found aphids on the south edge of NW14. Density appears to be below threshold but worth monitoring. Took photos of affected areas.',
      icon: <Camera className="w-4 h-4 text-white" />,
      iconColor: 'bg-gradient-to-br from-emerald-500 to-emerald-600',
      entities: [{ label: 'NW14' }],
      tags: ['scouting', 'pest'],
      hasAIInsights: true,
      action: {
        label: 'View Details',
        onClick: () => console.log('View details')
      },
      images: [
        'https://images.pexels.com/photos/2132227/pexels-photo-2132227.jpeg?auto=compress&cs=tinysrgb&w=300&h=225&dpr=1',
        'https://images.pexels.com/photos/1595104/pexels-photo-1595104.jpeg?auto=compress&cs=tinysrgb&w=300&h=225&dpr=1'
      ]
    },
    {
      id: '2', 
      time: '10:15 AM',
      title: '📞 Call with Nutrien - Fertilizer Quote',
      content: 'Discussed UAN pricing for next application. Price at $385/MT, available for delivery next week. They mentioned a potential shortage coming...',
      icon: <Mic className="w-4 h-4 text-white" />,
      iconColor: 'bg-gradient-to-br from-blue-500 to-blue-600',
      entities: [
        { label: 'SW22' },
        { label: 'Nutrien', variant: 'accent' as const }
      ],
      tags: ['quote', 'fertilizer'],
      hasAIInsights: true,
      action: {
        label: 'Compare Quotes',
        onClick: () => console.log('Compare quotes')
      },
      metadata: (
        <div className="bg-gradient-to-r from-amber-50 to-orange-50 border border-amber-200 rounded-lg p-3">
          <div className="flex items-center gap-2 text-amber-800 text-sm">
            <div className="w-2 h-2 bg-amber-500 rounded-full"></div>
            <span className="font-medium">AI Insight:</span>
            <span>This price is 12% higher than last month's quote</span>
          </div>
        </div>
      )
    }
  ];

  return (
    <div className="space-y-6">
      {/* Today Section */}
      <div className="flex items-center gap-3 mb-6">
        <h2 className="text-lg font-semibold text-gray-800">Today</h2>
        <div className="flex items-center gap-2 px-2 py-1 bg-gradient-to-r from-blue-100 to-sky-100 rounded-md">
          <div className="w-2 h-2 bg-blue-500 rounded-full"></div>
          <span className="text-xs font-medium text-blue-800">22°C</span>
        </div>
      </div>

      {/* Timeline Entries */}
      <div className="space-y-0">
        {timelineData.map((entry, index) => (
          <TimelineEntry 
            key={entry.id} 
            entry={entry} 
            isLast={index === timelineData.length - 1}
          />
        ))}
      </div>

      {/* Yesterday Section */}
      <div className="flex items-center gap-3 mb-6 mt-12">
        <h2 className="text-lg font-semibold text-gray-800">Yesterday</h2>
        <div className="flex items-center gap-2 px-2 py-1 bg-gradient-to-r from-blue-100 to-indigo-100 rounded-md">
          <div className="w-2 h-2 bg-blue-600 rounded-full"></div>
          <span className="text-xs font-medium text-blue-800">15mm rain</span>
        </div>
      </div>

      {/* Yesterday Entry */}
      <TimelineEntry 
        entry={{
          id: '3',
          time: '2:00 PM', 
          title: '📄 Soil Test Results Received',
          content: 'A&L Labs results are in. Overall looking good, but NW14 showing lower N than expected. SW22 has excellent P levels...',
          icon: <FileText className="w-4 h-4 text-white" />,
          iconColor: 'bg-gradient-to-br from-red-500 to-red-600',
          entities: [{ label: 'All Fields', variant: 'secondary' }],
          tags: ['soil test', 'lab results'],
          action: {
            label: 'View Full Report',
            onClick: () => console.log('View report')
          },
          metadata: (
            <div className="grid grid-cols-3 gap-3">
              {[
                { label: 'Nitrogen', value: '42 ppm', status: 'low', color: 'text-orange-600' },
                { label: 'Phosphorus', value: '28 ppm', status: 'good', color: 'text-emerald-600' },
                { label: 'Potassium', value: '165 ppm', status: 'good', color: 'text-emerald-600' }
              ].map((metric) => (
                <div key={metric.label} className="bg-gray-50 rounded-lg p-3 text-center">
                  <div className="text-xs text-gray-500 mb-1">{metric.label}</div>
                  <div className={`font-bold text-sm ${metric.color}`}>
                    {metric.value} {metric.status === 'low' ? '↓' : '✓'}
                  </div>
                </div>
              ))}
            </div>
          )
        }}
        isLast={true}
      />
    </div>
  );
}