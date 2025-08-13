import React from 'react';
import { MiniAppCard } from './MiniAppCard';
import { FlaskRound as Flask, Warehouse, Calculator, CloudSun, Scaling as Seedling, Camera, ArrowLeftRight, Thermometer, MoreHorizontal } from 'lucide-react';

interface MiniAppsGridProps {
  onOpenTankMix: () => void;
}

export function MiniAppsGrid({ onOpenTankMix }: MiniAppsGridProps) {
  const miniApps = [
    {
      icon: <Flask className="w-5 h-5" />,
      title: 'Tank Mix',
      subtitle: 'Calculator',
      gradient: 'bg-gradient-to-br from-blue-500 to-blue-600',
      onClick: onOpenTankMix
    },
    {
      icon: <Warehouse className="w-5 h-5" />,
      title: 'Grain Position',
      subtitle: 'Inventory',
      gradient: 'bg-gradient-to-br from-amber-500 to-amber-600'
    },
    {
      icon: <Calculator className="w-5 h-5" />,
      title: 'Break-even',
      subtitle: 'Analysis',
      gradient: 'bg-gradient-to-br from-emerald-500 to-emerald-600'
    },
    {
      icon: <CloudSun className="w-5 h-5" />,
      title: 'Spray Window',
      subtitle: 'Forecast',
      gradient: 'bg-gradient-to-br from-cyan-500 to-cyan-600'
    },
    {
      icon: <Seedling className="w-5 h-5" />,
      title: 'Seed Rate',
      subtitle: 'Calculator',
      gradient: 'bg-gradient-to-br from-purple-500 to-purple-600'
    },
    {
      icon: <Camera className="w-5 h-5" />,
      title: "What's This?",
      subtitle: 'AI Identifier',
      gradient: 'bg-gradient-to-br from-pink-500 to-pink-600'
    },
    {
      icon: <ArrowLeftRight className="w-5 h-5" />,
      title: 'Unit Convert',
      subtitle: 'Imperial/Metric',
      gradient: 'bg-gradient-to-br from-slate-500 to-slate-600'
    },
    {
      icon: <Thermometer className="w-5 h-5" />,
      title: 'GDD Tracker',
      subtitle: 'Heat Units',
      gradient: 'bg-gradient-to-br from-red-500 to-red-600'
    }
  ];

  return (
    <div className="grid grid-cols-2 md:grid-cols-4 lg:grid-cols-6 gap-4 p-6">
      {miniApps.map((app, index) => (
        <MiniAppCard
          key={index}
          icon={app.icon}
          title={app.title}
          subtitle={app.subtitle}
          gradient={app.gradient}
          onClick={app.onClick}
        />
      ))}
      <MiniAppCard
        icon={<MoreHorizontal className="w-6 h-6" />}
        title="12 more"
        subtitle=""
        gradient=""
        isPlaceholder
      />
    </div>
  );
}