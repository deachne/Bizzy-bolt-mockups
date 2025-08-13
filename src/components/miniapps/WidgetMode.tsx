import React, { useState } from 'react';
import { X, ArrowUpDown } from 'lucide-react';

interface WidgetModeProps {
  isOpen: boolean;
  onClose: () => void;
}

export function WidgetMode({ isOpen, onClose }: WidgetModeProps) {
  const [inputValue, setInputValue] = useState(100);
  const [inputUnit, setInputUnit] = useState('lb/acre');
  const [outputUnit, setOutputUnit] = useState('kg/ha');

  const convert = () => {
    if (inputUnit === 'lb/acre' && outputUnit === 'kg/ha') {
      return (inputValue * 1.121).toFixed(1);
    }
    if (inputUnit === 'kg/ha' && outputUnit === 'lb/acre') {
      return (inputValue / 1.121).toFixed(1);
    }
    return inputValue.toString();
  };

  if (!isOpen) return null;

  return (
    <div className="fixed bottom-6 right-6 w-80 bg-white rounded-2xl shadow-2xl border border-gray-200 z-50 overflow-hidden">
      <div className="p-4 border-b border-gray-100 flex items-center justify-between bg-gradient-to-r from-gray-50 to-gray-100">
        <div className="text-sm font-semibold text-gray-900">Quick Convert</div>
        <button 
          onClick={onClose}
          className="text-gray-400 hover:text-gray-600 transition-colors p-1 hover:bg-gray-200 rounded"
        >
          <X className="w-4 h-4" />
        </button>
      </div>
      <div className="p-4">
        <div className="flex gap-2 mb-4">
          <input 
            type="number" 
            value={inputValue}
            onChange={(e) => setInputValue(Number(e.target.value))}
            className="flex-1 p-3 border border-gray-200 rounded-lg text-sm focus:ring-2 focus:ring-emerald-500 focus:border-emerald-500 transition-all"
          />
          <select 
            value={inputUnit}
            onChange={(e) => setInputUnit(e.target.value)}
            className="p-3 border border-gray-200 rounded-lg text-sm focus:ring-2 focus:ring-emerald-500 focus:border-emerald-500 transition-all"
          >
            <option>lb/acre</option>
            <option>kg/ha</option>
          </select>
        </div>
        <div className="text-center text-gray-400 mb-4">
          <ArrowUpDown className="w-5 h-5 mx-auto" />
        </div>
        <div className="p-4 bg-gradient-to-br from-emerald-50 to-emerald-100 rounded-xl text-center border border-emerald-200">
          <div className="text-3xl font-bold text-emerald-700 mb-1">{convert()}</div>
          <div className="text-sm font-medium text-emerald-600">{outputUnit}</div>
        </div>
      </div>
    </div>
  );
}